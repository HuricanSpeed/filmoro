import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["image.tmdb.org"], // Přidání podporované domény
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**", // Opraveno pro všechny cesty obrázků
      },
    ],
  },
};

export default nextConfig;
