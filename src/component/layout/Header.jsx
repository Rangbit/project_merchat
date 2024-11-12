import React from "react";
import style from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <div className={`${style.header} text-white bg-siamBlack`}>
      <Link
        className="absolute -translate-y-1/2 left-8 top-1/2"
        href={"/"}
        passHref
      >
        <div className="w-full">Logo</div>
      </Link>
      <div className="flex items-center justify-center">
        <Link href={"/auction"} passHref>
          <div className="h-full px-8">Auction</div>
        </Link>
        <Link href={"/shop"} passHref>
          <div className="h-full px-8">NPC Shop</div>
        </Link>
      </div>
    </div>
  );
}
