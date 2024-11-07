/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/auction",
        destination: "https://open.api.nexon.com/mabinogi/v1/auction/list",
      },
      {
        source: "/api/auction_history",
        destination: "https://open.api.nexon.com/mabinogi/v1/auction/history",
      },
      {
        source: "/api/npc_shop",
        destination: "https://open.api.nexon.com/mabinogi/v1/npcshop/list",
      },
    ];
  },
};

export default nextConfig;
