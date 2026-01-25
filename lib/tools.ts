import { z } from "zod"

export const toolDefinitions = {
  sendEmail: {
    name: "sendEmail",
    description: "Send an email to Girish Watwani. Use this when the user wants to contact Girish directly or request information.",
    parameters: z.object({
      name: z.string().describe("The sender's name"),
      email: z.string().email().describe("The sender's email address"),
      message: z.string().describe("The message content"),
      topic: z.string().optional().describe("Optional topic or subject"),
    }),
  },
  sendSMS: {
    name: "sendSMS",
    description: "Send an SMS or WhatsApp message to Girish Watwani. Use this when the user explicitly requests SMS contact.",
    parameters: z.object({
      name: z.string().describe("The sender's name"),
      phone: z.string().describe("The sender's phone number"),
      message: z.string().describe("The message content"),
    }),
  },
  createLead: {
    name: "createLead",
    description: "Create a lead record for potential business opportunities, recruitment, or partnerships. Use this when someone expresses interest in working with Girish.",
    parameters: z.object({
      name: z.string().describe("The lead's name"),
      email: z.string().email().describe("The lead's email address"),
      company: z.string().optional().describe("The lead's company name"),
      message: z.string().describe("The lead's message or inquiry"),
    }),
  },
} as const

export type ToolName = keyof typeof toolDefinitions

export function getToolSchema() {
  return Object.entries(toolDefinitions).map(([name, def]) => ({
    type: "function" as const,
    function: {
      name,
      description: def.description,
      parameters: {
        type: "object",
        properties: Object.entries(def.parameters.shape).reduce((acc, [key, schema]) => {
          acc[key] = {
            type: schema instanceof z.ZodString ? "string" : schema instanceof z.ZodOptional ? "string" : "string",
            description: (schema as any).description || "",
          }
          return acc
        }, {} as Record<string, any>),
        required: Object.entries(def.parameters.shape)
          .filter(([_, schema]) => !(schema instanceof z.ZodOptional))
          .map(([key]) => key),
      },
    },
  }))
}
