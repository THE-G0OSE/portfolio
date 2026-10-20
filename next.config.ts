import type { NextConfig } from "next";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // browser talks to the api through the site origin, so the admin cookie stays first-party
  async rewrites() {
    return [{ source: "/backend/:path*", destination: `${API_URL}/:path*` }];
  },
};

export default nextConfig;
