import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  compress: true,

  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
