/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    // config.resolve.alias = {
    //   "@/*": path.resolve("./"),
    //   "~/*": path.resolve("./public"),
    // };
    config.resolve.alias["@"] = path.resolve("./");
    config.resolve.alias["~"] = path.resolve("./public");
    return config;
  },
  async rewrites() {
    return [
      // request proxy
      {
        source: "/text-api/:path*",
        destination: `${process.env.DESTINATION_URL}:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
