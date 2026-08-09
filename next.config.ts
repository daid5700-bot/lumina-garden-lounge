import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  // Development-only allowlist so Next.js chunks and HMR work through ngrok.
  allowedDevOrigins: ["**.ngrok-free.dev"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.transparenttextures.com" },
      { protocol: "https", hostname: "pub-331231a8c21d4e6db2f224146773362c.r2.dev" }
    ],
    formats: ["image/avif", "image/webp"]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "8mb"
    }
  }
};

export default nextConfig;
