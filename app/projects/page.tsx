import { ProjectCards } from "@/components/ProjectCards"
import projectsData from "@/data/projects.json"

export default function Projects() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Real-world applications showcasing technical expertise
        </p>
      </div>
      <ProjectCards projects={projectsData} />
    </div>
  )
}
