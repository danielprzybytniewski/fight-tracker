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
      {
        protocol: "https",
        hostname: "www.sherdog.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**-cdn.sherdog.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ufc.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dmxg5wxfqgb4u.cloudfront.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mmajunkie.usatoday.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "feeds.usatodaysports.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
