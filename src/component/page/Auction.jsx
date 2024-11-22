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
  const [subCategories, setSubCategories] = useState({});
  const [isCategory, setIsCategory] = useState("");
  const [isSubCategory, setIsSubCategory] = useState("");
  const [itemName, setItemName] = useState("");

  useEffect(() => {
    // 대분류
    const fetchCategories = async () => {
      try {
        const response = await fetch("/data/auction/categories.json");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("카테고리 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    // 소분류
    const fetchSubCategories = async () => {
      try {
        const response = await fetch("/data/auction/subCategories.json");
        const data = await response.json();
        setSubCategories(data);
      } catch (error) {
        console.error("서브 카테고리 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchCategories();
    fetchSubCategories();
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
          auction_item_category: isSubCategory || undefined,
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
    setIsCategory("");
    setIsSubCategory("");
    setItemName("");
    setData(null);
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-2.5 mt-5 bg-white p-4 rounded-md">
        <ReactSelect
          inputId="main-category-select"
          placeholder="대분류를 선택하세요"
          options={categories}
          value={
            isCategory
              ? categories.find((option) => option.value === isCategory)
              : null
          }
          onChange={(selectedOption) => setIsCategory(selectedOption.value)}
        />
        <ReactSelect
          inputId="sub-category-select"
          placeholder="소분류를 선택하세요"
          options={subCategories[isCategory]}
          value={
            isSubCategory
              ? subCategories[isCategory].find(
                  (option) => option.value === isSubCategory
                )
              : null
          }
          onChange={(selectedOption) => setIsSubCategory(selectedOption.value)}
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
