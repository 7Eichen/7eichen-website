import Link from 'next/link'
import Image from 'next/image'
import type { PostMeta } from '@/lib/blog'
import { formatDate } from '@/lib/blog'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Card className="card gap-0 overflow-hidden rounded-2xl p-0">
      {/* Hero image */}
      {post.heroImage && (
        <Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
            />
          </div>
        </Link>
      )}

      <CardContent className="flex flex-1 flex-col gap-3 pt-5 pb-3">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                <Badge variant="secondary" className="text-xs">{tag}</Badge>
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-lg font-semibold leading-snug hover:underline" style={{ color: 'var(--foreground)' }}>
            {post.title}
          </h2>
        </Link>

        {/* Description */}
        <p className="line-clamp-3 flex-1 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
          {post.description}
        </p>
      </CardContent>

      <CardFooter className="pt-0 pb-4 text-xs" style={{ color: 'var(--muted-foreground)' }}>
        <span className="font-medium">{post.author}</span>
        <span className="mx-2" aria-hidden="true">·</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </CardFooter>
    </Card>
  )
}
