/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/w320/**",
      },
      {
        protocol: "https",
        hostname: "*.wikimedia.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
