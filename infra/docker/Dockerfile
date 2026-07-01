# syntax=docker/dockerfile:1.7
#
# Универсальный multi-stage Dockerfile для приложений монорепозитория.
# Какое приложение собирать, задаётся build-аргументом APP (web | erp).
# Контекст сборки - корень репозитория.
#
#   docker build -f infra/docker/Dockerfile --build-arg APP=web -t vnls-web .
#   docker build -f infra/docker/Dockerfile --build-arg APP=erp -t vnls-erp .

ARG NODE_VERSION=22

# ── Базовый образ ───────────────────────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && apk add --no-cache libc6-compat
WORKDIR /app

# ── Прунинг монорепо до целевого приложения и его зависимостей ───────────────
FROM base AS pruner
ARG APP
RUN npm install -g turbo@^2
COPY . .
RUN turbo prune "${APP}" --docker

# ── Установка зависимостей и сборка ──────────────────────────────────────────
FROM base AS builder
ARG APP
ENV NEXT_TELEMETRY_DISABLED=1
# Сначала только манифесты: слой установки зависимостей кешируется Railway
# (BuildKit layer cache), пока не меняется lock-файл - повторные сборки быстрые.
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile
# Затем исходники и сборка.
COPY --from=pruner /app/out/full/ .
RUN pnpm --filter @vnls/db run db:generate
RUN pnpm --filter "${APP}" run build
# Query engine Prisma не попадает в standalone-трейс автоматически -
# кладём его рядом с приложением, где Prisma его ищет (/app/<app>/.prisma/client).
RUN ENGINE="$(find node_modules -name 'libquery_engine-linux-musl-openssl-3.0.x.so.node' | head -1)" \
  && mkdir -p "${APP}/.next/standalone/${APP}/.prisma/client" \
  && cp "$ENGINE" "${APP}/.next/standalone/${APP}/.prisma/client/"

# ── Рантайм ──────────────────────────────────────────────────────────────────
FROM base AS runner
ARG APP
ENV APP=${APP}
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Standalone-вывод Next.js повторяет структуру монорепо.
COPY --from=builder --chown=nextjs:nodejs /app/${APP}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/${APP}/.next/static ./${APP}/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/${APP}/public ./${APP}/public

USER nextjs
EXPOSE 3000
CMD ["sh", "-c", "node ${APP}/server.js"]
