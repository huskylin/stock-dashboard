import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { subYears, format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { StockCodes } from '@/store/interfaces/StockData';
import { fetchStockData } from '@/store/stockThunks';

export default function SearchBar() {
  const dispatch = useDispatch<any>();
  const { stockCodes } = useSelector((state: RootState) => state.stock);
  const [date, setDate] = useState({
    startDate: format(subYears(new Date(), 5), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
  });

  const handleStockCodeChange = (
    event: React.ChangeEvent<{}>,
    stockCode: string | StockCodes | null
  ) => {
    if (stockCode && typeof stockCode !== 'string') {
      dispatch(fetchStockData(stockCode.id, date.startDate, date.endDate));
    }
  };

  return (
    stockCodes && (
      <Autocomplete
        id="stock-code"
        fullWidth
        options={stockCodes}
        sx={{ width: '500px' }}
        onChange={handleStockCodeChange}
        getOptionLabel={(item: string | StockCodes) =>
          typeof item !== 'string' ? `${item.id} ${item.name}` : ''
        }
        renderInput={(params) => (
          <TextField {...params} placeholder="輸入台／美股代號，查看公司價值" />
        )}
      />
    )
  );
}
