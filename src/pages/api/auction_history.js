import axios from "axios";

export default async function handler(req, res) {
  const { auction_item_category, item_name, cursor } = req.query;

  if (!auction_item_category && !item_name) {
    return res.status(400).json({
      error: "auction_item_category 또는 item_name 중 하나는 필수입니다.",
    });
  }

  try {
    const response = await axios.get(
      "https://open.api.nexon.com/mabinogi/v1/auction/list",
      {
        headers: {
          "x-nxopen-api-key": process.env.NEXON_API_KEY,
          "Content-Type": "application/json",
        },
        params: {
          auction_item_category,
          item_name,
          // cursor,
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
