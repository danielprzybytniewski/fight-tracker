import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.tapology.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
