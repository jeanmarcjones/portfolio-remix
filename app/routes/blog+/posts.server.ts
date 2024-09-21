import { z } from 'zod'

const FrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  published: z.string().date(),
})

export const PostMetaSchema = z.object({
  slug: z.string(),
  frontmatter: FrontmatterSchema,
})

export type Frontmatter = z.infer<typeof FrontmatterSchema>

export type PostMeta = z.infer<typeof PostMetaSchema>

export const getPosts = async (): Promise<PostMeta[]> => {
  const modules = import.meta.glob<{
    frontmatter: Frontmatter
  }>('./_post+/*.mdx', { eager: true })

  const build = await import('virtual:remix/server-build')

  return Object.entries(modules).map(([file, post]) => {
    const id = `routes/blog+/${file.replace('./', '').replace(/\.mdx$/, '')}`
    const slug = build.routes[id].path

    if (slug === undefined) throw new Error(`No route for ${id}`)

    return {
      slug,
      frontmatter: post.frontmatter,
    }
  })
}
