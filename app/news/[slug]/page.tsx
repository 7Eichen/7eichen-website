import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { ChevronLeft } from 'lucide-react'
import { getPostSource, getAllPosts, formatDate } from '@/lib/news'
import { BASE_URL } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const result = getPostSource(slug)
  if (!result) return {}
  const { meta } = result
  const url = `${BASE_URL}/news/${slug}`
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: meta.title,
      description: meta.description,
      publishedTime: meta.date,
      authors: [meta.author],
      ...(meta.heroImage ? { images: [{ url: meta.heroImage }] } : {}),
    },
  }
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const result = getPostSource(slug)
  if (!result) notFound()

  const { source, meta } = result

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Back link */}
      <Button variant="ghost" size="sm" asChild className="mb-8 -ml-2">
        <Link href="/news">
          <ChevronLeft className="mr-1 size-4" />
          Zurück zur News
        </Link>
      </Button>

      {/* Tags */}
      {meta.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {meta.tags.map((tag) => (
            <Link key={tag} href={`/news?tag=${encodeURIComponent(tag)}`}>
              <Badge variant="secondary">{tag}</Badge>
            </Link>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold leading-tight sm:text-4xl" style={{ color: 'var(--foreground)' }}>
        {meta.title}
      </h1>

      {/* Meta */}
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
        <span className="font-medium">{meta.author}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={meta.date}>{formatDate(meta.date)}</time>
      </div>

      {/* Hero image */}
      {meta.heroImage && (
        <div className="relative mt-8 h-64 w-full overflow-hidden rounded-2xl sm:h-80 lg:h-96">
          <Image
            src={meta.heroImage}
            alt={meta.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      {/* Description / lead */}
      <p
        className="mt-6 rounded-xl px-5 py-4 text-lg leading-relaxed font-medium"
        style={{ backgroundColor: 'rgba(212,170,0,0.07)', color: 'var(--muted-foreground)' }}
      >
        {meta.description}
      </p>

      {/* MDX Content – renders server-side, zero client JS unless you use client components inside */}
      <div className="prose prose-lg dark:prose-invert mt-8">
        <MDXRemote source={source} options={{ ...mdxOptions, parseFrontmatter: true }} />
      </div>

      {/* Footer nav */}
      <div className="mt-12 pt-6">
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link href="/news">
            <ChevronLeft className="mr-1 size-4" />
            Alle Beiträge
          </Link>
        </Button>
      </div>
    </article>
  )
}
