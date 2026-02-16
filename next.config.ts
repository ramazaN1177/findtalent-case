import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "standalone",
  typescript: {
    // Next.js 16 build'de oluşan "Duplicate identifier PagesPageConfig" hatasını atla (Coolify/Docker build için)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
