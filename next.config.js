/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   appDir: true,
  // },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  // images: {
  //   remotePatterns: ['localhost']
  // }
}

module.exports = nextConfig
