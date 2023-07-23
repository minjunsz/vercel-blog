import { z } from "zod";

export const FrontMatterSchema = z.object({
  title: z.string(),
  summary: z.string(),
  tags: z.string().array().nonempty(),
  slug: z.string(),
  date: z.date().default(new Date()),
});

export type FrontMatter = z.infer<typeof FrontMatterSchema>

export const ParsedMDXFrontMatterSchema = z.object({
  title: z.string(),
  summary: z.string(),
  tags: z.string().array().nonempty(),
  slug: z.string(),
  date: z.date().default(new Date()),
  readingTime: z.object({
    text: z.string(),
    time: z.number(),
    words: z.number(),
    minutes: z.number(),
  })
});

export type ParsedMDXFrontMatter = z.infer<typeof ParsedMDXFrontMatterSchema>