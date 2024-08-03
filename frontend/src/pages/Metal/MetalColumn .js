import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const MetalColumn = ({ metals }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Purity</TableCell>
            <TableCell>Group</TableCell>
            <TableCell>Buying Price (VND/g)</TableCell>
            <TableCell>Selling Price (VND/g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {metals.map((metal) => (
            <TableRow key={metal.metalTypeId}>
              <TableCell>{metal.metalTypeName}</TableCell>
              <TableCell>{metal.metalPurity}</TableCell>
              <TableCell>{metal.metalGroupName}</TableCell>
              <TableCell>{metal.currentMetalPriceRate.buyingPrice}</TableCell>
              <TableCell>{metal.currentMetalPriceRate.sellingPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MetalColumn;
