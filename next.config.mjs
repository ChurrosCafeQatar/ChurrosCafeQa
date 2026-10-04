/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'churroscafeqa.com' }],
        destination: 'https://www.churroscafeqa.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
