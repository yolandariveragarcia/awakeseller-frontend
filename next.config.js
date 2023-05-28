/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  reactStrictMode: true,
  async middleware() {
    const middleware = require('./middleware');

    return middleware;
  }
}

module.exports = nextConfig
