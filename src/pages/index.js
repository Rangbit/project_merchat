// pages/index.js
import { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/mabinogi/v1/auction/list");
        setData(response.data);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1> NPC</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>로딩 중...</p>}
    </div>
  );
}
