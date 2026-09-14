/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Enable standalone output for Docker
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true, // Added unoptimized field
  },
  compress: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true, // Added eslint configuration
  },
  typescript: {
    ignoreBuildErrors: true, // Added typescript configuration
  },
}

export default nextConfig
