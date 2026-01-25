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
  title: "Girish Watwani - Senior Full Stack Developer",
  description: "Portfolio website showcasing experience in banking, wealth platforms, and agentic AI",
  keywords: ["AI", "Full Stack Developer", "Banking", "Wealth Management", "LangChain", "RAG"],
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
