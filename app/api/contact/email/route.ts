import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { emailSchema } from "@/lib/validators"
import { rateLimit, getClientIdentifier } from "@/lib/rateLimit"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(req)
    const limit = rateLimit(`email-${clientId}`)
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      )
    }

    const body = await req.json()
    const validated = emailSchema.parse(body)

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured")
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Update with your verified domain
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
      text: `
New Contact Form Submission

Name: ${validated.name}
Email: ${validated.email}
${validated.topic ? `Topic: ${validated.topic}` : ""}

Message:
${validated.message}
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      messageId: data?.id,
    })
  } catch (error: any) {
    console.error("Email API error:", error)
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
