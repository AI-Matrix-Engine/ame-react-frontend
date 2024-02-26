import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableCaption,
} from "../UI/Table";

export const CustomTable = ({ data }) => {
  return (
    <Table>
      <TableCaption>{data.label}</TableCaption>
      <TableHeader>
        <TableRow>
          {data.tableColumns.map((column) => {
            return <TableCell key={column.id}>{column.header}</TableCell>;
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.tableData.map((attribute) => (
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
