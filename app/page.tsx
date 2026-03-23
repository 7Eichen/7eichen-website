import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { BlogCard } from '@/components/BlogCard'
import { Button } from '@/components/ui/button'
import { events, type Event } from '@/data/events'

function formatEventDate(start: string, end?: string): string {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('de-CH', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  return end ? `${fmt(start)} – ${fmt(end)}` : fmt(start)
}

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3)

  const today = new Date().toISOString().slice(0, 10)
  const upcomingEvents = [...events]
    .sort((a, b) => a.start.localeCompare(b.start))
    .filter((e) => (e.end ?? e.start) >= today)
    .slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-[1600px] px-3 sm:px-4">
          <div className="relative overflow-hidden rounded-3xl" style={{ minHeight: '540px' }}>
            {/* Background image */}
            <Image
              src="/images/home/siebnen.webp"
              alt="Siebnen"
              fill
              className="object-cover"
              priority
            />
            {/* Dark overlay */}
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.40)' }} />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-end min-h-[540px] px-8 py-12 sm:px-14 sm:py-16">
              <p
                className="mb-3 text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: '#d4aa00' }}
              >
                Willkommen beim
              </p>

              <h1 className="text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl text-white">
                Verein <span style={{ color: '#d4aa00' }}>7 Eichen</span>
              </h1>

              <p
                className="mt-2 text-2xl font-semibold tracking-wide"
                style={{ color: '#d4aa00' }}
              >
                Siebnen
              </p>

              <p className="mt-5 text-lg leading-relaxed text-white/80 max-w-xl">
                Der Einwohnerverein von Siebnen verbindet Menschen, fördert das
                Dorfgemeinschaftsleben und schafft gemeinsame Erlebnisse – für alle,
                die in Siebnen zuhause sind.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/blog">Neuigkeiten lesen</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <FeatureCard
              icon="🌳"
              title="Gemeinschaft"
              text="Wir verbinden Einwohnerinnen und Einwohner aus Siebnen und schaffen einen Ort der Begegnung und des Austausches."
            />
            <FeatureCard
              icon="🎉"
              title="Anlässe"
              text="Vom Dorffest bis zum Jahresausflug – wir organisieren Veranstaltungen, die Menschen zusammenbringen."
            />
            <FeatureCard
              icon="📣"
              title="Engagement"
              text="Wir setzen uns für das Wohl unseres Dorfes ein und bringen die Anliegen der Bevölkerung ein."
            />
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      {upcomingEvents.length > 0 && (
        <section className="py-20 sm:py-28" style={{ backgroundColor: 'var(--muted)' }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>
                  Nächste Veranstaltungen
                </h2>
                <p className="mt-2" style={{ color: 'var(--muted-foreground)' }}>
                  Was demnächst bei uns stattfindet
                </p>
              </div>
              <Link href="/events" className="nav-link" style={{ opacity: 1, color: '#6b3b19' }}>
                Alle Veranstaltungen →
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              {upcomingEvents.map((event, i) => (
                <EventRow key={i} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest posts */}
      {latestPosts.length > 0 && (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>
                  Aktuelles
                </h2>
                <p className="mt-2" style={{ color: 'var(--muted-foreground)' }}>
                  Die neuesten Beiträge aus dem Vereinsleben
                </p>
              </div>
              <Link href="/blog" className="nav-link" style={{ opacity: 1, color: '#6b3b19' }}>
                Alle Beiträge →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: string
  title: string
  text: string
}) {
  return (
    <div
      className="card rounded-2xl p-8"
      style={{ backgroundColor: 'var(--card)' }}
    >
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="mb-3 text-xl font-bold" style={{ color: 'var(--foreground)' }}>
        {title}
      </h3>
      <p className="leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
        {text}
      </p>
    </div>
  )
}

function EventRow({ event }: { event: Event }) {
  return (
    <div
      className="card flex flex-col gap-1 rounded-2xl px-6 py-5 sm:flex-row sm:items-center sm:gap-6"
      style={{ backgroundColor: 'var(--card)' }}
    >
      {/* Date badge */}
      <div
        className="shrink-0 rounded-xl px-4 py-2 text-center sm:w-44"
        style={{ backgroundColor: 'var(--muted)' }}
      >
        <p className="text-sm font-semibold tabular-nums" style={{ color: 'var(--foreground)' }}>
          {formatEventDate(event.start, event.end)}
        </p>
      </div>

      {/* Details */}
      <div className="flex-1">
        <p className="font-semibold text-lg" style={{ color: 'var(--foreground)' }}>
          {event.name}
        </p>
        <p className="text-sm mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
          {event.location}
        </p>
      </div>

      {/* Link */}
      {event.url && (
        <Link
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-sm font-medium underline underline-offset-2 hover:opacity-75"
          style={{ color: '#6b3b19' }}
        >
          Details →
        </Link>
      )}
    </div>
  )
}
