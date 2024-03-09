import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchStockCodes, fetchStockMonthRevenue } from '@/store/stockThunks';
import { RootState } from '@/store/store';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Grid,
  SelectChangeEvent,
} from '@mui/material';
import { format, subYears } from 'date-fns';
import Table from '@/components/Table';
import Charts from '@/components/Chart';
import Selector from '@/components/Selector';

const yearRangeItems = [
  { text: '近 3 年', value: '3' },
  { text: '近 5 年', value: '5' },
  { text: '近 8 年', value: '8' },
];
export default function AnalysisPage() {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { stockCode } = router.query;
  const [yearRange, setYearRange] = useState<string>('5');
  const { currentStockCode, stockCodes } = useSelector(
    (state: RootState) => state.stock
  );

  useEffect(() => {
    dispatch(fetchStockCodes());
  }, [dispatch]);

  useEffect(() => {
    setYearRange('5');
  }, [stockCode]);

  const handelYearRangeChange = (event: SelectChangeEvent) => {
    setYearRange(event.target.value);
    const startDate = format(
      subYears(new Date(), parseInt(event.target.value)),
      'yyyy-02-01'
    );
    const endDate = format(new Date(), 'yyyy-02-01');
    dispatch(fetchStockMonthRevenue(currentStockCode, startDate, endDate));
  };
  return (
    <>
      <Grid key={currentStockCode}>
        <Card sx={{ margin: 2, padding: 2 }}>
          {currentStockCode && (
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
