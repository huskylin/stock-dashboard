import Charts from '@/components/Chart';
import Box from '@mui/material/Box';
import Table from '@/components/Table';
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStockCodes, fetchStockMonthRevenue } from '@/store/stockThunks';
import { format, subYears } from 'date-fns';
import { RootState } from '@/store/store';

export default function Report() {
  const [yearRange, setYearRange] = useState<string>('5');
  const dispatch = useDispatch<any>();
  const { currentStockCode } = useSelector((state: RootState) => state.stock);
  useEffect(() => {
    setYearRange('5');
  }, [currentStockCode.id]);

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
      <Grid>
        <Card sx={{ margin: 2, padding: 2 }}>
          {currentStockCode.name}({currentStockCode.id})
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
              <FormControl size="small">
                <Select
                  id="year-range-select-label"
                  value={yearRange}
                  onChange={handelYearRangeChange}
                >
                  <MenuItem value={'3'}>近 3 年</MenuItem>
                  <MenuItem value={'5'}>近 5 年</MenuItem>
                  <MenuItem value={'8'}>近 8 年</MenuItem>
                </Select>
              </FormControl>
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
