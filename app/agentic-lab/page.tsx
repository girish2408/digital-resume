"use client"

import { AnimatedDiagram } from "@/components/AnimatedDiagram"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { MessageCircle } from "lucide-react"

export default function AgenticLab() {
  return (
    <div className="container py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">AI/Agentic Lab</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Exploring the future of intelligent agents and RAG systems
          </p>
        </div>

        {/* Introduction */}
        <section className="prose prose-neutral dark:prose-invert max-w-none">
          <Card>
            <CardHeader>
              <CardTitle>What is Agentic AI?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Agentic AI represents the next evolution in artificial intelligence—systems that can reason,
                plan, and execute complex workflows autonomously. Unlike traditional chatbots, agentic AI
                systems can use tools, make decisions, and orchestrate multi-step processes.
              </p>
              <p>
                I specialize in building these systems using LangChain, LangGraph, and MCP (Model Context Protocol),
                creating AI agents that provide real value in production environments.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Interactive Diagrams */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">How It Works</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            <AnimatedDiagram
              title="Tool Calling"
              description="AI agents can invoke functions and tools to perform actions"
              type="tool-calling"
            />
            <AnimatedDiagram
              title="RAG Pipeline"
              description="Retrieval-Augmented Generation for context-aware responses"
              type="rag-pipeline"
            />
            <AnimatedDiagram
              title="Agent Orchestration"
              description="MCP-based orchestration of complex multi-step workflows"
              type="agent-orchestration"
            />
          </div>
        </section>

        {/* Key Concepts */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Key Technologies</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>LangChain & LangGraph</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Framework for building LLM applications with chains, agents, and stateful workflows.
                  LangGraph enables complex agent orchestration with cycles and state management.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>MCP (Model Context Protocol)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Standardized protocol for AI agents to interact with tools and external systems.
                  Enables composable, reusable agent capabilities.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>RAG (Retrieval-Augmented Generation)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Combines information retrieval with LLM generation. Uses vector databases to
                  retrieve relevant context, improving accuracy and reducing hallucinations.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Vector Databases</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Specialized databases (Chroma, Pinecone) for storing and querying embeddings.
                  Enables semantic search and context retrieval for RAG systems.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Real-World Applications */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Real-World Applications</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Speech-to-Summary Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Built at Emirates NBD: AI pipeline that converts speech to text using Azure AI,
                  then uses LangChain to generate intelligent summaries. Demonstrates RAG and
                  agentic workflows in production banking systems.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Digital Girish Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This portfolio&apos;s chat assistant demonstrates RAG-based Q&A, tool calling (email, SMS, lead creation),
                  and multi-mode operation (Profile, Recruiter, Project Deep Dive). Built with Next.js, OpenAI API,
                  and a knowledge base retrieval system.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl">Request a Demo</CardTitle>
              <CardDescription>
                Chat with Digital Girish to see agentic AI in action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg">
                <Link href="/#chat">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Open Chat Assistant
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </motion.div>
    </div>
  )
}
