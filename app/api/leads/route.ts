import { NextRequest, NextResponse } from "next/server"
import { leadSchema } from "@/lib/validators"
import { rateLimit, getClientIdentifier } from "@/lib/rateLimit"
import { writeFile, readFile, mkdir } from "fs/promises"
import { join } from "path"

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
    // Rate limiting
    const clientId = getClientIdentifier(req)
    const limit = rateLimit(`leads-${clientId}`)
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      )
    }

    const body = await req.json()
    const validated = leadSchema.parse(body)

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
      leadId: newLead.id,
    })
  } catch (error: any) {
    console.error("Leads API error:", error)
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    // In production, add authentication here
    const authHeader = req.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const leads = await readLeads()
    return NextResponse.json({ leads })
  } catch (error) {
    console.error("Leads GET error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
