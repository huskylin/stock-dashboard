import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import theme from '@/style/theme';
import { Box, CircularProgress } from '@mui/material';

// 數字顯示千分位
const thousandComma = (num: number) => {
  const comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(comma, ',');
};

export default function StockTable() {
  const { monthlyRevenue, monthlyGrowthRate, currentStockCode, loading } =
    useSelector((state: RootState) => state.stock);
  const yearMonths = Object.keys(monthlyRevenue);
  const tableId = `${currentStockCode}-table`;
  // 捲到最右邊
  useEffect(() => {
    const tableContainer = document.getElementById(tableId);
    if (tableContainer && !loading.stockMonthRevenue) {
      tableContainer.scrollLeft = tableContainer.scrollWidth;
    }
  }, [currentStockCode, loading.stockMonthRevenue, tableId]);

  return (
    <TableContainer key={currentStockCode} id={tableId}>
      {loading.stockMonthRevenue ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: '30px',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="stock table">
          <TableHead></TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                variant="head"
                sx={{
                  whiteSpace: 'nowrap',
                  position: 'sticky',
                  left: 0,
                  background: theme.palette.background.paper,
                }}
              >
                <b>年度月份</b>
              </TableCell>
              {yearMonths.map((yearMonths: string) => {
                return (
                  <TableCell
                    align="right"
                    key={`${currentStockCode}${yearMonths}yearMonths`}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    <b>{yearMonths}</b>
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow className="row-style">
              <TableCell
                variant="head"
                sx={{
                  whiteSpace: 'nowrap',
                  position: 'sticky',
                  left: 0,
                  background: theme.palette.background.paper,
                }}
              >
                <b>每月營收</b>
              </TableCell>
              {yearMonths.map((yearMonths: string) => {
                return (
                  <TableCell
                    align="right"
                    key={`${currentStockCode}${yearMonths}monthlyRevenue`}
                  >
                    {thousandComma(monthlyRevenue[yearMonths])}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow className="row-style">
              <TableCell
                variant="head"
                sx={{
                  whiteSpace: 'nowrap',
                  position: 'sticky',
                  left: 0,
                  background: theme.palette.background.paper,
                }}
              >
                <b>單月營收年增率 (%)</b>
              </TableCell>
              {yearMonths.map((yearMonths: string) => {
                return (
                  <TableCell
                    align="right"
                    key={`${currentStockCode}${yearMonths}monthlyGrowthRate`}
                  >
                    {monthlyGrowthRate[yearMonths]}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
