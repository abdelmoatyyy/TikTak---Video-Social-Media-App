/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "picsum.photos",
      "lh3.googleusercontent.com",
      "media.licdn.com",
      "drive.google.com",
    ],
  },
};

module.exports = nextConfig;
