import { Timeline } from "@/components/Timeline"
import profileData from "@/data/profile.json"

export default function Experience() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Experience</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Building production-grade systems for major financial institutions
        </p>
      </div>
      <Timeline items={profileData.experience} />
    </div>
  )
}
