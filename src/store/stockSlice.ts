import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MonthlyGrowthRate, MonthlyRevenue, StockCodes } from './interfaces/StockData';

interface StockState {
    currentStockCode: string;
    stockCodes: StockCodes[];
    monthlyRevenue: MonthlyRevenue;
    monthlyGrowthRate: MonthlyGrowthRate;
}

const initialState: StockState = {
    currentStockCode: '',
    stockCodes: [],
    monthlyRevenue: {},
    monthlyGrowthRate: {},
};

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        setCurrentStockCode: (state, action: PayloadAction<string>) => {
            state.currentStockCode = action.payload;
        },
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

export const { setCurrentStockCode, setStockCodes, setMonthlyRevenue, setMonthlyGrowthRate } = stockSlice.actions;
export default stockSlice.reducer;