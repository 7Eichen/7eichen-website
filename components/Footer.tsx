import Link from 'next/link'
import { LogoIcon } from './LogoIcon'
import { SiebnenflagIcon } from './SiebnenflagIcon'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-auto"
      style={{
        backgroundColor: 'var(--muted)',
        borderTop: '1px solid var(--border)',
        color: 'var(--muted-foreground)',
      }}
    >
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="flex items-start gap-5">
            <SiebnenflagIcon className="shrink-0 mt-1 h-14 w-auto" />
            <div>
              <LogoIcon className="h-8 w-auto mb-3" />
              <p className="text-sm max-w-xs" style={{ color: 'var(--muted-foreground)' }}>
                Der Einwohnerverein von Siebnen – für ein lebendiges Dorfgemeinschaftsleben.
              </p>
            </div>
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
