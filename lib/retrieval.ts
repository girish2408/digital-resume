import profileData from "@/data/profile.json"

export interface KnowledgeSnippet {
  id: string
  content: string
  source: string
  keywords: string[]
}

// Simple keyword-based retrieval (BM25-like scoring)
export function createKnowledgeBase(): KnowledgeSnippet[] {
  const snippets: KnowledgeSnippet[] = []

  // Personal info
  snippets.push({
    id: "personal-1",
    content: `Girish Watwani is an AI-Focused Full Stack Developer based in Abu Dhabi, UAE. Contact: ${profileData.personal.contact.phone}, ${profileData.personal.contact.email}. LinkedIn: ${profileData.personal.contact.linkedin}, GitHub: ${profileData.personal.contact.github}`,
    source: "personal",
    keywords: ["contact", "email", "phone", "linkedin", "github", "location", "abu dhabi"],
  })

  // Experience snippets
  profileData.experience.forEach((exp, idx) => {
    snippets.push({
      id: `exp-${idx}-1`,
      content: `At ${exp.company}, Girish worked as ${exp.role}. Key highlights: ${exp.highlights.join(". ")}. Technologies used: ${exp.technologies.join(", ")}.`,
      source: `experience-${exp.company}`,
      keywords: [exp.company.toLowerCase(), exp.role.toLowerCase(), ...exp.technologies.map(t => t.toLowerCase()), ...exp.highlights.join(" ").toLowerCase().split(" ")],
    })
  })

  // Skills snippets
  Object.entries(profileData.skills).forEach(([category, skills]) => {
    snippets.push({
      id: `skills-${category}`,
      content: `Girish's ${category} skills include: ${(skills as string[]).join(", ")}.`,
      source: `skills-${category}`,
      keywords: [category.toLowerCase(), ...(skills as string[]).map(s => s.toLowerCase())],
    })
  })

  // Projects snippets
  profileData.projects.forEach((project, idx) => {
    snippets.push({
      id: `project-${idx}`,
      content: `Project: ${project.name}. ${project.description}. Technologies: ${project.technologies.join(", ")}.`,
      source: `projects-${project.name}`,
      keywords: [project.name.toLowerCase(), ...project.technologies.map(t => t.toLowerCase())],
    })
  })

  // Expertise snippets
  snippets.push({
    id: "expertise-1",
    content: `Girish specializes in: ${profileData.expertise.domains.join(", ")}. Specializations: ${profileData.expertise.specializations.join(". ")}.`,
    source: "expertise",
    keywords: [...profileData.expertise.domains.map(d => d.toLowerCase()), ...profileData.expertise.specializations.join(" ").toLowerCase().split(" ")],
  })

  return snippets
}

const knowledgeBase = createKnowledgeBase()

function simpleKeywordScore(query: string, snippet: KnowledgeSnippet): number {
  const queryWords = query.toLowerCase().split(/\s+/)
  let score = 0

  queryWords.forEach(word => {
    const keywordMatches = snippet.keywords.filter(k => k.includes(word) || word.includes(k)).length
    const contentMatches = (snippet.content.toLowerCase().match(new RegExp(word, "g")) || []).length
    score += keywordMatches * 2 + contentMatches
  })

  return score
}

export function retrieveRelevantSnippets(query: string, limit: number = 5): KnowledgeSnippet[] {
  const scored = knowledgeBase.map(snippet => ({
    snippet,
    score: simpleKeywordScore(query, snippet),
  }))

  scored.sort((a, b) => b.score - a.score)

  return scored
    .filter(item => item.score > 0)
    .slice(0, limit)
    .map(item => item.snippet)
}

// Future: Embedding-based retrieval (placeholder interface)
export interface EmbeddingRetriever {
  retrieve(query: string, limit: number): Promise<KnowledgeSnippet[]>
}

export class VectorDBRetriever implements EmbeddingRetriever {
  async retrieve(query: string, limit: number): Promise<KnowledgeSnippet[]> {
    // Placeholder for future Pinecone/Chroma integration
    // For now, fall back to keyword search
    return retrieveRelevantSnippets(query, limit)
  }
}
