import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { ArrowRight, BookOpen, Feather, Sparkles } from "lucide-react"

async function getLatestContent() {
  try {
    const supabase = await createClient()

    const [poemsResult, thoughtsResult, booksResult] = await Promise.all([
      supabase
        .from("poems")
        .select("id, title, excerpt, created_at")
        .order("created_at", { ascending: false })
        .limit(3),
      supabase
        .from("thoughts")
        .select("id, title, excerpt, created_at")
        .order("created_at", { ascending: false })
        .limit(3),
      supabase
        .from("books")
        .select("id, title, author, rating, created_at")
        .order("created_at", { ascending: false })
        .limit(3),
    ])

    return {
      poems: poemsResult.data || [],
      thoughts: thoughtsResult.data || [],
      books: booksResult.data || [],
    }
  } catch (error) {
    // Return empty arrays if Supabase is not configured
    console.warn("Supabase not configured, showing empty content:", error)
    return {
      poems: [],
      thoughts: [],
      books: [],
    }
  }
}

export default async function HomePage() {
  const { poems, thoughts, books } = await getLatestContent()

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto text-center page-transition">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Welcome to my literary sanctuary
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-8 text-balance">
              Find what you love and let it kill you
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              A collection of poetry, introspective musings, and literary discoveries. 
              Where thoughts find their voice and stories find their home.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/poems"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium tracking-wide uppercase text-sm hover:bg-primary/90 transition-colors rounded-sm"
              >
                Explore Poetry
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-medium tracking-wide uppercase text-sm hover:bg-secondary transition-colors rounded-sm"
              >
                About Me
              </Link>
            </div>
          </div>
          
          {/* Decorative Element */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-px h-16 bg-border" />
          </div>
        </section>

        {/* Featured Sections */}
        <section className="py-24 px-6 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Poems Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Feather className="text-primary" size={24} />
                  <h2 className="font-serif text-2xl font-medium">Poetry</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Verses that capture fleeting emotions, observations, and the beauty found in ordinary moments.
                </p>
                {poems.length > 0 ? (
                  <ul className="space-y-4">
                    {poems.map((poem) => (
                      <li key={poem.id}>
                        <Link
                          href={`/poems/${poem.id}`}
                          className="block group"
                        >
                          <h3 className="font-serif text-lg group-hover:text-primary transition-colors">
                            {poem.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {poem.excerpt}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    Poetry coming soon...
                  </p>
                )}
                <Link
                  href="/poems"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium link-literary"
                >
                  View all poems
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Thoughts Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="text-primary" size={24} />
                  <h2 className="font-serif text-2xl font-medium">Thoughts</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Reflections on life, art, and the human experience. Essays that invite contemplation.
                </p>
                {thoughts.length > 0 ? (
                  <ul className="space-y-4">
                    {thoughts.map((thought) => (
                      <li key={thought.id}>
                        <Link
                          href={`/thoughts/${thought.id}`}
                          className="block group"
                        >
                          <h3 className="font-serif text-lg group-hover:text-primary transition-colors">
                            {thought.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {thought.excerpt}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    Thoughts coming soon...
                  </p>
                )}
                <Link
                  href="/thoughts"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium link-literary"
                >
                  Read all thoughts
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Books Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-primary" size={24} />
                  <h2 className="font-serif text-2xl font-medium">Books</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Literary journeys and book recommendations. Discovering stories worth sharing.
                </p>
                {books.length > 0 ? (
                  <ul className="space-y-4">
                    {books.map((book) => (
                      <li key={book.id}>
                        <Link
                          href={`/books/${book.id}`}
                          className="block group"
                        >
                          <h3 className="font-serif text-lg group-hover:text-primary transition-colors">
                            {book.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            by {book.author}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    Book reviews coming soon...
                  </p>
                )}
                <Link
                  href="/books"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium link-literary"
                >
                  Browse all books
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-32 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="font-serif text-3xl md:text-4xl text-foreground leading-relaxed italic">
              {`"The purpose of literature is to turn blood into ink."`}
            </blockquote>
            <cite className="block mt-6 text-muted-foreground not-italic">
              — T.S. Eliot
            </cite>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
              Let&apos;s Connect
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              Have a thought to share, a poem that resonates, or simply want to say hello? 
              I&apos;d love to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground text-primary font-medium tracking-wide uppercase text-sm hover:bg-primary-foreground/90 transition-colors rounded-sm"
            >
              Get in Touch
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
