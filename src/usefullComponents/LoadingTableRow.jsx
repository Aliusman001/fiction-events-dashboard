import { TableCell, TableRow } from "@mui/material";
import React from "react";

function LoadingTableRow() {
  return (
    <TableRow className="!bg-[var(--loading)] !animate-pulse">
      <TableCell className="!text-[var(--secondary)] !h-16  !text-base !font-extrabold "></TableCell>
      <TableCell className="!text-[var(--text)] !font-bold"></TableCell>
      <TableCell className="!text-[var(--text)] !font-bold"></TableCell>
      <TableCell className="!text-[var(--text)] !font-bold"></TableCell>
      <TableCell className="!text-[var(--text)] !font-medium"></TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
}

export default LoadingTableRow;
