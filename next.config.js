/** @type {import('next').NextConfig} */
const withVideos = require('next-videos');
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'build',
  rewrites: () => {
    return [
      {
        source: '/api/:path*',
        destination: 'http://thejairex.pythonanywhere.com/api/:path*',
      },
    ];
  },
  i18n,
};

module.exports = nextConfig;
