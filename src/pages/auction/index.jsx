// src/pages/index.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ReactSelect from "@/component/select/ReactSelect";
import BasicButton from "@/component/button/BasicButton";

export default function Home() {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState({});
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

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
      <ReactSelect
        inputId="main-category-select"
        placeholder="대분류를 선택하세요"
        options={Object.keys(categories).map((category) => ({
          value: category,
          label: category,
        }))}
        value={
          mainCategory ? { value: mainCategory, label: mainCategory } : null
        }
        onChange={(selectedOption) => {
          setMainCategory(selectedOption.value);
          setSubCategory("");
        }}
      />

      {/* 소분류 선택 */}
      <ReactSelect
        inputId="sub-category-select"
        placeholder="소분류를 선택하세요"
        options={
          mainCategory
            ? categories[mainCategory].map((subcategory) => ({
                value: subcategory,
                label: subcategory,
              }))
            : []
        }
        value={subCategory ? { value: subCategory, label: subCategory } : null}
        onChange={(selectedOption) => setSubCategory(selectedOption.value)}
        isDisabled={!mainCategory}
      />
      <BasicButton onClick={handleSearch} innerText="검색" />

      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p></p>}
    </div>
  );
}
