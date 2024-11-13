import React, { forwardRef, useState, useRef } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import style from "./BasicTable.module.css";
import Popup from "../popup/Popup";

const BasicTable = forwardRef(
  (
    {
      headers = [], // 테이블 header data json
      data = [], // 테이블 body data json
      paginationEnabled = true, // pagination on/off
      currentPagePosition = 1, // 화면 초기 pagination 위치
    },
    ref
  ) => {
    const [isData, setIsData] = useState(data.auction_item || "");
    const [hoveredRow, setHoveredRow] = useState(null);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [pageIndex, setPageIndex] = useState(currentPagePosition - 1); // 현재 페이지 인덱스 (0부터 시작)

    const hoverTimeoutRef = useRef(null); // hover 딜레이를 위한 ref
    const itemsPerPage = 500; // 페이지당 항목 수
    const totalPageCount = Math.ceil(
      (data.auction_item?.length || 0) / itemsPerPage
    );

    const columnHelper = createColumnHelper();

    // headers를 기반으로 컬럼 동적 생성
    const columns = headers.map((header) =>
      columnHelper.accessor(header.key, {
        header: () => header.label,
        cell: (info) => {
          const rowData = info.row.original; // 각 행의 데이터 접근

          if (header.key === "date_auction_expire") {
            const expireDate = new Date(info.getValue());
            const currentDate = new Date();
            const timeDifference = expireDate.getTime() - currentDate.getTime();
            const hoursRemaining = Math.floor(
              timeDifference / (1000 * 60 * 60)
            );
            return hoursRemaining > 0 ? `${hoursRemaining}시간` : "만료됨";
          }

          if (header.key === "item_name") {
            const itemCount = rowData.item_count || 1;
            return itemCount > 1
              ? `${info.getValue()}(x${itemCount})`
              : info.getValue();
          }

          if (header.key === "auction_price_per_unit") {
            const auctionPricePerUnit = info.getValue();
            const itemCount = rowData.item_count || 1;
            const totalPrice = auctionPricePerUnit * itemCount;
            return itemCount > 1
              ? `${auctionPricePerUnit}(${totalPrice})`
              : auctionPricePerUnit;
          }

          return info.getValue();
        },
      })
    );

    const table = useReactTable({
      data:
        data.auction_item?.slice(
          pageIndex * itemsPerPage,
          (pageIndex + 1) * itemsPerPage
        ) || [],
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    const handleMouseEnter = (rowData) => {
      // 기존 타이머가 있다면 초기화
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }

      // 500ms 딜레이 후 팝업을 보여줌
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredRow(rowData);
        setIsPopUpOpen(true);
      }, 500);
    };

    const handleMouseLeave = () => {
      // 타이머가 설정된 경우 이를 취소하고 즉시 팝업을 닫음
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      setHoveredRow(null);
      setIsPopUpOpen(false);
    };

    const getPaginationRange = () => {
      const currentPageGroup = Math.floor(pageIndex / 10);
      const startPage = currentPageGroup * 10 + 1;
      const endPage = Math.min(startPage + 9, totalPageCount);
      return Array.from(
        { length: endPage - startPage + 1 },
        (_, idx) => startPage + idx
      );
    };

    return (
      <div className="table-container">
        <table className={`${style.table}`}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={`${style.header}`}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    style={{ width: headers[index].width + "%" }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel()?.rows?.map((row, index) => (
              <tr
                key={row.id}
                className={`${style.items}`}
                onMouseEnter={() => handleMouseEnter(isData[index])}
                onMouseLeave={handleMouseLeave}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {isPopUpOpen && hoveredRow && <Popup data={hoveredRow} />}

        {/* {paginationEnabled && (
          <div className="pagination">
            <button
              onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
              disabled={pageIndex === 0}
            >
              이전
            </button>
            {getPaginationRange().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPageIndex(pageNum - 1)}
                className={pageIndex === pageNum - 1 ? "active" : ""}
              >
                {pageNum}
              </button>
            ))}
            <button
              onClick={() =>
                setPageIndex((prev) => Math.min(prev + 1, totalPageCount - 1))
              }
              disabled={pageIndex === totalPageCount - 1}
            >
              다음
            </button>
          </div>
        )} */}
      </div>
    );
  }
);

BasicTable.displayName = "BasicTable";
export default BasicTable;
