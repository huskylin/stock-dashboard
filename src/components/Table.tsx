import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { MonthlyRevenue } from '@/store/interfaces/StockData';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  const { monthlyRevenue, monthlyGrowthRate, currentStockCode } = useSelector(
    (state: RootState) => state.stock
  );
  return (
    <TableContainer key={currentStockCode.id}>
      <Table sx={{ minWidth: 650 }} aria-label="stock table">
        <TableHead></TableHead>
        <TableBody>
          <TableRow className="row-style">
            <TableCell variant="head" sx={{ whiteSpace: 'nowrap' }}>
              年度月份
            </TableCell>
            {Object.keys(monthlyRevenue).map((dateYear: string) => {
              return (
                <TableCell key={currentStockCode.id}>{dateYear}</TableCell>
              );
            })}
          </TableRow>
          <TableRow className="row-style">
            <TableCell variant="head" sx={{ whiteSpace: 'nowrap' }}>
              每月營收
            </TableCell>
            {Object.values(monthlyRevenue).map((revenue: number) => {
              return <TableCell key={currentStockCode.id}>{revenue}</TableCell>;
            })}
          </TableRow>
          <TableRow className="row-style">
            <TableCell variant="head" sx={{ whiteSpace: 'nowrap' }}>
              單月營收年增率 (%)
            </TableCell>
            {Object.values(monthlyGrowthRate).map((growthRate: string) => {
              return (
                <TableCell key={currentStockCode.id}>{growthRate}</TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
