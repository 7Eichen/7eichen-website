import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_PER_PAGE = 10
const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface PostMeta {
  slug: string
  title: string
  date: string
  author: string
  description: string
  heroImage?: string
  tags: string[]
}

/** Fast metadata-only read (no MDX compilation) */
export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const { data } = matter(fs.readFileSync(fullPath, 'utf8'))
      return {
        slug,
        title:       data.title       as string,
        date:        data.date        as string,
        author:      data.author      as string,
        description: data.description as string,
        heroImage:   data.heroImage   as string | undefined,
        tags:       (data.tags        as string[]) ?? [],
      } satisfies PostMeta
    })
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

/** Returns raw MDX source + metadata for the post page */
export function getPostSource(slug: string): { source: string; meta: PostMeta } | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return {
      source: fileContents,
      meta: {
        slug,
        title:       data.title       as string,
        date:        data.date        as string,
        author:      data.author      as string,
        description: data.description as string,
        heroImage:   data.heroImage   as string | undefined,
        tags:       (data.tags        as string[]) ?? [],
      },
    }
  } catch {
    return null
  }
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  getAllPosts().forEach((post) => post.tags.forEach((t) => tags.add(t)))
  return Array.from(tags).sort()
}

export function getPaginatedPosts(
  page: number,
  tag?: string
): { posts: PostMeta[]; totalPages: number; currentPage: number } {
  let posts = getAllPosts()
  if (tag) posts = posts.filter((p) => p.tags.includes(tag))
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE))
  const safePage   = Math.min(Math.max(1, page), totalPages)
  const start      = (safePage - 1) * POSTS_PER_PAGE
  return { posts: posts.slice(start, start + POSTS_PER_PAGE), totalPages, currentPage: safePage }
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('de-CH', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}
