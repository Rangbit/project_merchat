// src/pages/index.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ReactSelect from "@/component/select/ReactSelect";
import BasicButton from "@/component/button/BasicButton";
import BasicInput from "@/component/input/BasicInput";
import BasicTable from "@/component/table/BasicTable";

const headers = [
  { key: "item_name", label: "이름", width: 70 },
  { key: "date_auction_expire", label: "남은시간", width: 10 },
  { key: "auction_price_per_unit", label: "가격", width: 20 },
];

const sample_data = [
  {
    item_name: "상품1",
    date_auction_expire: "5시간",
    auction_price_per_unit: "1000",
  },
  {
    item_name: "상품2",
    date_auction_expire: "3시간",
    auction_price_per_unit: "2000",
  },
  {
    item_name: "상품3",
    date_auction_expire: "10시간",
    auction_price_per_unit: "500",
  },
];

// pageType = 1 auction
// pageType = 2 auction/history
export default function Auction({ pageType }) {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState({});
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [itemName, setItemName] = useState("");

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
    let axiosUrl = "";
    if (pageType == 1) {
      axiosUrl = "/api/auction";
    } else {
      axiosUrl = "/api/auction_history";
    }
    try {
      const response = await axios.get(axiosUrl, {
        params: {
          auction_item_category: subCategory || undefined,
          item_name: itemName || undefined,
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

  const handleReset = () => {
    setMainCategory("");
    setSubCategory("");
    setItemName("");
    setData(null);
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-2.5 mt-5">
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
          value={
            subCategory ? { value: subCategory, label: subCategory } : null
          }
          onChange={(selectedOption) => setSubCategory(selectedOption.value)}
          isDisabled={!mainCategory}
        />
        <BasicInput
          width={360}
          inputId="search_input"
          onChange={(e) => setItemName(e.target.value)}
        />
        <BasicButton onClick={handleSearch} innerText="검색" />
        <BasicButton onClick={handleReset} innerText="초기화" />
      </div>
      <div className="h-5"></div>
      <div className="">
        {data && <BasicTable headers={headers} data={data} />}
      </div>
    </div>
  );
}
