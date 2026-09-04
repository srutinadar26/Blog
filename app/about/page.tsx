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
              Welcome to my little corner of the internet. 
              <br></br>
              I&apos;m Sruti, A writer, A poet, and a lover of words. I write to explore the depths of human experience, 
              to capture fleeting moments, and to give voice to emotions that often go unspoken. 
              Writing is my way of making sense of the world, of understanding myself and of connecting with others who may feel the same way. 
              I write because some feelings only make sense once they're turned into words.
            </p>

            <p>
              This space was born from a simple desire: to create a sanctuary where 
              thoughts could breathe, where poetry could find its own voice, and where 
              the books that have moved me could be shared with kindred spirits.
            </p>

            <blockquote className="border-l-2 border-primary pl-6 my-12 font-serif text-2xl italic text-foreground">
              {`"We write to taste life twice, in the moment and in retrospection."`}
              <cite className="block mt-4 text-base text-muted-foreground not-italic">
                — Anaïs Nin
              </cite>
            </blockquote>

            <p>
              I write to give a home to the things that have nowhere else to go, to gather the feelings 
              I cannot name and turn them into something beautiful. I write to hold onto fleeting moments, 
              to remember the versions of myself I have been, and to make art from the pieces life leaves behind. 
              Some words help me understand, some help me heal, and some simply need to be released into the world 
              so I can breathe a little lighter. I write for the joy of creating, for the ache of feeling deeply, 
              for the memories worth keeping, and for the things I am finally ready to let go of. 
              Somewhere between the words, the silences, and everything I cannot say, 
              I am learning not just how to write, but how to feel, how to let go, and how to live.

            </p>

           <p>
            The thoughts section is for the things that linger, the ideas I can’t quite let go of, 
            the stories that stay with me, and the questions I keep coming back to. 
            A little space for what I notice, what I wonder, and everything I’m still trying to understand.

          </p>

            <p>
              And then there are the books those faithful companions that have 
              accompanied me through seasons of change. I share my reading journey 
              here, hoping that perhaps a recommendation might lead you to your 
              next literary love.
            </p>

            <div className="border-t border-border/50 pt-12 mt-12">
              <h2 className="font-serif text-2xl font-medium mb-6">
                Let&apos;s Connect
              </h2>
              <p className="mb-8">
                If something here resonates with you, feel free to reach out. 
                I’m always happy to hear a thought, start a conversation, or simply say hello.

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
