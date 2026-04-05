import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { Star } from "lucide-react"

async function getBooks() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching books:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.warn("Supabase not configured, showing empty books:", error)
    return []
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={
            star <= rating
              ? "fill-primary text-primary"
              : "text-border"
          }
        />
      ))}
    </div>
  )
}

export default async function BooksPage() {
  const books = await getBooks()

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-28 pb-24 px-6">
        <div className="max-w-4xl mx-auto page-transition">
          {/* Header */}
          <header className="mb-16 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Library
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight text-foreground mb-6">
              Books
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Literary journeys and book recommendations. Stories that have shaped my thinking.
            </p>
          </header>

          {/* Books Grid */}
          {books.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {books.map((book) => (
                <article 
                  key={book.id}
                  className="group p-6 bg-card border border-border/50 rounded-sm hover:border-primary/30 transition-colors"
                >
                  <Link href={`/books/${book.id}`} className="block">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h2 className="font-serif text-xl font-medium group-hover:text-primary transition-colors">
                          {book.title}
                        </h2>
                        <p className="text-muted-foreground mt-1">
                          by {book.author}
                        </p>
                      </div>
                      <StarRating rating={book.rating} />
                    </div>
                    {book.excerpt && (
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {book.excerpt}
                      </p>
                    )}
                    <span className="inline-block mt-4 text-primary text-sm font-medium link-literary">
                      Read review
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="font-serif text-2xl text-muted-foreground italic">
                Book reviews coming soon...
              </p>
              <p className="text-muted-foreground mt-4">
                New literary discoveries are being documented. Check back later.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
