"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

import { Download, ArrowRight, Github, Linkedin, Briefcase, Bot, Code2, Terminal, Cpu } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden selection:bg-primary/20">

      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.07]" />

        {/* Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-80" />

        {/* Animated Orbs */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container relative z-10 px-6 py-12 md:py-0 mx-auto min-h-screen flex flex-col justify-center items-center">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 w-full items-center">

          {/* Left Column: Hero & Intro */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center justify-center lg:justify-start">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                Open to New Opportunities
              </div>
            </div>

            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Senior <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Full Stack</span> <br />
              Engineer
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
              Building at the intersection of <span className="text-foreground font-semibold">Enterprise Banking</span> and <span className="text-foreground font-semibold">Agentic AI</span>. Architecting resilient systems for the future of fintech.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Button asChild size="lg" className="rounded-full text-base h-12 px-8 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
                <Link href="/projects">
                  View Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-base h-12 px-8 backdrop-blur-sm bg-background/50 hover:bg-background/80">
                <a href="/Girish_Jan_2026.pdf" download="Girish_Jan_2026.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 text-muted-foreground pt-4">
              <Link href="https://github.com/girish2408" target="_blank" className="hover:text-foreground transition-colors p-2 hover:bg-accent rounded-full">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://www.linkedin.com/in/girish-watwani/" target="_blank" className="hover:text-foreground transition-colors p-2 hover:bg-accent rounded-full">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="/agentic-lab" className="hover:text-foreground transition-colors flex items-center gap-2 text-sm font-medium p-2 hover:bg-accent rounded-full">
                <Bot className="h-5 w-5" />
                <span className="hidden sm:inline">AI Lab</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Bento Grid */}
          <div className="lg:col-span-7 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Card 1: Agentic AI Focus (Large) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="col-span-1 md:col-span-2 p-6 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-md hover:bg-card/50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Bot className="w-32 h-32 -mr-8 -mt-8" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold font-heading">Agentic AI Engineer</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 max-w-lg">
                    Specializing in LangChain & RAG architectures to build autonomous agents that plan, reason, and execute.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">LangGraph</span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">Vector DBs</span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">OpenAI</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Banking/Enterprise */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-6 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-md hover:bg-card/50 transition-colors"
              >
                <div className="p-2.5 w-fit rounded-xl bg-blue-500/10 text-blue-500 mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 font-heading">Enterprise Scale</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Architecting secure trading & wealth platforms for Emirates NBD. High availability microservices.
                </p>
              </motion.div>

              {/* Card 3: Modern Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="p-6 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-md hover:bg-card/50 transition-colors"
              >
                <div className="p-2.5 w-fit rounded-xl bg-green-500/10 text-green-500 mb-4">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 font-heading">Modern Stack</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Expert in React, Next.js 14+, Node.js, and Cloud Native technologies. Performance obsessed.
                </p>
              </motion.div>

              {/* Card 4: Tech Stack (Static Grid) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="col-span-1 md:col-span-2 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-md flex flex-col justify-center p-6"
              >
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Terminal className="w-3 h-3" />
                  Core Technologies
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    "LangChain", "LangGraph", "MCP", "RAG",
                    "Node.js", "Kafka", "GraphQL", "TypeScript",
                    "Next.js", "Azure AI", "OpenAI API", "Vector DBs",
                    "Microservices", "Docker", "Kubernetes"
                  ].map((tech) => (
                    <span key={tech} className="px-3 py-1.5 rounded-md text-xs font-medium bg-primary/5 text-primary/80 border border-primary/10 hover:bg-primary/10 transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
