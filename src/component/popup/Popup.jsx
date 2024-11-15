import React, { useState, useEffect } from "react";
import moment from "moment";

export default function Popup({ data }) {
  console.log("data : ", data);
  console.log("data : ", data);

  const [isStatus, setIsStatus] = useState([]); // 기본옵션
  const [isEnchant, setIsEnchant] = useState([]); // 인챈트
  const [isUpgrade, setIsUpgrade] = useState([]); // 개조
  const [isCraftWork, setIsCraftWork] = useState([]); // 세공
  const [isErg, setIsErg] = useState([]); // 에르그
  const [isSet, setIsSet] = useState([]); // 세트옵션
  const [isColor, setIsColor] = useState([]); // 색상

  useEffect(() => {
    const statusOptions = [];
    const enchantOptions = [];
    const upgradeOptions = [];
    const craftWorkOptions = [];
    const ergOptions = [];
    const setOptions = [];
    const colorOptions = [];

    data.item_option.forEach((item) => {
      if (
        // 무기
        item.option_type === "공격" ||
        item.option_type === "부상률" ||
        item.option_type === "크리티컬" ||
        item.option_type === "밸런스" ||
        item.option_type === "남은 전용 해제 가능 횟수" ||
        // 방어구

        // 공통
        item.option_type === "피어싱 레벨" ||
        item.option_type === "숙련" ||
        item.option_type === "내구력"
      ) {
        statusOptions.push(item);
      }
      if (item.option_type === "인챈트") {
        enchantOptions.push(item);
      }
      if (item.option_type === "인챈트") {
        upgradeOptions.push(item);
      }
      if (
        item.option_type === "일반 개조" ||
        item.option_type === "보석 개조" ||
        item.option_type === "장인 개조" ||
        item.option_type === "특별 개조"
      ) {
        craftWorkOptions.push(item);
      }
      if (item.option_type === "에르그") {
        ergOptions.push(item);
      }
      if (item.option_type === "인챈트") {
        setOptions.push(item);
      }
      if (item.option_type === "아이템 색상") {
        colorOptions.push(item);
      }
    });

    setIsStatus(statusOptions);
    setIsEnchant(enchantOptions);
    setIsUpgrade(upgradeOptions);
    setIsCraftWork(craftWorkOptions);
    setIsErg(ergOptions);
    setIsSet(setOptions);
    setIsColor(colorOptions);
  }, [data]);

  return (
    <div className="w-[360px] p-3 rounded bg-black text-white fixed top-2 opacity-80">
      <div className="w-full mb-3 font-medium text-center">
        {data.item_display_name}
      </div>

      {/* statusOptions */}
      {/* {isStatus.length > 0 && (
        <div className="w-full p-3 mb-3 text-white border rounded border-gray01">
          {isStatus.map((option, index) => (
            <div key={index} className="mb-2">
              <span>
                {option.option_type} : {option.option_value}
                {option.option_value2 ? ` ~ ${option.option_value2}` : ""}
              </span>
              {option.option_desc && (
                <div className="mt-1 text-sm text-gray-400">
                  {option.option_desc}
                </div>
              )}
            </div>
          ))}
        </div>
      )} */}

      {/* colorOptions */}
      {isColor.length > 0 && (
        <div className="w-full p-3 mb-3 text-white border rounded border-gray01">
          <div className="mb-2 font-semibold">아이템 색상</div>
          {isColor.map((option, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <div
                className="w-4 h-4"
                style={{
                  backgroundColor: option.option_value
                    ? `rgb(${option.option_value})`
                    : "#fff",
                }}
              />
              <span>
                {option.option_value ? option.option_value : option.option_desc}
                {` (${option.option_sub_type})`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
