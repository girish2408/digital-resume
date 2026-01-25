import { z } from "zod"

export const emailSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
  topic: z.string().optional(),
})

export const smsSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  phone: z.string().min(10, "Invalid phone number").max(20),
  message: z.string().min(10, "Message must be at least 10 characters").max(500),
})

export const leadSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
})

export const chatMessageSchema = z.object({
  message: z.string().min(1, "Message is required").max(2000),
  mode: z.enum(["profile", "recruiter", "project"]).optional().default("profile"),
  conversationId: z.string().optional(),
})

export type EmailInput = z.infer<typeof emailSchema>
export type SMSInput = z.infer<typeof smsSchema>
export type LeadInput = z.infer<typeof leadSchema>
export type ChatMessageInput = z.infer<typeof chatMessageSchema>
