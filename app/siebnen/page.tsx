import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import React from 'react'
import { BorderTabs } from '@/components/BorderTabs'
import { WangenIcon } from '@/components/WangenIcon'
import { GalgenenIcon } from '@/components/GalgenenIcon'
import { SchuelbachIcon } from '@/components/SchuelbachIcon'
import { BASE_URL } from '@/lib/constants'

const url = `${BASE_URL}/siebnen`

export const metadata: Metadata = {
  title: 'Siebnen',
  description: 'Siebnen – ein Dorf aus drei Gemeinden. Geschichte, Gemeinden und Karten.',
  alternates: { canonical: url },
  openGraph: {
    type: 'website',
    url,
    title: 'Siebnen | Verein 7 Eichen Siebnen',
    description: 'Siebnen – ein Dorf aus drei Gemeinden.',
  },
}

const communes = [
  {
    name: 'Wangen',
    population: '5\'490',
    siebnen: '1\'624',
    area: '10.86 km²',
    icon: WangenIcon,
    url: 'https://www.wangensz.ch/',
  },
  {
    name: 'Galgenen',
    population: '5\'436',
    siebnen: '2\'039',
    area: '13.26 km²',
    icon: GalgenenIcon,
    url: 'https://www.galgenen.ch/',
  },
  {
    name: 'Schübelbach',
    population: '9\'863',
    siebnen: '4\'110',
    area: '28.78 km²',
    icon: SchuelbachIcon,
    url: 'https://www.schuebelbach.ch/',
  },
]

export default function SiebnenPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>
          Siebnen
        </h1>
        <p className="mt-4 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
          Was heute drei Gemeinden verbindet, ist seit über 1000 Jahren gewachsen. 972 erstmals als „Sibineihha" erwähnt, leitet sich der Name von sieben Eichen an der Wägitaler Aa ab. Bis heute ist Siebnen ein lebendiges Dorf mit gemeinsamer Identität.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {communes.map((c) => (
          <CommuneCard key={c.name} {...c} />
        ))}
      </div>

      <div className="mt-16">
        <Suspense>
          <BorderTabs />
        </Suspense>
      </div>
    </div>
  )
}

function CommuneCard({
  name,
  population,
  siebnen,
  area,
  icon: Icon,
  url,
}: {
  name: string
  population: string
  siebnen: string
  area: string
  icon: React.ComponentType<{ className?: string }>
  url: string
}) {
  return (
    <div
      className="card rounded-2xl p-8 flex flex-col items-center text-center"
      style={{ backgroundColor: 'var(--card)' }}
    >
      <Icon className="h-24 w-auto mb-5" />

      <h3 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
        {name}
      </h3>

      <div
        className="mt-5 w-full rounded-xl p-4 grid grid-cols-3 gap-2"
        style={{ backgroundColor: 'var(--muted)' }}
      >
        <div>
          <p className="text-base font-bold tabular-nums" style={{ color: 'var(--foreground)' }}>
            {population}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
            Einwohner
          </p>
        </div>
        <div>
          <p className="text-base font-bold tabular-nums" style={{ color: 'var(--foreground)' }}>
            {siebnen}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
            in Siebnen
          </p>
        </div>
        <div>
          <p className="text-base font-bold" style={{ color: 'var(--foreground)' }}>
            {area}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
            Fläche
          </p>
        </div>
      </div>

      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 text-sm font-medium underline underline-offset-2 hover:opacity-75"
        style={{ color: '#6b3b19' }}
      >
        Website besuchen →
      </Link>
    </div>
  )
}
