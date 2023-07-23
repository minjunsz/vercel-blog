import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import { formatTag } from '@/lib/utils/format-tag'
import { TocHeading } from '@/components/mdx-components/TOCInline';

export default function remarkTocHeadings(options: { exportRef: TocHeading[] }) {
  return (tree: any) =>
    visit(tree, 'heading', (node, index, parent) => {
      const textContent = toString(node)
      options.exportRef.push({
        value: textContent,
        url: '#' + formatTag(textContent),
        depth: node.depth,
      })
    })
}