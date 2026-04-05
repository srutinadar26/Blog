import Link from "next/link"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

async function getPoem(id: string) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("poems")
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
  const poem = await getPoem(id)
  
  if (!poem) {
    return { title: "Poem Not Found | Sruti" }
  }

  return {
    title: `${poem.title} | Poetry | Sruti`,
    description: poem.excerpt || `A poem by Sruti`,
  }
}

export default async function PoemPage({ params }: PageProps) {
  const { id } = await params
  const poem = await getPoem(id)

  if (!poem) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-28 pb-24 px-6">
        <article className="max-w-3xl mx-auto page-transition">
          {/* Back Link */}
          <Link 
            href="/poems"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back to Poems</span>
          </Link>

          {/* Header */}
          <header className="mb-12 text-center">
            <time className="text-sm text-muted-foreground">
              {format(new Date(poem.created_at), "MMMM d, yyyy")}
            </time>
            <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-foreground mt-4 text-balance">
              {poem.title}
            </h1>
          </header>

          {/* Poem Content */}
          <div className="prose-literary">
            <div className="poem-content text-center text-foreground">
              {poem.content}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-12 border-t border-border/50 text-center">
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
