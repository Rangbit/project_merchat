import React, { useEffect, useState } from "react";

export default function BasicInput({
  width,
  height = "34",
  inputId,
  value,
  onFocus,
  onChange,
}) {
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value); // 상태 업데이트
    if (onChange) {
      onChange(e); // 부모 컴포넌트로 값 전달
    }
  };
  return (
    <div
      className="relative flex"
      style={{
        width: width ? `${width}px` : "100%",
        height: `${height}px`,
      }}
    >
      <input
        id={inputId}
        name={inputId}
        className="w-full h-full p-[12px]"
        type="text"
        value={inputValue}
        onFocus={onFocus}
        onChange={handleChange} // 변경된 핸들러 사용
      />
    </div>
  );
}
