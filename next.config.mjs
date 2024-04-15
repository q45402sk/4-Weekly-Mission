/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'codeit-images.codeit.com',
        port: '',
        // pathname: "/weekly_mission_next.js/**",
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
        port: '',
        // pathname: "/weekly_mission_next.js/**",
      },
    ],
  },
};

export default nextConfig;
