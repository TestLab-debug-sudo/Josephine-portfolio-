import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  devIndicators: false,
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "gsap",
      "three",
      "@gsap/react",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
