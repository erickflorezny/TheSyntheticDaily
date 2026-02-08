import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // Redirects for old ID-based URLs to new slug-based URLs
  async redirects() {
    // These redirects handle the migration from /stories/:id and /sidebar/:id
    // to /stories/:slug and /sidebar/:slug
    return [
      // Story redirects
      {
        source: '/stories/:id(\\d+)',
        destination: '/api/redirect/story/:id',
        permanent: true,
      },
      // Sidebar story redirects
      {
        source: '/sidebar/:id(\\d+)',
        destination: '/api/redirect/sidebar/:id',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
