import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.abdulkadiraltinel.com.tr' },
      { protocol: 'https', hostname: 'abdulkadiraltinel.com.tr' },
      { protocol: 'https', hostname: '**.cdninstagram.com' },
      { protocol: 'https', hostname: '**.facebook.com' },
    ],
  },
};

export default nextConfig;
