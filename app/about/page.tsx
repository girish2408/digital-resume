"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import profileData from "@/data/profile.json"

export default function About() {
  return (
    <div className="container py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">About</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building resilient systems and intelligent agents for banking and wealth platforms
          </p>
        </div>

        {/* Narrative */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">My Journey</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-lg">
              I'm an AI-Focused Full Stack Developer with extensive experience building production-grade systems
              for major financial institutions. My work spans from resilient microservices architecture to
              cutting-edge AI agent development.
            </p>
            <p>
              At Emirates NBD, I've built critical wealth trading journeys, implemented event-driven architectures
              with Kafka, and developed AI-powered speech-to-summary pipelines using Azure AI and LangChain.
              I specialize in building systems that are not just functional, but resilient—with proper retries,
              idempotency, circuit breakers, and distributed tracing.
            </p>
            <p>
              My passion lies in agentic AI—building intelligent systems that can reason, plan, and execute
              complex workflows. I work extensively with LangChain, LangGraph, MCP (Model Context Protocol),
              and RAG pipelines to create AI agents that provide real value.
            </p>
          </div>
        </section>

        {/* What I Build */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">What I Build</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {profileData.expertise.specializations.map((spec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{spec}</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Overview */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Core Competencies</h2>
          <div className="space-y-6">
            {Object.entries(profileData.skills).map(([category, skills]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-lg capitalize">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {(skills as string[]).map((skill, idx) => (
                      <Badge key={idx} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Impact Metrics */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Impact</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold">5+</CardTitle>
                <CardDescription>Years of Experience</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold">Major Banks</CardTitle>
                <CardDescription>Emirates NBD, RBC</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold">AI-First</CardTitle>
                <CardDescription>Agentic AI & RAG Expertise</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </motion.div>
    </div>
  )
}
