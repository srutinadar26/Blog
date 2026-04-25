import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { formatDistanceToNow } from "date-fns"

export const dynamic = 'force-dynamic'

async function getPoems() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("poems")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching poems:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.warn("Supabase not configured, showing empty poems:", error)
    return []
  }
}

export default async function PoemsPage() {
  const poems = await getPoems()

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-28 pb-24 px-6">
        <div className="max-w-4xl mx-auto page-transition">
          {/* Header */}
          <header className="mb-16 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Collection
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight text-foreground mb-6">
              Poetry
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
             Verses that hold fleeting emotions, personal reflections, and the beauty in everyday moments
            </p>
          </header>

          {/* Poems List */}
          {poems.length > 0 ? (
            <div className="space-y-12">
              {poems.map((poem) => (
                <article 
                  key={poem.id}
                  className="group border-b border-border/50 pb-12 last:border-0"
                >
                  <Link href={`/poems/${poem.id}`} className="block">
                    <time className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(poem.created_at), { addSuffix: true })}
                    </time>
                    <h2 className="font-serif text-2xl md:text-3xl font-medium mt-2 group-hover:text-primary transition-colors">
                      {poem.title}
                    </h2>
                    {poem.excerpt && (
                      <p className="text-muted-foreground mt-4 leading-relaxed line-clamp-3 font-serif italic">
                        {poem.excerpt}
                      </p>
                    )}
                    <span className="inline-block mt-4 text-primary text-sm font-medium link-literary">
                      Read poem
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="font-serif text-2xl text-muted-foreground italic">
                Poetry coming soon...
              </p>
              <p className="text-muted-foreground mt-4">
                New verses are being crafted. Check back later.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
