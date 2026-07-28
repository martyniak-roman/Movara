import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ["image.tmdb.org", "placehold.co"],
  },
};

export default nextConfig;
