// src/pages/index.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState({}); // 대분류와 소분류를 담은 JSON 데이터
  const [mainCategory, setMainCategory] = useState(""); // 대분류 선택값
  const [subCategory, setSubCategory] = useState(""); // 소분류 선택값

  // JSON 파일에서 카테고리 데이터 가져오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/data/auction/categories.json");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("카테고리 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/auction_history", {
        params: {
          auction_item_category: subCategory || undefined,
        },
      });
      console.log("response.data : ", response.data);
      setData(response.data);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div>
      {/* 대분류 선택 */}
      <select
        value={mainCategory}
        onChange={(e) => {
          setMainCategory(e.target.value);
          setSubCategory(""); // 대분류 변경 시 소분류 초기화
        }}
      >
        <option value="" disabled>
          대분류를 선택하세요
        </option>
        {Object.keys(categories).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* 소분류 선택 */}
      <select
        value={subCategory}
        onChange={(e) => setSubCategory(e.target.value)}
        disabled={!mainCategory} // 대분류가 선택되지 않으면 비활성화
      >
        <option value="" disabled>
          소분류를 선택하세요
        </option>
        {mainCategory &&
          categories[mainCategory].map((subcategory) => (
            <option key={subcategory} value={subcategory}>
              {subcategory}
            </option>
          ))}
      </select>

      <button onClick={handleSearch}>검색</button>

      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>로딩 중...</p>}
    </div>
  );
}
