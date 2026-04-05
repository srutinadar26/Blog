import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"

export const metadata = {
  title: "Contact | Sruti",
  description: "Get in touch with Sruti. Share your thoughts, feedback, or just say hello.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-28 pb-24 px-6">
        <div className="max-w-2xl mx-auto page-transition">
          {/* Header */}
          <header className="mb-16 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Let&apos;s Talk
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight text-foreground mb-6">
              Contact
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Have a thought to share, a poem that resonates, or simply want to say hello?
              I&apos;d love to hear from you.
            </p>
          </header>

          {/* Contact Form */}
          <ContactForm />

          {/* Alternative Contact */}
          <div className="mt-16 pt-12 border-t border-border/50 text-center">
            <p className="text-muted-foreground">
              Prefer email? Reach me at{" "}
              <a
                href="mailto:srutinadar26@gmail.com"
                className="text-primary link-literary"
              >
                srutinadar26@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
