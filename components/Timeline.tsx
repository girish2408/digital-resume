"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Briefcase } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface TimelineItem {
  company: string
  role: string
  period: string
  highlights: string[]
  technologies: string[]
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({})

  const toggleExpanded = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className="relative max-w-3xl mx-auto px-4">
      {/* Central Line */}
      <div className="absolute left-0 md:left-1/2 top-4 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:-translate-x-1/2" />

      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={cn(
              "relative grid gap-8 md:gap-0 md:grid-cols-2",
              index % 2 === 0 ? "md:text-right" : "md:text-left"
            )}
          >
            {/* Timeline Dot */}
            <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-background border-2 border-primary translate-x-[-7px] md:-translate-x-[7px] z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
            </div>

            {/* Content Spacer for Left/Right Alignment */}
            <div className={cn(
              "md:px-8",
              index % 2 === 0 ? "md:order-1" : "md:order-2 md:col-start-2"
            )}>
              <div
                className={cn(
                  "group relative hover:cursor-pointer",
                  index % 2 === 0 ? "items-end" : "items-start"
                )}
                onClick={() => toggleExpanded(index)}
              >
                <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <h3 className="text-2xl font-bold font-heading text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">{item.company}</h3>
                  <div className="flex flex-col md:block items-baseline">
                    <span className="text-lg font-semibold text-foreground">{item.role}</span>
                    <span className="text-sm text-muted-foreground md:ml-2 font-mono">{item.period}</span>
                  </div>
                </div>

                <motion.div
                  initial={false}
                  animate={{ height: expanded[index] ? "auto" : 0, opacity: expanded[index] ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4"
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                    <CardContent className="p-4 text-left">
                      <ul className="space-y-2 mb-4">
                        {item.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start text-sm text-muted-foreground">
                            <span className="mr-2 text-primary">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-secondary/50 text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {!expanded[index] && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cn(
                      "mt-2 text-xs text-muted-foreground flex items-center gap-1",
                      index % 2 === 0 ? "justify-end" : "justify-start"
                    )}
                  >
                    <span className="underline decoration-dotted underline-offset-4">View Details</span>
                    <ChevronDown className="h-3 w-3" />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Empty column for proper grid alignment */}
            <div className={cn(
              "hidden md:block",
              index % 2 === 0 ? "md:order-2" : "md:order-1"
            )} />

          </motion.div>
        ))}
      </div>
    </div>
  )
}
