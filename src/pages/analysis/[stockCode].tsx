import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getStockCodesOption, getStockMonthRevenue } from '@/store/stockThunks';
import { RootState } from '@/store/store';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Grid,
  SelectChangeEvent,
} from '@mui/material';
import Table from '@/components/stockTable';
import Charts from '@/components/chart';
import Selector from '@/components/selector';
import {
  subYearDateStr,
  yearDateStr,
  defaultYearRange,
  yearRangeItems,
} from '@/utils/date';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

export default function AnalysisPage() {
  const dispatch =
    useDispatch<ThunkDispatch<RootState, unknown, Action<string>>>();
  const router = useRouter();
  const { stockCode } = router.query;
  const [yearRange, setYearRange] = useState<string>(defaultYearRange);
  const { currentStockCode, stockCodes, loading } = useSelector(
    (state: RootState) => state.stock
  );
  const abortControllerRef = useRef<AbortController>();

  useEffect(() => {
    dispatch(getStockCodesOption());
  }, [dispatch]);

  useEffect(() => {
    // 每次進入頁面，把選單年份切到預設值
    setYearRange(defaultYearRange);
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [stockCode]);

  const handelYearRangeChange = (event: SelectChangeEvent) => {
    setYearRange(event.target.value);
    const startDate = subYearDateStr(new Date(), parseInt(event.target.value));
    const endDate = yearDateStr(new Date());
    // 選單切換過快就取消前一個請求
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    dispatch(
      getStockMonthRevenue({
        stockCode: currentStockCode,
        startDate,
        endDate,
        signal: abortControllerRef.current.signal,
      })
    );
  };
  return (
    <>
      <Grid key={currentStockCode}>
        <Card sx={{ margin: 2, padding: 2 }}>
          {loading.stockCodesOption ? (
            <span>...Loading</span>
          ) : (
            <b style={{ fontSize: '18px' }}>
              <span style={{ marginRight: '6px' }}>
                {stockCodes.find((item) => item.id === currentStockCode)?.name}
              </span>
              <span>({currentStockCode})</span>
            </b>
          )}
        </Card>
        <Card sx={{ margin: 2, padding: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button>每月營收</Button>
              </ButtonGroup>
              <Selector
                defaultValue={yearRange}
                items={yearRangeItems}
                onChange={handelYearRangeChange}
              ></Selector>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Charts></Charts>
            </Box>
          </Box>
        </Card>
        <Card sx={{ margin: 2, padding: 2 }}>
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button>詳細數據</Button>
          </ButtonGroup>
          <Table></Table>
        </Card>
      </Grid>
    </>
  );
}
