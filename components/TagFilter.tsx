import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface TagFilterProps {
  tags: string[]
  activeTag?: string
}

export function TagFilter({ tags, activeTag }: TagFilterProps) {
  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
        Filtern:
      </span>

      <Link href="/news" scroll={false}>
        <Badge
          variant={!activeTag ? 'default' : 'secondary'}
          className="cursor-pointer transition-opacity hover:opacity-80"
        >
          Alle
        </Badge>
      </Link>

      {tags.map((tag) => (
        <Link key={tag} href={tag === activeTag ? '/news' : `/news?tag=${encodeURIComponent(tag)}`} scroll={false}>
          <Badge
            variant={tag === activeTag ? 'default' : 'secondary'}
            className="cursor-pointer transition-opacity hover:opacity-80"
          >
            {tag}
          </Badge>
        </Link>
      ))}
    </div>
  )
}
