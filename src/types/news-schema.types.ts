import { z } from "zod";

const NewsContentSchema = z.object({
  type: z.string(),
  src: z.string().optional(),
  data: z
    .union([
      z.array(z.object({ text: z.string() })),
      z.array(z.array(z.any())),
      z.any(),
    ])
    .optional(),
});

const NewsDetailSchema = z.object({
  author: z.string(),
  title: z
    .string()
    .transform((title) => title.replace(/(video|watch):?\s*/gi, "").trim()),
  modified: z.string(),
  categories: z.string(),
  content: z.array(NewsContentSchema),
});

export const NewsApiResponseSchema = z.object({
  articles: z.array(NewsDetailSchema),
});

export type NewsContentData = z.infer<typeof NewsContentSchema>;
export type NewsDetailData = z.infer<typeof NewsDetailSchema>;
