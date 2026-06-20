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
  // Раздел «Евангелие» переименован в «Библия» - старые ссылки ведём на новый путь.
  async redirects() {
    return [
      { source: "/evangelie", destination: "/bibliya", permanent: true },
      {
        source: "/evangelie/:book/:chapter",
        destination: "/bibliya/:book/:chapter",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
