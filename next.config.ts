import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Small runtime image for Railway's builder.
  output: "standalone",
  async redirects() {
    return [
      // Root redirect by browser language; Arabic first, English default.
      {
        source: "/",
        has: [{ type: "header", key: "accept-language", value: "^ar.*" }],
        destination: "/ar",
        permanent: false,
      },
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
