import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https://images.unsplash.com https://www.transparenttextures.com https://pub-331231a8c21d4e6db2f224146773362c.r2.dev",
  "media-src 'self' blob: https://pub-331231a8c21d4e6db2f224146773362c.r2.dev",
  "font-src 'self' data:",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
  "upgrade-insecure-requests"
].join("; ");

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
  },
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "Content-Security-Policy", value: contentSecurityPolicy },
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" }
      ]
    }];
  }
};

export default nextConfig;
