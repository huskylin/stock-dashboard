import { useCallback, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { subYears, format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { StockCodes } from '@/store/interfaces/StockData';
import { fetchStockCodes, fetchStockMonthRevenue } from '@/store/stockThunks';
import { useRouter } from 'next/router';

export default function SearchBar({
  stockCode,
}: {
  stockCode: string | undefined;
}) {
  const dispatch = useDispatch<any>();
  const { stockCodes } = useSelector((state: RootState) => state.stock);
  const router = useRouter();

  const fetchData = useCallback(
    (code: string | null) => {
      const startDate = format(subYears(new Date(), 5), 'yyyy-02-01');
      const endDate = format(new Date(), 'yyyy-02-01');
      if (code) {
        dispatch(fetchStockMonthRevenue(code, startDate, endDate));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (stockCode) {
      fetchData(stockCode);
    }
    dispatch(fetchStockCodes());
  }, [dispatch, fetchData, stockCode]);

  const handleStockCodeChange = useCallback(
    (event: React.ChangeEvent<{}>, stockCodeItem: StockCodes | null) => {
      if (stockCodeItem) {
        fetchData(stockCodeItem.id);
        router.push(`/analysis/${stockCodeItem.id}`);
      }
    },
    [fetchData, router]
  );

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
