import { getAllFilesFrontMatter } from '@/lib/mdx'
import ListPagination from '@/components/ListPagination'

export default async function Blog() {
  const posts = await getAllFilesFrontMatter('mlpost')

  return <ListPagination posts={posts} title='ML Posts' />
}