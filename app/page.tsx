import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { BlogCard } from '@/components/BlogCard'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        {/* Background image */}
        <Image
          src="/images/home/siebnen.webp"
          alt="Siebnen"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }} />

        {/* Decorative oak-gold bar */}
        <div
          className="absolute left-0 top-0 h-1 w-full"
          style={{ backgroundColor: '#d4aa00' }}
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <p
              className="mb-4 text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: '#d4aa00' }}
            >
              Willkommen beim
            </p>

            {/* Main heading */}
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-white">
              Verein<br />
              <span style={{ color: '#d4aa00' }}>7 Eichen</span>
            </h1>

            <p
              className="mt-2 text-xl font-semibold tracking-wide"
              style={{ color: '#d4aa00' }}
            >
              Siebnen
            </p>

            <p className="mt-6 text-lg leading-relaxed text-white/85">
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
      </section>

      {/* About */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-3">
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

      {/* Latest posts */}
      {latestPosts.length > 0 && (
        <section className="py-16 sm:py-20" style={{ backgroundColor: 'var(--muted)' }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: 'var(--foreground)' }}>
                  Aktuelles
                </h2>
                <p className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Die neuesten Beiträge aus dem Vereinsleben
                </p>
              </div>
              <Link
                href="/blog"
                className="text-sm font-medium hover:underline"
                style={{ color: '#6b3b19' }}
              >
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
      className="card rounded-2xl p-6"
      style={{ backgroundColor: 'var(--card)' }}
    >
      <div className="mb-3 text-3xl">{icon}</div>
      <h3 className="mb-2 text-lg font-bold" style={{ color: 'var(--foreground)' }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
        {text}
      </p>
    </div>
  )
}
