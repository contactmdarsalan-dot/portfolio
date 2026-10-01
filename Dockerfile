# Next.js standalone build for Coolify.
#
# Three stages so the image that actually runs carries the server and the
# traced dependencies only - not npm, not the source, not the 500 MB of
# node_modules the build needed.

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# npm ci, not install: the lockfile is the input, and a build that quietly
# resolves a different tree than the one tested is not reproducible.
RUN npm ci


FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build


FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Runs unprivileged. The container only ever reads its own files, so there is
# no reason for the process inside it to be root.
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# Answers on the port Coolify's proxy will probe, so a container that booted
# but cannot serve is reported as unhealthy instead of being routed traffic.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
