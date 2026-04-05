import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "About | Sruti",
  description: "Learn more about Sruti, a writer and poet exploring the depths of human experience through words.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto page-transition">
          {/* Header */}
          <header className="mb-16 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              The Writer
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight text-foreground mb-6">
              About Me
            </h1>
          </header>

          {/* Content */}
          <div className="prose-literary space-y-8 text-lg leading-relaxed">
            <p>
              Welcome to my little corner of the internet. I&apos;m Sruti, a writer 
              who finds solace in the rhythm of words and the spaces between them.
            </p>

            <p>
              This space was born from a simple desire: to create a sanctuary where 
              thoughts could breathe, where poetry could find its audience, and where 
              the books that have moved me could be shared with kindred spirits.
            </p>

            <blockquote className="border-l-2 border-primary pl-6 my-12 font-serif text-2xl italic text-foreground">
              {`"We write to taste life twice, in the moment and in retrospection."`}
              <cite className="block mt-4 text-base text-muted-foreground not-italic">
                — Anaïs Nin
              </cite>
            </blockquote>

            <p>
              My poetry often explores themes of identity, belonging, and the quiet 
              moments that shape our understanding of the world. I believe that the 
              most profound truths are often found in the smallest observations—a 
              shaft of light through a window, the weight of silence, the particular 
              way memory reshapes our past.
            </p>

            <p>
              The thoughts section serves as a space for longer reflections. Here, 
              I explore ideas that deserve more room to unfold, essays on art, 
              literature, and the human experience that have been simmering in my 
              mind.
            </p>

            <p>
              And then there are the books—those faithful companions that have 
              accompanied me through seasons of change. I share my reading journey 
              here, hoping that perhaps a recommendation might lead you to your 
              next literary love.
            </p>

            <div className="border-t border-border/50 pt-12 mt-12">
              <h2 className="font-serif text-2xl font-medium mb-6">
                Let&apos;s Connect
              </h2>
              <p className="mb-8">
                I believe in the power of conversation and the connections we forge 
                through shared words. If something here resonated with you, or if 
                you simply want to say hello, I&apos;d love to hear from you.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium tracking-wide uppercase text-sm hover:bg-primary/90 transition-colors rounded-sm"
              >
                Get in Touch
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
