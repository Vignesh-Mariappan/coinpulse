import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";
import { cn } from "../lib/utils";

const DataTable = <T,>({
  columns,
  data,
  rowKey,
  tableClassName,
  headerClassName,
  headerRowClassName,
  headerCellClassName,
  bodyRowClassName,
  bodyCellClassName,
}: DataTableProps<T>) => {
  return (
    <Table
      className={cn(
        "custom-scrollbar rounded-lg overflow-hidden",
        tableClassName,
      )}
    >
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader className={headerClassName}>
        <TableRow className={cn("hover:bg-transparent!", headerRowClassName)}>
          {columns.map((col, colIdx) => (
            <TableHead
              key={colIdx}
              className={cn(
                "bg-dark-400 text-purple-100 py-4 first:pl-5 last:pr-5",
                headerCellClassName,
              )}
            >
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((row, rowIdx) => (
          <TableRow
            key={rowKey(row, rowIdx)}
            className={cn(
              "overflow-hidden rounded-lg border-b border-purple-100/5 hover:bg-dark-400/30! relative",
              bodyRowClassName,
            )}
          >
            {columns.map((col, colIdx) => (
              <TableCell
                key={colIdx}
                className={cn("py-4 first:pl-5 last:pr-5", bodyCellClassName)}
              >
                {col.cell(row, rowIdx)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
