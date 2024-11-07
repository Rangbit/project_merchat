// src/pages/index.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState(null);
  const auctionItemCategory = "천옷"; // 원하는 카테고리 입력
  const itemName = "스페셜"; // 아이템 이름 (필요하면 입력)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/auction", {
          params: {
            auction_item_category: auctionItemCategory || undefined,
            item_name: itemName || undefined, // 선택적으로 사용
            // cursor: "100",
          },
        });
        console.log("response.data : ", response.data);
        setData(response.data);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>정보</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>로딩 중...</p>}
    </div>
  );
}
