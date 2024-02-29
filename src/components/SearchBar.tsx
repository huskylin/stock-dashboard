import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { subYears, format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { StockCodes } from '@/store/interfaces/StockData';
import { fetchStockMonthRevenue } from '@/store/stockThunks';

export default function SearchBar() {
  const dispatch = useDispatch<any>();
  const { stockCodes } = useSelector((state: RootState) => state.stock);

  const handleStockCodeChange = (
    event: React.ChangeEvent<{}>,
    stockCode: string | StockCodes | null
  ) => {
    const startDate = format(subYears(new Date(), 5), 'yyyy-02-01');
    const endDate = format(new Date(), 'yyyy-02-01');
    if (stockCode && typeof stockCode !== 'string') {
      dispatch(fetchStockMonthRevenue(stockCode, startDate, endDate));
    }
  };

  return (
    stockCodes && (
      <Autocomplete
        id="stock-code"
        fullWidth
        options={stockCodes}
        sx={{ width: '500px', padding: '0px' }}
        onChange={handleStockCodeChange}
        getOptionLabel={(item: string | StockCodes) =>
          typeof item !== 'string' ? `${item.id} ${item.name}` : ''
        }
        renderInput={(params) => (
          <TextField
            sx={{
              padding: '0',
              '& .MuiInputBase-input': { padding: '0 !important' },
            }}
            {...params}
            placeholder="輸入台／美股代號，查看公司價值"
          />
        )}
      />
    )
  );
}
