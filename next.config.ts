import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Coolify builds this in Docker and runs it as a plain Node process, so the
  // server and only the dependencies it actually imports are traced into
  // .next/standalone. Without this the image has to carry all of node_modules.
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dribbble.com",
      },
    ],
  },
};

export default nextConfig;
