import { NextRequest, NextResponse } from "next/server"
import { toolDefinitions } from "@/lib/tools"
import { emailSchema, smsSchema, leadSchema } from "@/lib/validators"
import { Resend } from "resend"
import twilio from "twilio"
import { writeFile, readFile, mkdir } from "fs/promises"
import { join } from "path"

const resend = new Resend(process.env.RESEND_API_KEY)

interface Lead {
  id: string
  timestamp: string
  name: string
  email: string
  company?: string
  message: string
}

const LEADS_FILE = join(process.cwd(), "data", "leads.json")

async function readLeads(): Promise<Lead[]> {
  try {
    const content = await readFile(LEADS_FILE, "utf-8")
    return JSON.parse(content)
  } catch {
    return []
  }
}

async function writeLeads(leads: Lead[]): Promise<void> {
  const dir = join(process.cwd(), "data")
  await mkdir(dir, { recursive: true })
  await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2))
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { toolName, arguments: args } = body

    switch (toolName) {
      case "sendEmail": {
        const validated = emailSchema.parse(args)
        if (!process.env.RESEND_API_KEY) {
          throw new Error("Email service not configured")
        }

        const { data, error } = await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: ["girish.watwani2008@gmail.com"],
          replyTo: validated.email,
          subject: validated.topic
            ? `Portfolio Contact: ${validated.topic}`
            : "Portfolio Contact Form",
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${validated.name}</p>
            <p><strong>Email:</strong> ${validated.email}</p>
            ${validated.topic ? `<p><strong>Topic:</strong> ${validated.topic}</p>` : ""}
            <p><strong>Message:</strong></p>
            <p>${validated.message.replace(/\n/g, "<br>")}</p>
          `,
        })

        if (error) throw error

        return NextResponse.json({
          success: true,
          result: `Email sent successfully. Message ID: ${data?.id}`,
        })
      }

      case "sendSMS": {
        const validated = smsSchema.parse(args)
        if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
          throw new Error("SMS service not configured")
        }

        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
        const message = await client.messages.create({
          body: `New message from ${validated.name} (${validated.phone}):\n\n${validated.message}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: process.env.GIRISH_PHONE_NUMBER || "+971503214652",
        })

        return NextResponse.json({
          success: true,
          result: `SMS sent successfully. Message ID: ${message.sid}`,
        })
      }

      case "createLead": {
        const validated = leadSchema.parse(args)
        const leads = await readLeads()
        const newLead: Lead = {
          id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date().toISOString(),
          name: validated.name,
          email: validated.email,
          company: validated.company,
          message: validated.message,
        }

        leads.push(newLead)
        await writeLeads(leads)

        return NextResponse.json({
          success: true,
          result: `Lead created successfully. Lead ID: ${newLead.id}`,
        })
      }

      default:
        return NextResponse.json(
          { error: `Unknown tool: ${toolName}` },
          { status: 400 }
        )
    }
  } catch (error: any) {
    console.error("Tools API error:", error)
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid tool arguments" },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}
