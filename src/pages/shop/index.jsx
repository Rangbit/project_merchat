import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiAlertCircle } from "react-icons/fi";
import BasicButton from "@/component/button/BasicButton";
import ImageColorPalette from "@/component/palette";
import ReactSelect from "@/component/select/ReactSelect";

export default function Shop() {
  const [data, setData] = useState(null);
  const [npcOptions, setNpcOptions] = useState({});
  const [serverOptions, setServerOptions] = useState({});
  const [isServer, setIsServer] = useState("");
  const [isChannel, setIsChannel] = useState("");
  const [npcName, setNpcName] = useState("");
  const [itemType, setItemType] = useState("");
  const [isDownloadComplete, setIsDownloadComplete] = useState(false); // 다운로드 완료 상태

  // npc list
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/data/shop/npc.json");
        const data = await response.json();
        setNpcOptions(data);
      } catch (error) {
        console.error("npc 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/data/shop/server.json");
        const data = await response.json();
        setServerOptions(data);
      } catch (error) {
        console.error("카테고리 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchData = async () => {
    try {
      setIsDownloadComplete(false); // 다운로드 시작
      const response = await axios.get("/api/npc_shop", {
        params: {
          npc_name: npcName || undefined,
          server_name: "류트",
          channel: 9,
        },
      });

      let filteredData;

      if (npcName === "피오나트") {
        filteredData = response.data.shop
          .filter((shopItem) => shopItem.tab_name === "지원")
          .map((shopItem) =>
            shopItem.item.filter((item) =>
              item.item_display_name.includes("통행증")
            )
          )
          .flat();

        setItemType("통행증");
      } else {
        filteredData = response.data.shop
          .filter((shopItem) => shopItem.tab_name === "주머니")
          .map((shopItem) => shopItem.item)
          .flat();

        setItemType("주머니");
      }
      setData(filteredData);

      // 모든 파일 다운로드가 완료될 때까지 대기
      await Promise.all(
        filteredData.map((item) => {
          const sanitizedName = item.item_display_name.replace(/\s+/g, "_");
          return downloadFile(item.image_url, sanitizedName);
        })
      );

      setIsDownloadComplete(true); // 다운로드 완료
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  };

  // url로 이미지파일 다운로드
  const downloadFile = async (url, name) => {
    try {
      const response = await axios.get("/api/download_image", {
        params: {
          url,
          name,
        },
      });
      console.log(`File downloaded: ${response.data.path}`);
    } catch (error) {
      console.error(`Failed to download file: ${name}`, error);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleReset = () => {
    setNpcName("");
    setData(null);
    setIsDownloadComplete(false);
  };

  return (
    <>
      <div className="flex justify-center items-center gap-2.5 mt-5">
        {/* <ReactSelect
          inputId="server-select"
          placeholder="서버를 선택하세요"
          options={serverOptions}
          value={
            isServer
              ? serverOptions.find((option) => option.value === isServer)
              : null
          }
          onChange={(selectedOption) => setIsServer(selectedOption.value)}
        /> */}
        <ReactSelect
          inputId="npc-select"
          placeholder="NPC를 선택하세요"
          options={npcOptions}
          value={
            npcName
              ? npcOptions.find((option) => option.value === npcName)
              : null
          }
          onChange={(selectedOption) => setNpcName(selectedOption.value)}
        />
        <BasicButton onClick={handleSearch} innerText="검색" />
        <BasicButton onClick={handleReset} innerText="초기화" />
      </div>
      {data && isDownloadComplete && (
        <div className="flex flex-col items-center justify-center pb-8">
          <div className="flex flex-wrap justify-center items-center w-full max-w-[1080px] p-8">
            {data.map((item, subIndex) => {
              const sanitizedName = item.item_display_name.replace(/\s+/g, "_");
              const localImageUrl = `/images/temp/${sanitizedName}.png`;

              console.log(localImageUrl, "localImageUrl");

              return (
                <div key={subIndex} className="w-[180px] p-1 border">
                  {/* 이미지 및 아이템 이름 */}
                  <div className="flex flex-col items-center justify-center w-full">
                    <img
                      src={localImageUrl}
                      width={80}
                      height={80}
                      alt={sanitizedName}
                    />
                    {itemType === "주머니" && (
                      <ImageColorPalette imageUrl={localImageUrl} />
                    )}
                  </div>
                  <div className="flex items-center justify-center w-full h-10 font-medium">
                    {item.item_display_name}
                  </div>
                  {/* 가격 정보 */}
                  {itemType === "통행증" && (
                    <span className="flex items-center justify-center w-full h-10 font-medium">
                      {item.price[0].price_value} {item.price[0].price_type}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center">
            <FiAlertCircle />{" "}
            <span className="pl-2">
              색상코드 값은 이미지에서 추출한 상위 색상값 입니다. 참고용으로만
              사용해 주세요.
            </span>
          </div>
        </div>
      )}
    </>
  );
}
