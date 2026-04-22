import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { Star } from "lucide-react"

async function getBooks() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data || []
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
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
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <header className="mb-16 text-center">
            <h1 className="text-4xl md:text-6xl font-serif mb-4">
              Books
            </h1>
            <p className="text-muted-foreground">
              Stories that stayed with me.
            </p>
          </header>

          {/* Grid */}
          {books.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {books.map((book) => (
                <article
                  key={book.id}
                  className="p-6 border rounded hover:border-primary transition"
                >
                  <Link href={`/books/${book.id}`}>

                    <h2 className="text-xl font-serif hover:text-primary">
                      {book.title}
                    </h2>

                    <p className="text-muted-foreground">
                      by {book.author}
                    </p>

                    <div className="mt-2">
                      <StarRating rating={book.rating} />
                    </div>

                    {book.excerpt && (
                      <p className="text-sm mt-3 text-muted-foreground line-clamp-3">
                        {book.excerpt}
                      </p>
                    )}

                    <p className="mt-4 text-primary text-sm">
                      Read review →
                    </p>

                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No books yet.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}