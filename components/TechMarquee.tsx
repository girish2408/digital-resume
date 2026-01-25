"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const techStack = [
  "LangChain",
  "LangGraph",
  "MCP",
  "RAG",
  "Node.js",
  "Kafka",
  "GraphQL",
  "TypeScript",
  "Next.js",
  "Azure AI",
  "OpenAI API",
  "Vector DBs",
  "Microservices",
  "Docker",
  "Kubernetes",
]

export function TechMarquee() {
  return (
    <div className="relative overflow-hidden py-8">
      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex">
        <motion.div
          className="flex gap-8 px-8" // Added initial padding
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 50, // Slower for elegance
          }}
        >
          {/* Duplicate list 3 times to ensure smooth loop without gaps */}
          {[...techStack, ...techStack, ...techStack].map((tech, idx) => (
            <div
              key={idx}
              className={cn(
                "flex-shrink-0 rounded-full bg-primary/5 px-6 py-3 text-sm font-medium text-foreground/80 backdrop-blur-sm",
                "border border-primary/10 hover:border-primary/30 hover:bg-primary/10 transition-all cursor-default"
              )}
            >
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
