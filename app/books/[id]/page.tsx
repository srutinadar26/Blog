import Link from "next/link"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { format } from "date-fns"
import { ArrowLeft, Star } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

async function getBook(id: string) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("books")
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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={18}
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

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const book = await getBook(id)
  
  if (!book) {
    return { title: "Book Not Found | Sruti" }
  }

  return {
    title: `${book.title} by ${book.author} | Books | Sruti`,
    description: book.excerpt || `A book review by Sruti`,
  }
}

export default async function BookPage({ params }: PageProps) {
  const { id } = await params
  const book = await getBook(id)

  if (!book) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-28 pb-24 px-6">
        <article className="max-w-3xl mx-auto page-transition">
          {/* Back Link */}
          <Link 
            href="/books"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back to Books</span>
          </Link>

          {/* Header */}
          <header className="mb-12">
            <time className="text-sm text-muted-foreground">
              {format(new Date(book.created_at), "MMMM d, yyyy")}
            </time>
            <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-foreground mt-4 text-balance">
              {book.title}
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              by {book.author}
            </p>
            <div className="mt-4">
              <StarRating rating={book.rating} />
            </div>
          </header>

          {/* Review Content */}
          <div className="prose-literary">
            <div className="text-foreground leading-relaxed whitespace-pre-line text-lg">
              {book.review}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-12 border-t border-border/50">
            <p className="text-sm text-muted-foreground italic font-serif">
              — Reviewed by Sruti
            </p>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  )
}
