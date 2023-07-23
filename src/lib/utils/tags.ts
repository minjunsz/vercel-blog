import { getAllFilesFrontMatter } from '@/lib/mdx'
import { formatTag } from './format-tag'

export async function getAllTags(subdir: string) {
  const files = await getAllFilesFrontMatter(subdir)

  let tagCount: { [key: string]: number } = {}
  // Iterate through each post, putting all found tags into `tags`
  files.forEach((file) => {
    file.tags.forEach((tag) => {
      const formattedTag = formatTag(tag)
      if (formattedTag in tagCount) {
        tagCount[formattedTag] += 1
      } else {
        tagCount[formattedTag] = 1
      }
    })
  })

  return tagCount
}