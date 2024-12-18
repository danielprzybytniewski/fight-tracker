import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.tapology.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
