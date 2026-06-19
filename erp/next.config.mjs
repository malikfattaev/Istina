import path from "node:path";
import { fileURLToPath } from "node:url";

const monorepoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  outputFileTracingRoot: monorepoRoot,
  transpilePackages: ["@istina/ui", "@istina/db"],
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
