/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // permite carregar QUALQUER domínio
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
