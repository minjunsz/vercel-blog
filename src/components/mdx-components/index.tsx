"use client"

/* eslint-disable react/display-name */
import React, { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import TOCInline, { TocHeading } from './TOCInline'
import Pre from './Pre'
import Image from './Image'
import Link from './Link'

const MDXComponents = {
  Image,
  TOCInline,
  a: Link,
  pre: Pre,
}

interface MDXPageProps {
  mdxSource: string;
  toc?: TocHeading[]
}

export const MDXPage = ({ mdxSource, toc }: MDXPageProps) => {
  const Component = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <Component components={MDXComponents} toc={toc} />
}