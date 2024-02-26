import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MonthlyGrowthRate, MonthlyRevenue, StockCodes } from './interfaces/StockData';

interface StockState {
    stockCodes: StockCodes[];
    monthlyRevenue: MonthlyRevenue;
    monthlyGrowthRate: MonthlyGrowthRate;
}

const initialState: StockState = {
    stockCodes: [],
    monthlyRevenue: {},
    monthlyGrowthRate: {},
};

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        setStockCodes: (state, action: PayloadAction<StockCodes[]>) => {
            state.stockCodes = action.payload;
        },
        setMonthlyRevenue: (state, action: PayloadAction<MonthlyRevenue>) => {
            state.monthlyRevenue = action.payload;
        },
        setMonthlyGrowthRate: (state, action: PayloadAction<MonthlyGrowthRate>) => {
            state.monthlyGrowthRate = action.payload;
        },
    },
});

export const { setStockCodes, setMonthlyRevenue, setMonthlyGrowthRate } = stockSlice.actions;
export default stockSlice.reducer;