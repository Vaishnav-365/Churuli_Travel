import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable TypeScript type checking during build
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "z8z3qxivr7.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: 'https',
        hostname: 'utfs.io', // if using UploadThing
      },
      {
        protocol: 'https',
        hostname: '**.ufs.sh', // UploadThing CDN
      },
      {
        protocol: 'https',
        hostname: '**.utfs.io', // sometimes UploadThing uses this
      },
    ],
  },
  // Ensure Prisma client is included in the build
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
