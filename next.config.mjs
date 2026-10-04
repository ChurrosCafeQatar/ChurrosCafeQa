/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.churroscafeqa.com' }],
        destination: 'https://churroscafeqa.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
