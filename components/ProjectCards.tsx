"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Info, ArrowUpRight } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"

interface Project {
  id: string
  name: string
  description: string
  longDescription?: string
  deployment?: string
  liveUrl?: string
  githubUrl?: string
  technologies: string[]
  architecture?: {
    frontend?: string
    backend?: string
    database?: string
    deployment?: string
    [key: string]: string | undefined
  }
  highlights?: string[]
}

interface ProjectCardsProps {
  projects: Project[]
}

export function ProjectCards({ projects }: ProjectCardsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="group h-full"
        >
          <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden">

            <CardHeader className="relative">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-primary/10 text-primary">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle className="text-xl font-heading text-primary group-hover:text-primary transition-colors">{project.name}</CardTitle>
              <CardDescription className="line-clamp-2">{project.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-grow pt-0">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 4).map((tech, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs bg-primary/5 border-primary/20">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 4 && (
                  <Badge variant="outline" className="text-xs bg-muted">
                    +{project.technologies.length - 4}
                  </Badge>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex gap-2 pt-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-card border-primary/20">
                  <DialogHeader>
                    <div className="flex items-center justify-between pr-8">
                      <DialogTitle className="text-2xl font-heading text-primary">{project.name}</DialogTitle>
                    </div>
                    <DialogDescription className="text-lg text-foreground/80">{project.description}</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 mt-4">
                    {/* Links */}
                    <div className="flex gap-4">
                      {project.liveUrl && (
                        <Button size="sm" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" /> View Code
                          </a>
                        </Button>
                      )}
                    </div>

                    {project.longDescription && (
                      <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
                        <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      {project.highlights && project.highlights.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center text-primary">
                            <Info className="mr-2 h-4 w-4" /> Key Highlights
                          </h4>
                          <ul className="space-y-2">
                            {project.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-start text-sm text-muted-foreground">
                                <span className="mr-2 text-primary/60 mt-1.5">•</span>
                                <span className="flex-1">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {project.architecture && (
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center text-primary">
                            <ArrowUpRight className="mr-2 h-4 w-4" /> Architecture
                          </h4>
                          <div className="space-y-3">
                            {Object.entries(project.architecture).map(([key, value]) => (
                              <div key={key} className="flex flex-col text-sm border-b border-border/40 pb-2 last:border-0">
                                <span className="font-medium capitalize text-muted-foreground">{key}</span>
                                <span className="text-foreground">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-primary">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="px-3 py-1">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
