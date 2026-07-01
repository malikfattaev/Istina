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
  transpilePackages: ["@vnls/ui", "@vnls/db"],
  reactStrictMode: true,
  poweredByHeader: false,
  // Старые пути ведём на новые: «Евангелие» -> «Библия», «форум» -> «клуб»
  // (ребрендинг ПМФ -> ПМК «Истина»).
  async redirects() {
    return [
      { source: "/evangelie", destination: "/bibliya", permanent: true },
      {
        source: "/evangelie/:book/:chapter",
        destination: "/bibliya/:book/:chapter",
        permanent: true,
      },
      { source: "/forum", destination: "/club", permanent: true },
      { source: "/forum/:path*", destination: "/club/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
