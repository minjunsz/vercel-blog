import path from "path"
import fs from 'fs'

const root = process.cwd()

export const getPrefixPath = (subdir: string) => path.join(root, 'src', 'data', subdir)

export function getFilesFromDir(subdir: string) {
  const prefixPath = getPrefixPath(subdir)
  const files = fs.readdirSync(prefixPath)
  return files
}

export function getFileFromSlug(subdir: string, slug: string) {
  const prefixPath = getPrefixPath(subdir)
  const mdFilePath = path.join(prefixPath, slug + ".md")
  const mdxFilePath = path.join(prefixPath, slug + ".mdx")
  const source = fs.existsSync(mdxFilePath)
    ? fs.readFileSync(mdxFilePath, 'utf8')
    : fs.readFileSync(mdFilePath, 'utf8')

  return source
}