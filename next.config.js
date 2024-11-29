/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/reservation',
        destination: '/reservation/car-choices',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["ziwgpvyijudfxxlrrsxp.supabase.co"],
  },
};

module.exports = nextConfig;
