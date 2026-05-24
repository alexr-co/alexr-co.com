# Dev-only image. Production builds happen in CI/CD later.
FROM node:22-alpine

# Astro dev server defaults to 4321
ENV HOST=0.0.0.0
ENV PORT=4321

WORKDIR /app

# Copy manifests first to leverage Docker's layer cache on dep installs.
COPY package.json package-lock.json* ./

# If a lockfile exists, prefer `npm ci`; otherwise fall back to `npm install`
# so the first-ever container start works before a lockfile is committed.
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Source is bind-mounted at runtime via docker-compose; no COPY needed.

EXPOSE 4321

CMD ["npm", "run", "dev"]
