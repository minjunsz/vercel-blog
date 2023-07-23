import { slug } from 'github-slugger'

export const formatTag = (tag: string) => slug(tag)