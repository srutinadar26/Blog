import Link from "next/link"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getThought(id: string) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("thoughts")
      .select("*")
      .eq("id", id)
      .single()

    if (error || !data) {
      return null
    }

    return data
  } catch (error) {
    console.warn("Supabase not configured:", error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const thought = await getThought(id)
  
  if (!thought) {
    return { title: "Thought Not Found | Sruti" }
  }

  return {
    title: `${thought.title} | Thoughts | Sruti`,
    description: thought.excerpt || `A reflection by Sruti`,
  }
}

export default async function ThoughtPage({ params }: PageProps) {
  const { id } = await params
  const thought = await getThought(id)

  if (!thought) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-28 pb-24 px-6">
        <article className="max-w-3xl mx-auto page-transition">
          {/* Back Link */}
          <Link 
            href="/thoughts"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back to Thoughts</span>
          </Link>

          {/* Header */}
          <header className="mb-12">
            <time className="text-sm text-muted-foreground">
              {format(new Date(thought.created_at), "MMMM d, yyyy")}
            </time>
            <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-foreground mt-4 text-balance">
              {thought.title}
            </h1>
          </header>

          {/* Content */}
          <div className="prose-literary">
            <div className="text-foreground leading-relaxed whitespace-pre-line text-lg">
              {thought.content}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-12 border-t border-border/50">
            <p className="text-sm text-muted-foreground italic font-serif">
              — Sruti
            </p>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  )
}
