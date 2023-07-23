import path from "path"
import fs from 'fs'
import { bundleMDX } from 'mdx-bundler'
import readingTime from 'reading-time'
import matter from 'gray-matter'

import { getFileFromSlug, getFilesFromDir, getPrefixPath } from "../utils/files"

// Remark-Rehype plugins
import remarkExtractFrontmatter from './remark-extract-frontmatter'
import remarkTocHeadings from "./remark-toc-headings"
import remarkGfm from "remark-gfm"
import remarkCodeTitles from "./remark-code-titles"
import remarkFootnotes from "remark-footnotes"
import remarkMath from "remark-math"
import remarkImgToJsx from "./remark-img-to-jsx"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from "rehype-preset-minify"
import { FrontMatterSchema, ParsedMDXFrontMatterSchema } from "./schemas"
import { TocHeading } from "@/components/mdx-components/TOCInline"

interface FrontMatter {
  title: string,
  summary: string,
  tags: string[],
  date: Date
}

const root = process.cwd()

const parseSourceWithBundleMDX = async (source: string) => {
  // const { default: rehypeCitation } = await import("rehype-citation")

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'esbuild.exe')
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'bin', 'esbuild')
  }

  const toc: TocHeading[] = []

  const parsedResult = await bundleMDX<FrontMatter>({
    source,
    cwd: path.join(root, 'components'),
    mdxOptions: (options, _) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkExtractFrontmatter,
        [remarkTocHeadings, { exportRef: toc }],
        remarkGfm,
        remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
        remarkImgToJsx,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        // [rehypeCitation, { path: path.join(root, 'data') }],
        [rehypePrismPlus, { ignoreMissing: true, showLineNumbers: true }],
        rehypePresetMinify,
      ]
      return options
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        '.js': 'jsx',
      }
      // options.target = [
      //   'es2020',
      //   'chrome58',
      //   'firefox57',
      //   'safari11',
      //   'edge16',
      //   'node12',
      // ]
      return options
    },
  })

  return { parsedResult, toc }
}

export async function getAllFilesFrontMatter(subdir: string) {
  const allowedFileTypes = ['.md', '.mdx']
  const files = getFilesFromDir(subdir)
  const allowedFiles = files.filter((file) => allowedFileTypes.includes(path.extname(file)))

  const prefixPath = getPrefixPath(subdir)
  const frontMatters = allowedFiles.map((file) => {
    const filePath = path.join(prefixPath, file)
    const source = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(source)
    const frontMatter = FrontMatterSchema.parse({
      ...data,
      slug: path.parse(file).name, // file name w/o extension
    })
    return frontMatter
  })

  const dateSortDesc = (a: Date, b: Date) => {
    if (a > b) return -1
    if (a < b) return 1
    return 0
  }
  frontMatters.sort((a, b) => dateSortDesc(a.date, b.date))

  return frontMatters
}

export async function getPostFromSlug(subdir: string, slug: string) {
  const source = getFileFromSlug(subdir, slug)
  const { parsedResult, toc } = await parseSourceWithBundleMDX(source)
  const { code, frontmatter: parsedMDXFrontmatter } = parsedResult

  const frontMatter = ParsedMDXFrontMatterSchema.parse({
    ...parsedMDXFrontmatter,
    readingTime: readingTime(code),
    slug: slug,
  })

  return {
    mdxSource: code,
    toc,
    frontMatter,
  }
}