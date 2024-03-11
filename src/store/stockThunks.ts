// import { setStockCodes, setMonthlyRevenue, setMonthlyGrowthRate, setCurrentStockCode } from './stockSlice';
import { subYears, format } from 'date-fns';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStockCodes, fetchStockMonthRevenue, filterUniqueData, calcMonthlyRevenue } from '@/utils/api';
import { StockInfo } from './interfaces/StockData';

export const getStockCodesOption = createAsyncThunk(
    'stock/getStockCodesOption',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetchStockCodes();
            const uniqueData = filterUniqueData(response.data.data);
            const stockCodes = uniqueData.map((item: StockInfo) => ({ id: item.stock_id, name: item.stock_name }));
            return stockCodes;
        } catch (error) {
            console.error('Error fetching stock codes:', error);
            const message = typeof error === "object" && error !== null && "message" in error
                ? (error as { message: string }).message
                : "Unknown error";
            return rejectWithValue(message);
        }
    }
);

export const getStockMonthRevenue = createAsyncThunk(
    'stock/getStockMonthRevenue',
    async (arg: { stockCode: string, startDate: string, endDate: string, signal: AbortSignal }, { dispatch, rejectWithValue }) => {
        try {
            const preYearStartDate = subYears(new Date(arg.startDate), 1);
            const preYearStartDateStr = format(preYearStartDate, 'yyyy-MM-dd');
            const response = await fetchStockMonthRevenue(arg.stockCode, preYearStartDateStr, arg.endDate, arg.signal);
            const { monthlyRevenue, monthlyGrowthRate } = calcMonthlyRevenue(response.data.data);
            return { monthlyRevenue, monthlyGrowthRate, currentStockCode: arg.stockCode };
        } catch (error) {
            console.error(`Error fetching data for stock ${arg.stockCode}:`, error);
            const message = typeof error === "object" && error !== null && "message" in error
                ? (error as { message: string }).message
                : "Unknown error";
            return rejectWithValue(message);
        }
    }
);