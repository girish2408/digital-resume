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
            AI Full Stack Engineer | LLM & Agentic Systems
          </p>
        </div>

        {/* Narrative */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Professional Summary</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-lg">
              Dynamic AI Full Stack Engineer and Solution Architect with 12+ years of experience building scalable,
              high-performance systems across banking and enterprise domains. Specializing in LLM orchestration,
              agentic AI system design, and RAG pipeline development using LangChain, LangGraph, OpenAI API,
              Azure AI Studio, and MCP (Model Context Protocol).
            </p>
            <p>
              Proven record of shipping production-grade AI features — including multi-agent pipelines,
              speech-to-summary systems, and AI-powered developer tools — on top of a strong foundation in
              Node.js, TypeScript, Angular, NestJS, Kafka, PostgreSQL, and MongoDB.
            </p>
            <p>
              Passionate about transforming traditional architectures into intelligent, context-aware solutions
              that enhance decision-making and customer experience. Currently building MCP server plugin suites
              for Claude AI and agentic brokerage features at Emirates NBD, while pursuing an MS in AI at UT Austin.
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
                <CardTitle className="text-3xl font-bold">12+</CardTitle>
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
                <CardDescription>LLM Orchestration, Agentic AI & RAG</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Certifications & Training</h2>
          <div className="space-y-4">
            {profileData.certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-base">{cert.title}</CardTitle>
                        <CardDescription className="mt-1">{cert.issuer} · {cert.year}</CardDescription>
                      </div>
                      <Badge variant="secondary">{cert.year}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  )
}
