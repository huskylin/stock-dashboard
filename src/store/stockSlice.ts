import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MonthlyGrowthRate, MonthlyRevenue, StockCodes } from './interfaces/StockData';
import { getStockCodesOption, getStockMonthRevenue } from './stockThunks';

interface StockState {
    currentStockCode: string;
    stockCodes: StockCodes[];
    monthlyRevenue: MonthlyRevenue;
    monthlyGrowthRate: MonthlyGrowthRate;
    loading: LoadingState;
}

interface LoadingState {
    stockCodesOption: boolean;
    stockMonthRevenue: boolean;
}

const initialState: StockState = {
    currentStockCode: '',
    stockCodes: [],
    monthlyRevenue: {},
    monthlyGrowthRate: {},
    loading: {
        stockCodesOption: false,
        stockMonthRevenue: false,
    },
};

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStockCodesOption.pending, (state) => {
                state.loading.stockCodesOption = true;
            })
            .addCase(getStockCodesOption.fulfilled, (state, action) => {
                state.loading.stockCodesOption = false;
                state.stockCodes = action.payload;
            })
            .addCase(getStockCodesOption.rejected, (state) => {
                state.loading.stockCodesOption = false;
            })
            .addCase(getStockMonthRevenue.pending, (state) => {
                state.loading.stockMonthRevenue = true;
            })
            .addCase(getStockMonthRevenue.fulfilled, (state, action) => {
                state.loading.stockMonthRevenue = false;
                state.currentStockCode = action.payload.currentStockCode;
                state.monthlyRevenue = action.payload.monthlyRevenue;
                state.monthlyGrowthRate = action.payload.monthlyGrowthRate;
            })
            .addCase(getStockMonthRevenue.rejected, (state) => {
                state.loading.stockMonthRevenue = false;
            });
    },
});

export default stockSlice.reducer;