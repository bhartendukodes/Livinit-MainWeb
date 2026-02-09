/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nyvlydjdvhsunqbliqru.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.livinit.ai",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
