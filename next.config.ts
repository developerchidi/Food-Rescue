import type { NextConfig } from "next";

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
  experimental: {
    // @ts-ignore
    turbo: {
      root: ".",
    },
  },
};

export default nextConfig;
