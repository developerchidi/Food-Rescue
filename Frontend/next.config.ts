import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "nuocmamanchau.com",
      },
      {
        protocol: "https",
        hostname: "*.mm.bing.net",
      },
      {
        protocol: "https",
        hostname: "hopdungthucan.com",
      },
      {
        protocol: "https",
        hostname: "vcdn1-video.vnecdn.net",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname),
  // @ts-ignore - Turbopack root config for newer Next.js versions
  turbopack: {
    root: path.join(__dirname),
  },
  experimental: {},
};

export default nextConfig;
