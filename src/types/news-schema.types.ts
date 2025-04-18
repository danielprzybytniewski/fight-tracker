import { z } from "zod";

const NewsContentSchema = z.object({
  type: z.string(),
  src: z.string().optional(),
  data: z.array(z.object({ text: z.string() })).optional(),
});

const NewsDetailSchema = z.object({
  author: z.string(),
  categories: z.string(),
  content: z.array(NewsContentSchema),
  title: z.string(),
});

export const NewsApiResponseSchema = z.object({
  articles: z.array(NewsDetailSchema),
});

export type NewsContentData = z.infer<typeof NewsContentSchema>;
export type NewsDetailData = z.infer<typeof NewsDetailSchema>;
