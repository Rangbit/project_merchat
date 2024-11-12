import React, { forwardRef } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
    const columnHelper = createColumnHelper();

    // headers를 기반으로 컬럼 동적 생성
    const columns = headers.map((header) =>
      columnHelper.accessor(header.key, {
        header: () => header.label,
        cell: (info) => info.getValue(),
      })
    );

    // React Table 훅을 사용하여 테이블 데이터 및 구조 정의
    const table = useReactTable({
      data: data || [], // 데이터 설정, null 방지
      columns, // 동적으로 생성된 컬럼 설정
      getCoreRowModel: getCoreRowModel(), // Row 모델 설정
    });

    return (
      <div className="table-container">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
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
            {table.getRowModel()?.rows?.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

BasicTable.displayName = "CustomTable";
export default BasicTable;
