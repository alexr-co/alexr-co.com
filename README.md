# Personal Website

A minimal personal portfolio site, built with [Astro](https://astro.build/),
runs entirely inside a Docker container so nothing has to be installed on the
host machine.

## Prerequisites

Only one thing on the host:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (which
  includes the `docker` CLI and the `docker compose` plugin)

No Node, no npm, no Astro CLI required locally.

## Running the dev server

From the project root:

```sh
docker compose up
```

The first run will build the image (installs Node 22 + project dependencies
inside the container). Subsequent runs reuse the cached image.

Once you see the Astro banner, open <http://localhost:4321>.

Edit any file in `src/` and the page reloads automatically.

To stop the server, press `Ctrl+C` (or `docker compose down` in another
terminal).

## Adding content

Both writing and the photo journal are markdown files. Drop a new `.md` file
in the right folder and the site picks it up on the next reload — no code
changes needed.

### A new blog post

Create `src/content/writing/your-slug.md`:

```md
---
title: "Your post title"
date: 2026-05-23
description: "Short blurb that shows on the index page."
tags: ["tag-a", "tag-b"]
draft: false
---

Your content in markdown.
```

### A new journal entry

1. Drop a photo into `public/photos/journal/your-slug.jpg`
2. Create `src/content/journal/your-slug.md`:

```md
---
title: "Short title for the moment"
date: 2026-05-23
location: "City, State"
image: "/photos/journal/your-slug.jpg"
alt: "Description of the photo for screen readers"
---

A few sentences about what was going on when you took the picture.
```

Entries are sorted newest-first automatically.

### A new project

Open `src/pages/projects.astro` and add an entry to the `projects` array near
the top. Each entry renders as a section on the page.

## Project structure

```
.
|-- Dockerfile              # Node 22 alpine, runs `npm run dev`
|-- docker-compose.yml      # Mounts source, exposes :4321
|-- astro.config.mjs        # Astro config (server host/port, file watching)
|-- package.json
|-- public/                 # Static assets served at the site root
|   |-- favicon.svg
|   `-- photos/journal/     # Photos referenced by journal entries
|-- src/
|   |-- content.config.ts   # Defines `writing` and `journal` collections
|   |-- content/
|   |   |-- writing/        # Blog posts (markdown)
|   |   `-- journal/        # Photo journal entries (markdown)
|   |-- components/         # Nav, Footer
|   |-- layouts/Base.astro  # The shared page shell
|   |-- pages/              # Each .astro file is a route
|   |   |-- index.astro
|   |   |-- projects.astro
|   |   |-- about.astro
|   |   |-- resume.astro
|   |   |-- contact.astro
|   |   |-- writing/
|   |   `-- journal/
|   `-- styles/global.css   # Theme tokens and base styles
`-- README.md
```

## Customizing the look

All theme tokens live at the top of `src/styles/global.css` as CSS custom
properties — colors, the font stack, layout widths. Change them there and
every page picks it up.

## Building for production

```sh
docker compose run --rm web npm run build
```

This produces a `dist/` folder of static HTML/CSS/JS that can be deployed to
any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, plain S3,
etc.). Deployment is intentionally out of scope for now.

## Conventions

- Pages and components are TypeScript-checked via `astro check` (run inside
  the container).
- Markdown frontmatter is validated by Zod schemas in `src/content.config.ts` —
  if a required field is missing the build fails with a clear error.
- Drafts: set `draft: true` in frontmatter to keep a post hidden from index
  pages and the dynamic route.

## Why Astro

Astro renders to static HTML by default — there is no JavaScript runtime
shipped to the browser unless I opt into it. That keeps the site fast, the
build simple, and the hosting bill at zero on any static host. The content
collections API gives type-safe markdown with almost no ceremony.

## Why Docker

Keeps Node, npm, and any future tooling off the host machine. The container
holds everything; the host just needs Docker. Pull the project, run
`docker compose up`, get a working dev environment in two minutes.
