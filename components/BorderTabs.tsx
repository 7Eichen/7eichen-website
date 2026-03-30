'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

const MAPS = [
  {
    id: 'siebnen',
    label: 'Siebnen',
    src: 'https://search.ch/map/Siebnen?pos=710972,225542&zoom=12&b=high&embed=iframe',
  },
  {
    id: 'galgenen',
    label: 'Galgenen',
    src: 'https://search.ch/map/Galgenen?pos=710972,225542&zoom=12&b=high&embed=iframe',
  },
  {
    id: 'schuebelbach',
    label: 'Schübelbach',
    src: 'https://search.ch/map/Sch%C3%BCbelbach?pos=710972,225542&zoom=12&b=high&embed=iframe',
  },
  {
    id: 'wangen',
    label: 'Wangen',
    src: 'https://search.ch/map/Wangen-SZ?pos=710972,225542&zoom=12&b=high&embed=iframe',
  },
]

export function BorderTabs() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const map = searchParams.get('map') ?? 'siebnen'

  function onTabChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('map', value)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <Tabs value={map} onValueChange={onTabChange} className="w-full">
      <TabsList className="mb-4 !grid grid-cols-2 !h-auto !w-full gap-1 sm:!inline-flex sm:!w-fit sm:mx-auto">
        {MAPS.map((m) => (
          <TabsTrigger key={m.id} value={m.id} className="cursor-pointer !h-9 px-4 text-sm">
            {m.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {MAPS.map((m) => (
        <TabsContent key={m.id} value={m.id}>
          <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
            <iframe
              src={m.src}
              title={`Karte ${m.label}`}
              className="w-full h-[260px] sm:h-[400px] lg:h-[480px] block"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
