import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { formatDistanceToNow } from "date-fns"

async function getThoughts() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("thoughts")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching thoughts:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.warn("Supabase not configured, showing empty thoughts:", error)
    return []
  }
}

export default async function ThoughtsPage() {
  const thoughts = await getThoughts()

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-28 pb-24 px-6">
        <div className="max-w-4xl mx-auto page-transition">
          {/* Header */}
          <header className="mb-16 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Reflections
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight text-foreground mb-6">
              Thoughts
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Essays and reflections on life, art, and the human experience. Musings that invite contemplation.
            </p>
          </header>

          {/* Thoughts List */}
          {thoughts.length > 0 ? (
            <div className="space-y-12">
              {thoughts.map((thought) => (
                <article 
                  key={thought.id}
                  className="group border-b border-border/50 pb-12 last:border-0"
                >
                  <Link href={`/thoughts/${thought.id}`} className="block">
                    <time className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(thought.created_at), { addSuffix: true })}
                    </time>
                    <h2 className="font-serif text-2xl md:text-3xl font-medium mt-2 group-hover:text-primary transition-colors">
                      {thought.title}
                    </h2>
                    {thought.excerpt && (
                      <p className="text-muted-foreground mt-4 leading-relaxed line-clamp-3">
                        {thought.excerpt}
                      </p>
                    )}
                    <span className="inline-block mt-4 text-primary text-sm font-medium link-literary">
                      Continue reading
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="font-serif text-2xl text-muted-foreground italic">
                Thoughts coming soon...
              </p>
              <p className="text-muted-foreground mt-4">
                New reflections are being penned. Check back later.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
