import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  tag?: string
}

function pageHref(page: number, tag?: string) {
  const params = new URLSearchParams()
  if (page > 1) params.set('page', String(page))
  if (tag) params.set('tag', tag)
  const qs = params.toString()
  return `/news${qs ? `?${qs}` : ''}`
}

export function Pagination({ currentPage, totalPages, tag }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav aria-label="Seitennavigation" className="flex items-center justify-center gap-1 pt-10">
      {/* Previous */}
      <Button variant="outline" size="icon" disabled={currentPage <= 1} asChild={currentPage > 1}>
        {currentPage > 1 ? (
          <Link href={pageHref(currentPage - 1, tag)} aria-label="Vorherige Seite">
            <ChevronLeft className="size-4" />
          </Link>
        ) : (
          <span aria-disabled="true"><ChevronLeft className="size-4" /></span>
        )}
      </Button>

      {/* Page numbers */}
      {pages.map((page) => {
        const isCurrent = page === currentPage
        return (
          <Button
            key={page}
            variant={isCurrent ? 'default' : 'outline'}
            size="icon"
            aria-current={isCurrent ? 'page' : undefined}
            asChild={!isCurrent}
          >
            {isCurrent ? (
              <span>{page}</span>
            ) : (
              <Link href={pageHref(page, tag)}>{page}</Link>
            )}
          </Button>
        )
      })}

      {/* Next */}
      <Button variant="outline" size="icon" disabled={currentPage >= totalPages} asChild={currentPage < totalPages}>
        {currentPage < totalPages ? (
          <Link href={pageHref(currentPage + 1, tag)} aria-label="Nächste Seite">
            <ChevronRight className="size-4" />
          </Link>
        ) : (
          <span aria-disabled="true"><ChevronRight className="size-4" /></span>
        )}
      </Button>
    </nav>
  )
}
