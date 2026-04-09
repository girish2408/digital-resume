import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Navbar } from "@/components/Navbar"
import { ChatInterface } from "@/components/ChatInterface"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/components/Providers"
import { ThemeProvider } from "@/components/ThemeProvider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" })

export const metadata: Metadata = {
  title: "Girish Watwani | AI Full Stack Engineer | LLM & Agentic Systems",
  description: "AI Full Stack Engineer specializing in LLM orchestration, agentic systems, RAG pipelines, and scalable microservices. 12+ years in banking and enterprise domains.",
  keywords: ["AI Developer", "AI Full Stack Engineer", "LLM Engineer", "LangChain", "RAG", "MCP", "Agentic AI", "Node.js", "NestJS", "Angular", "Generative AI", "UAE", "LangGraph", "OpenAI API", "Prompt Engineering", "Multi-Agent Systems"],
  openGraph: {
    title: "Girish Watwani | AI Full Stack Engineer | LLM & Agentic Systems",
    description: "12+ years building AI-native systems. LangChain, RAG, MCP, Node.js, NestJS. Senior engineer at Emirates NBD. MSAI @ UT Austin.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Girish Watwani | AI Full Stack Engineer | LLM & Agentic Systems",
    description: "12+ years building AI-native systems. LangChain, RAG, MCP, Node.js, NestJS. Senior engineer at Emirates NBD. MSAI @ UT Austin.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <Navbar />
            <main>{children}</main>
            <ChatInterface />
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
