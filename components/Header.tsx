import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{ backgroundColor: 'var(--background)', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none" aria-label="Verein 7 Eichen Siebnen – Startseite">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#d4aa00' }}>
            Verein
          </span>
          <span className="text-xl font-bold tracking-tight" style={{ color: '#6b3b19' }}>
            7 Eichen
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#d4aa00' }}>
            Siebnen
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-0.5">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">Start</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/events">Veranstaltungen</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog">Blog</Link>
          </Button>
          <div className="mx-1 h-5 w-px" style={{ backgroundColor: 'var(--border)' }} />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
