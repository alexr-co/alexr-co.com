// Single source of truth for projects. The projects page renders every entry
// in order, and the home page shows the first one (`ls projects/ | head -1`),
// so keep the most current project at the top of the array.
//
// Status meanings:
//   active   — still being actively built or evolved (launched or not)
//   shipped  — live and stable; only maintenance or content updates expected
//   archived — no longer maintained; may or may not still be online
export type ProjectStatus = 'active' | 'shipped' | 'archived';

export interface Project {
  slug: string;
  title: string;
  year: string;
  status: ProjectStatus;
  blurb: string;
  description: string;
  tags: string[];
  links?: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    slug: 'simple-metro',
    title: 'Simple Metro',
    year: '2026',
    status: 'active',
    blurb: 'A fast, real-time arrivals board for the Washington DC Metro, served from a single cached snapshot at Cloudflare’s edge.',
    description:
      'A React 19 + Vite SPA on Firebase Hosting, backed by a Cloudflare Worker that proxies WMATA’s APIs. A Durable Object pinned to the US East coast holds one strongly-consistent data snapshot, pre-warmed by cron triggers, so a single upstream fetch serves every user and WMATA load stays constant regardless of traffic. Predictions come from WMATA’s GTFS-Realtime protobuf feeds — decoded by a small dependency-free protobuf reader — giving real arrival times and car counts up to ~45 minutes out, with a fallback to the legacy JSON endpoint so the board never goes blank. Each station gets a clean URL and an info tab with hours, first/last trains, and live elevator/escalator outages.',
    tags: ['react', 'typescript', 'cloudflare-workers', 'durable-objects', 'gtfs-realtime', 'firebase'],
    links: [
      { label: 'live',   href: 'https://metro.alexr-co.com' },
      { label: 'github', href: 'https://github.com/alexr-co/simple-metro' },
    ],
  },
  {
    slug: 'alexr-co-com',
    title: 'alexr-co.com',
    year: '2026',
    status: 'shipped',
    blurb: 'This site. Statically generated, multi-cloud, with keyless CI/CD across GCP, Cloudflare, and GitHub.',
    description:
      'A multi-page Astro 5 site with content collections for writing and journal entries, deployed on Firebase Hosting with automated deploys via GitHub Actions. Auth between CI and GCP uses Workload Identity Federation (no service account JSON keys ever exist). DNS and cookieless analytics live on Cloudflare; email is on Google Workspace. The local dev environment runs fully containerized via Docker Compose. As much an exercise in deliberate infrastructure choices as a portfolio — every piece of the stack was picked to either work well for this use case or to teach a transferable skill.',
    tags: ['astro', 'typescript', 'firebase', 'gcp', 'cloudflare', 'github-actions'],
    links: [
      { label: 'live',   href: 'https://alexr-co.com' },
      { label: 'github', href: 'https://github.com/alexr-co/alexr-co.com' },
    ],
  },
];
