import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // อนุญาตทุกโดเมนที่เป็น HTTPS
      },
      {
        protocol: "http",
        hostname: "**", // อนุญาตทุกโดเมนที่เป็น HTTP (เผื่อไว้)
      },
    ],
  },
};

export default nextConfig;