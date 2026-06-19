import path from "node:path";
import { fileURLToPath } from "node:url";

const monorepoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Самодостаточная сборка для компактного Docker-образа.
  output: "standalone",
  // В монорепо трассировка зависимостей должна начинаться от корня.
  outputFileTracingRoot: monorepoRoot,
  // Локальные пакеты компилируются вместе с приложением.
  transpilePackages: ["@istina/ui", "@istina/db"],
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
