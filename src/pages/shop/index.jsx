import BasicButton from "@/component/button/BasicButton";
import ReactSelect from "@/component/select/ReactSelect";
import React, { useEffect, useState } from "react";

export default function Shop() {
  const [npc, setNpc] = useState({});
  const [place, setPlace] = useState("");
  const [npcName, setNpcName] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/data/auction/npc.json");
        const data = await response.json();
        setNpc(data);
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
          // 수정중
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
    setPlace("");
    setNpcName("");
    setData(null);
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-2.5 mt-5">
        {/* 마을 선택 */}
        <ReactSelect
          inputId="place-select"
          placeholder="마을을 선택하세요"
          options={Object.keys(npc).map((category) => ({
            value: category,
            label: category,
          }))}
          value={place ? { value: place, label: place } : null}
          onChange={(selectedOption) => {
            setPlace(selectedOption.value);
            setNpcName("");
          }}
        />

        {/* NPC 선택 */}
        <ReactSelect
          inputId="npc-select"
          placeholder="NPC를 선택하세요"
          options={
            place
              ? npc[place].map((npcName) => ({
                  value: npcName,
                  label: npcName,
                }))
              : []
          }
          value={npcName ? { value: npcName, label: npcName } : null}
          onChange={(selectedOption) => setNpcName(selectedOption.value)}
          isDisabled={!place}
        />
        <BasicButton onClick={handleSearch} innerText="검색" />
        <BasicButton onClick={handleReset} innerText="초기화" />
      </div>
    </div>
  );
}
