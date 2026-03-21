import type { Metadata } from 'next'
import { getPaginatedPosts, getAllTags } from '@/lib/blog'
import { BlogCard } from '@/components/BlogCard'
import { Pagination } from '@/components/Pagination'
import { TagFilter } from '@/components/TagFilter'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Neuigkeiten und Berichte vom Verein 7 Eichen Siebnen.',
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; tag?: string }>
}) {
  const { page: pageParam, tag } = await searchParams
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1)

  const { posts, totalPages, currentPage } = getPaginatedPosts(page, tag)
  const allTags = getAllTags()

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>
          Blog
        </h1>
        <p className="mt-2 text-base" style={{ color: 'var(--muted-foreground)' }}>
          Neuigkeiten und Berichte aus dem Vereinsleben
        </p>
      </div>

      {/* Tag filter */}
      <div className="mb-8">
        <TagFilter tags={allTags} activeTag={tag} />
      </div>

      {/* Post grid */}
      {posts.length === 0 ? (
        <div
          className="card rounded-2xl p-12 text-center"
          style={{ backgroundColor: 'var(--card)', color: 'var(--muted-foreground)' }}
        >
          <p className="text-lg">
            {tag
              ? `Keine Beiträge mit dem Tag «${tag}» gefunden.`
              : 'Noch keine Beiträge vorhanden.'}
          </p>
          {tag && (
            <a
              href="/blog"
              className="mt-4 inline-block text-sm underline"
              style={{ color: '#6b3b19' }}
            >
              Alle Beiträge anzeigen
            </a>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} tag={tag} />
    </div>
  )
}
