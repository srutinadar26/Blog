import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Cormorant_Garamond, Lora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeToggle } from '@/components/theme-toggle'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const lora = Lora({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sruti | Poetry, Thoughts & Literary Musings',
  description: 'A space shaped by poems, passing thoughts, and books that leave a mark.',
  keywords: ['poetry', 'literature', 'thoughts', 'books', 'writing', 'creative writing'],
  authors: [{ name: 'Sruti' }],
  openGraph: {
    title: 'Sruti | Poetry, Thoughts & Literary Musings',
    description: 'A space shaped by poems, passing thoughts, and books that leave a mark.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#f5f0e8',
  width: 'device-width',
  initialScale: 1,
}

// Script to prevent flash of wrong theme on page load
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (theme === 'dark' || (!theme && prefersDark)) {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}
  })();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${lora.variable}`} suppressHydrationWarning>
      <head>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen theme-transition">
        {children}
        <ThemeToggle />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
