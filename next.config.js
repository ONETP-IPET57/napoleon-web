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
  rewrites: () => {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:5000/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
