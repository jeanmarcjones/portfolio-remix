export type Frontmatter = {
  title: string
  description: string
  // published: string; // YYYY-MM-DD
}

export type PostMeta = {
  slug: string
  frontmatter: Frontmatter
}

export const getPosts = async (): Promise<PostMeta[]> => {
  const modules = import.meta.glob<{
    frontmatter: Frontmatter
  }>('./_post+/*.mdx', { eager: true })
  const build = await import('virtual:remix/server-build')

  const posts = Object.entries(modules).map(([file, post]) => {
    const id = `routes/md-blog+/${file.replace('./', '').replace(/\.mdx$/, '')}`
    const slug = build.routes[id].path

    if (slug === undefined) throw new Error(`No route for ${id}`)

    return {
      slug,
      frontmatter: post.frontmatter,
    }
  })

  return posts
}
