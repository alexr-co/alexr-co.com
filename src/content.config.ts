import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    location: z.string().optional(),
    // Path inside /public — e.g. "/photos/journal/coastal-fog.jpg"
    // Optional so entries with placeholder gradients still validate.
    image: z.string().optional(),
    alt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing, journal };
