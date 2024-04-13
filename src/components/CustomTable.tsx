import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableCaption,
} from "./UI";

export const CustomTable = ({ data }: any) => {
  return (
    <Table>
      <TableCaption>{data.label}</TableCaption>
      <TableHeader>
        <TableRow>
          {data.tableColumns.map((column: any) => {
            return <TableCell key={column.id}>{column.header}</TableCell>;
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.tableData.map((attribute: any) => (
          <TableRow key={attribute.id}>
            <TableCell>{attribute.name}</TableCell>
            <TableCell>{attribute.email}</TableCell>
            <TableCell>{attribute.group}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
