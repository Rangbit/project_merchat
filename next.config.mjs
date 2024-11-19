/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["open.api.nexon.com"], // 외부 이미지를 로드할 도메인 추가
  },
  async headers() {
    return [
      {
        source: "/images/:path*", // /images 경로에 대한 모든 요청
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // 모든 도메인 허용
          },
        ],
      },
    ];
  },
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
