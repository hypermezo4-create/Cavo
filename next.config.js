/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      { source: "/shop", destination: "/store/products" },
      { source: "/men", destination: "/store/men" },
      { source: "/women", destination: "/store/women" },
      { source: "/kids", destination: "/store/kids" },
      { source: "/offers", destination: "/store/offers" },
      { source: "/reviews", destination: "/store/reviews" },
      { source: "/contact", destination: "/store/contact" },
      { source: "/products", destination: "/store/products" },
    ];
  },
};

module.exports = nextConfig;
