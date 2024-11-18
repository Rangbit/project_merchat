import BasicButton from "@/component/button/BasicButton";
import ReactSelect from "@/component/select/ReactSelect";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Shop() {
  const [data, setData] = useState(null);
  const [npcOptions, setNpcOptions] = useState({});
  const [npcName, setNpcName] = useState("");
  const [place, setPlace] = useState("");
  const [itemType, setItemType] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/data/auction/npc.json");
        const data = await response.json();
        setNpcOptions(data);
      } catch (error) {
        console.error("카테고리 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/npc_shop", {
        params: {
          npc_name: npcName || undefined,
          server_name: "류트",
          channel: 9,
        },
      });
      console.log("response.data : ", response.data);

      if (npcName === "피오나트") {
        const filteredData = response.data.shop
          .filter((shopItem) => shopItem.tab_name === "지원")
          .map((shopItem) =>
            shopItem.item.filter((item) =>
              item.item_display_name.includes("통행증")
            )
          )
          .flat(); // 배열 안의 배열을 평평하게 만듦

        console.log("filteredData:", filteredData);

        setData(filteredData);
        setItemType("통행증");
      } else {
        const filteredData = response.data.shop
          .filter((shopItem) => shopItem.tab_name === "주머니")
          .map((shopItem) => shopItem.item) // item 배열만 추출
          .flat(); // 배열 안의 배열을 평평하게 만듦

        console.log("filteredData:", filteredData);

        setData(filteredData);
        setItemType("주머니");
      }
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleReset = () => {
    setNpcName("");
    setData(null);
  };

  return (
    <>
      <div className="flex justify-center items-center gap-2.5 mt-5">
        <ReactSelect
          inputId="npc-select"
          placeholder="NPC를 선택하세요"
          options={npcOptions}
          value={
            npcName
              ? npcOptions.find((option) => option.value === npcName)
              : null
          } // 현재 선택된 값
          onChange={(selectedOption) => setNpcName(selectedOption.value)} // 선택 시 상태 업데이트
        />
        <BasicButton onClick={handleSearch} innerText="검색" />
        <BasicButton onClick={handleReset} innerText="초기화" />
      </div>
      {data && (
        <div className="flex items-center justify-center">
          <div className="flex flex-wrap justify-center items-center w-full max-w-[1080px] p-8 ">
            {data.map((item, subIndex) => (
              <div key={subIndex} className="w-[120px] p-1 border">
                <div className="w-[100px] flex justify-center items-center">
                  <img
                    src={item.image_url}
                    width={80}
                    height={80}
                    alt={item.item_display_name}
                  />
                </div>
                <div className="h-10 font-medium">{item.item_display_name}</div>
                {setItemType == "통행증" && (
                  <span className="h-10 font-medium">
                    {item.price[0].price_value} {item.price[0].price_type}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
