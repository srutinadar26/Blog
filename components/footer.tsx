import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link 
              href="/" 
              className="font-serif text-2xl font-medium text-foreground"
            >
              Sruti Nadar
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              A space shaped by poems, passing thoughts, and books that leave a mark.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium text-foreground">Explore</h4>
            <ul className="space-y-2">
              {[
                { href: "/poems", label: "Poems" },
                { href: "/thoughts", label: "Thoughts" },
                { href: "/books", label: "Books" },
                { href: "/about", label: "About" },
              ].map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors link-literary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium text-foreground">Connect</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors link-literary"
                >
                  Get in Touch
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:srutinadar26@gmail.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors link-literary"
                >
                  srutinadar26@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            {currentYear} Sruti Nadar. All rights reserved.
          </p>
          <p className="text-sm md:text-base text-muted-foreground italic font-serif">
  {"\"Find what you love and let it kill you.\" "}
  <br></br>
  <br></br>
  <span className="text-foreground font-sans not-italic">
    — Charles Bukowski
  </span>
</p>
        </div>
      </div>
    </footer>
  )
}
