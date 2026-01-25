import { NextRequest, NextResponse } from "next/server"
import twilio from "twilio"
import { smsSchema } from "@/lib/validators"
import { rateLimit, getClientIdentifier } from "@/lib/rateLimit"

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(req)
    const limit = rateLimit(`sms-${clientId}`)
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      )
    }

    const body = await req.json()
    const validated = smsSchema.parse(body)

    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
      return NextResponse.json(
        { error: "SMS service not configured" },
        { status: 500 }
      )
    }

    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

    const message = await client.messages.create({
      body: `New message from ${validated.name} (${validated.phone}):\n\n${validated.message}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.GIRISH_PHONE_NUMBER || "+971503214652",
    })

    return NextResponse.json({
      success: true,
      messageId: message.sid,
    })
  } catch (error: any) {
    console.error("SMS API error:", error)
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
