// src/pages/api/auction.js
import axios from "axios";

export default async function handler(req, res) {
  const { npc_name, server_name, channel } = req.query;

  if (!npc_name || !server_name || !channel) {
    return res.status(400).json({
      error: "npc_name, server_name, channel 필수입력 입니다",
    });
  }

  try {
    const response = await axios.get(
      "https://open.api.nexon.com/mabinogi/v1/npcshop/list",
      {
        headers: {
          "x-nxopen-api-key": process.env.NEXON_API_KEY,
        },
        params: {
          npc_name,
          server_name,
          channel,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("API 요청 실패:", error);
    res.status(error.response?.status || 500).json({
      error: "데이터를 가져오는 중 오류 발생",
      details: error.response?.data || null,
    });
  }
}
