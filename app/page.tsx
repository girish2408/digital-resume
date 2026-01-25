"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TechMarquee } from "@/components/TechMarquee"
import { Download, MessageCircle, ArrowRight, Github, Linkedin, Briefcase } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative container pt-40 pb-20 md:pt-48 md:pb-32 flex flex-col items-center text-center z-10">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/20 blur-[100px] rounded-full -z-10 opacity-50" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 max-w-4xl"
        >
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-xl">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Open to New Opportunities
          </div>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
            Senior <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Full Stack</span> <br className="hidden md:block" />
            Engineer
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between
            <span className="text-foreground font-semibold"> Banking Systems</span>,
            <span className="text-foreground font-semibold"> Wealth Platforms</span>, and
            <span className="text-foreground font-semibold"> Agentic AI</span>.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button asChild size="lg" className="rounded-full text-lg h-12 px-8 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
              <Link href="/projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-lg h-12 px-8 backdrop-blur-sm bg-background/50 hover:bg-background/80">
              <a href="/Girish_Jan_2026.pdf" download="Girish_Jan_2026.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>

          {/* Social Proof / Links */}
          <div className="pt-8 flex justify-center gap-6 text-muted-foreground">
            <Link href="https://github.com/girish2408" target="_blank" className="hover:text-primary transition-colors">
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://www.linkedin.com/in/girish-watwani/" target="_blank" className="hover:text-primary transition-colors">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-12 border-y border-border/40 bg-muted/20 backdrop-blur-sm">
        <p className="text-center text-sm font-semibold text-muted-foreground mb-8 tracking-widest uppercase">
          Powering scalable solutions with
        </p>
        <TechMarquee />
      </section>

      {/* Quick Highlights / Value Props */}
      <section className="container py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="group p-8 rounded-3xl border border-border/50 bg-card/50 hover:bg-card hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
            <div className="mb-6 inline-block p-4 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
              <Briefcase className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-3 font-heading">Banking & Wealth</h3>
            <p className="text-muted-foreground leading-relaxed">
              Architecting resilient microservices for Emirates NBD. Specialized in trading journeys, gold workflows, and secure financial pipelines.
            </p>
          </div>

          <div className="group p-8 rounded-3xl border border-border/50 bg-card/50 hover:bg-card hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
            <div className="mb-6 inline-block p-4 rounded-2xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z" /><path d="M12 12 2.1 12" /><path d="M12 12V2.1" /><path d="M12 12l8.9-8.9" /></svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 font-heading">Agentic AI</h3>
            <p className="text-muted-foreground leading-relaxed">
              Pioneering intelligent agents using LangChain, LangGraph, and RAG. Building systems that reason, plan, and execute complex tasks.
            </p>
          </div>

          <div className="group p-8 rounded-3xl border border-border/50 bg-card/50 hover:bg-card hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
            <div className="mb-6 inline-block p-4 rounded-2xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 font-heading">Modern Full Stack</h3>
            <p className="text-muted-foreground leading-relaxed">
              Expert in React, Next.js, and Node.js. Obsessed with performance, accessibility, and creating buttery smooth user experiences.
            </p>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container pb-24">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-10" />
          <div className="absolute inset-0 backdrop-blur-3xl" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 p-12 md:p-24 text-center space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading">Ready to Innovate?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              I&apos;m always open to discussing new projects, AI integration, or just chatting about the future of tech.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg">
                <Link href="/contact">Start a Conversation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg bg-background/50 backdrop-blur">
                <Link href="/agentic-lab">Explore My AI Lab</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
