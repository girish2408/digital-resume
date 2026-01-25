"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DiagramProps {
  title: string
  description: string
  type: "tool-calling" | "rag-pipeline" | "agent-orchestration"
}

export function AnimatedDiagram({ title, description, type }: DiagramProps) {
  const renderDiagram = () => {
    switch (type) {
      case "tool-calling":
        return (
          <div className="space-y-4">
            <motion.div
              className="flex items-center justify-center gap-4 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="w-32">
                <CardContent className="p-4 text-center text-sm">
                  User Query
                </CardContent>
              </Card>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                →
              </motion.div>
              <Card className="w-32 bg-primary/10">
                <CardContent className="p-4 text-center text-sm">
                  AI Agent
                </CardContent>
              </Card>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              >
                →
              </motion.div>
              <Card className="w-32">
                <CardContent className="p-4 text-center text-sm">
                  Tool Call
                </CardContent>
              </Card>
            </motion.div>
            <div className="flex justify-center gap-2 mt-4">
              <Card className="w-24">
                <CardContent className="p-3 text-center text-xs">
                  sendEmail
                </CardContent>
              </Card>
              <Card className="w-24">
                <CardContent className="p-3 text-center text-xs">
                  sendSMS
                </CardContent>
              </Card>
              <Card className="w-24">
                <CardContent className="p-3 text-center text-xs">
                  createLead
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "rag-pipeline":
        return (
          <div className="space-y-4">
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="w-full max-w-md">
                <CardContent className="p-4 text-center text-sm">
                  User Query
                </CardContent>
              </Card>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                ↓
              </motion.div>
              <Card className="w-full max-w-md bg-primary/10">
                <CardContent className="p-4 text-center text-sm">
                  Query Embedding
                </CardContent>
              </Card>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
              >
                ↓
              </motion.div>
              <div className="flex gap-2 w-full max-w-md">
                <Card className="flex-1">
                  <CardContent className="p-3 text-center text-xs">
                    Vector DB
                  </CardContent>
                </Card>
                <Card className="flex-1">
                  <CardContent className="p-3 text-center text-xs">
                    Knowledge Base
                  </CardContent>
                </Card>
              </div>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
              >
                ↓
              </motion.div>
              <Card className="w-full max-w-md bg-primary/10">
                <CardContent className="p-4 text-center text-sm">
                  Context + LLM
                </CardContent>
              </Card>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.9 }}
              >
                ↓
              </motion.div>
              <Card className="w-full max-w-md">
                <CardContent className="p-4 text-center text-sm">
                  Answer
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )

      case "agent-orchestration":
        return (
          <div className="space-y-4">
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="w-full max-w-md bg-primary/10">
                <CardContent className="p-4 text-center text-sm font-semibold">
                  Agent Orchestrator (MCP)
                </CardContent>
              </Card>
              <div className="grid grid-cols-3 gap-2 w-full max-w-md">
                <Card>
                  <CardContent className="p-3 text-center text-xs">
                    Planning
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center text-xs">
                    Execution
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center text-xs">
                    Reflection
                  </CardContent>
                </Card>
              </div>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                ↓
              </motion.div>
              <div className="flex gap-2 w-full max-w-md">
                <Card className="flex-1">
                  <CardContent className="p-3 text-center text-xs">
                    Tool 1
                  </CardContent>
                </Card>
                <Card className="flex-1">
                  <CardContent className="p-3 text-center text-xs">
                    Tool 2
                  </CardContent>
                </Card>
                <Card className="flex-1">
                  <CardContent className="p-3 text-center text-xs">
                    Tool N
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-muted/50 rounded-lg">
          {renderDiagram()}
        </div>
      </CardContent>
    </Card>
  )
}
