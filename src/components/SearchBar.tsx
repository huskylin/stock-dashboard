import { useCallback, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { StockCodes } from '@/store/interfaces/StockData';
import { getStockMonthRevenue } from '@/store/stockThunks';
import { useRouter } from 'next/router';
import { subYearDateStr, yearDateStr } from '@/utils/date';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

export default function SearchBar({
  stockCode,
}: {
  stockCode: string | undefined;
}) {
  const dispatch =
    useDispatch<ThunkDispatch<RootState, unknown, Action<string>>>();
  const { stockCodes, loading } = useSelector(
    (state: RootState) => state.stock
  );
  const router = useRouter();
  const abortControllerRef = useRef<AbortController>();

  const fetchData = useCallback(
    (code: string | null) => {
      abortControllerRef.current = new AbortController();
      const startDate = subYearDateStr(new Date(), 5);
      const endDate = yearDateStr(new Date());
      if (code) {
        dispatch(
          getStockMonthRevenue({
            stockCode: code,
            startDate,
            endDate,
            signal: abortControllerRef.current.signal,
          })
        );
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (!stockCode) {
      return;
    }
    fetchData(stockCode);
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [dispatch, fetchData, stockCode]);

  const handleStockCodeChange = useCallback(
    (event: React.ChangeEvent<{}>, stockCodeItem: StockCodes | null) => {
      if (stockCodeItem) {
        try {
          router.push(`/analysis/${stockCodeItem.id}`);
        } catch {
          throw new Error('fetchData failed');
        }
      }
    },
    [router]
  );

  return (
    stockCodes && (
      <Autocomplete
        id="stock-code"
        fullWidth
        options={stockCodes}
        loading={loading.stockCodesOption}
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
