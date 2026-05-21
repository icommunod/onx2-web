import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",      // Génère ./out/ — site statique compatible IONOS webspace
  trailingSlash: true,   // Nécessaire pour la navigation IONOS
  images: {
    unoptimized: true,   // Requis en mode export (pas de server Next.js)
  },
};

export default nextConfig;
