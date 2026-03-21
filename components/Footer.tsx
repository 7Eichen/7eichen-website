import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-auto"
      style={{
        backgroundColor: 'var(--muted)',
        boxShadow: '0 -1px 8px rgba(0,0,0,0.04)',
        color: 'var(--muted-foreground)',
      }}
    >
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div>
            <div className="flex flex-col leading-none mb-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#d4aa00' }}>
                Verein
              </span>
              <span className="text-lg font-bold tracking-tight" style={{ color: '#6b3b19' }}>
                7 Eichen
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#d4aa00' }}>
                Siebnen
              </span>
            </div>
            <p className="text-sm max-w-xs" style={{ color: 'var(--muted-foreground)' }}>
              Der Einwohnerverein von Siebnen – für ein lebendiges Dorfgemeinschaftsleben.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--muted-foreground)' }}>
              Navigation
            </p>
            <Link href="/" className="text-sm hover:underline" style={{ color: 'var(--muted-foreground)' }}>
              Startseite
            </Link>
            <Link href="/events" className="text-sm hover:underline" style={{ color: 'var(--muted-foreground)' }}>
              Veranstaltungen
            </Link>
            <Link href="/blog" className="text-sm hover:underline" style={{ color: 'var(--muted-foreground)' }}>
              Blog
            </Link>
          </nav>
        </div>

        <div className="mt-8 pt-6 text-xs text-center sm:text-left" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
          © {year} Verein 7 Eichen Siebnen. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  )
}
