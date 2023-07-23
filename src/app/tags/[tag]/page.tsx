import ListPagination from '@/components/ListPagination'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { formatTag } from '@/lib/utils/format-tag'
import { getAllTags } from '@/lib/utils/tags'

const POST_DIR = 'mlpost'

type Parameters = {
  tag: string
}

export async function generateStaticParams(): Promise<Parameters[]> {
  const tags = await getAllTags(POST_DIR)

  return Object.keys(tags).map((tag) => {
    return { tag }
  })
}

export default async function Tag({ params }: { params: Parameters }) {
  const allPosts = await getAllFilesFrontMatter(POST_DIR)
  const filteredPosts = allPosts.filter(
    (post) => post.tags.map((t) => formatTag(t)).includes(params.tag)
  )
  // Capitalize first letter and convert space to dash
  const title = params.tag[0].toUpperCase() + params.tag.split(' ').join('-').slice(1)
  return (
    <>
      <ListPagination posts={filteredPosts} title={title} />
    </>
  )
}
