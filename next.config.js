/** @type {import('next').NextConfig} */
const withVideos = require('next-videos');

module.exports = withVideos({
  basePath: './public/img',

  webpack(config, options) {
    return config;
  },
});

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
};

module.exports = nextConfig;
