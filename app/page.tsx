import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { ArrowRight, BookOpen, Feather, Sparkles, Instagram } from "lucide-react"

export const dynamic = 'force-dynamic'

async function getLatestContent() {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

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
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Welcome to my literary sanctuary
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-8 text-balance">
              Choose what you love, and let the rest fall away
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              A space shaped by poems, passing thoughts, and books that leave a mark.
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
                  Verses that hold fleeting emotions, personal reflections, and the beauty found in ordinary moments.
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
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium"
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
                  Reflections on life, art, and the human experience meant to be felt and allowed to settle.
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
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium"
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
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium"
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
              "The purpose of literature is to turn blood into ink."
            </blockquote>
            <cite className="block mt-6 text-muted-foreground not-italic">
              — T.S. Eliot
            </cite>
          </div>
        </section>

        {/* Pinterest Section */}
        <section className="py-20 px-6 bg-secondary/20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4">
              Explore More
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              A quiet extension of this space lives elsewhere too.
              It's where I write my poems, the ones that press against me until they're let out.
            </p>
            <Link
              href="https://in.pinterest.com/codedinpoetry/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary text-sm font-medium"
            >
              Explore more poems on Pinterest
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-14 px-6 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
              Let's Connect
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              Have a thought to share, a poem that resonates, or simply want to say hello?
              I'd love to hear from you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground text-primary font-medium tracking-wide uppercase text-sm hover:bg-primary-foreground/90 transition-colors rounded-sm"
              >
                Get in Touch
                <ArrowRight size={16} />
              </Link>

              <a
                href="https://www.instagram.com/shrutii26._/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center p-3 border border-primary-foreground rounded-full hover:bg-primary-foreground hover:text-primary transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}