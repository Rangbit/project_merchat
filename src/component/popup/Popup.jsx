import React from "react";

export default function Popup({ data }) {
  console.log("data : ", data);
  return (
    <div className="w-[360px] h-[500px] p-3 rounded bg-black absolute -translate-y-1/2 opacity-20">
      Popup
    </div>
  );
}
