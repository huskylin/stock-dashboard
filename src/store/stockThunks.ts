import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';
import { setStockCodes, setMonthlyRevenue, setMonthlyGrowthRate, setCurrentStockCode } from './stockSlice';
import { Action } from 'redux';
import { MonthlyGrowthRate, MonthlyRevenue, StockData, StockInfo, Response, StockCodes } from './interfaces/StockData';
import { subYears, format } from 'date-fns';
import axios from 'axios';

const API_BASE_URL = 'https://api.finmindtrade.com/api/v4/data';
const apiToken = process.env.API_TOKEN;

export const fetchStockCodes = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    try {
        const response = await axios.get<Response>(`${API_BASE_URL}?dataset=TaiwanStockInfo&token=${apiToken}`);
        const uniqueData: StockInfo[] = Object.values(
            response.data.data.reduce((acc: any, item: StockInfo) => {
                if (!acc[item.stock_id] || new Date(item.date) > new Date(acc[item.stock_id].date)) {
                    acc[item.stock_id] = item;
                }
                return acc;
            }, {})
        );
        const stockCodes = uniqueData.map((item: StockInfo) => ({ id: item.stock_id, name: item.stock_name }));
        dispatch(setStockCodes(stockCodes));
    } catch (error) {
        console.error('Error fetching stock codes:', error);
    }
};

export const fetchStockMonthRevenue = (
    stockCode: StockCodes,
    startDate: string,
    endDate: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    try {
        const preYearStartDate = subYears(new Date(startDate), 1); // 往前一年
        const preYearStartDateStr = format(preYearStartDate, 'yyyy-MM-dd');
        const response = await axios.get<Response>(
            `${API_BASE_URL}?dataset=TaiwanStockMonthRevenue&data_id=${stockCode.id}&start_date=${preYearStartDateStr}&end_date=${endDate}&token=${apiToken}`
        );

        const monthlyRevenue: MonthlyRevenue = {};
        const monthlyGrowthRate: MonthlyGrowthRate = {};
        response.data.data.forEach((data: StockData) => {
            // 多撈取前一年資料，計算年增
            const previousYearData = response.data.data.find((item: StockData) => (data.revenue_year - 1) === (item.revenue_year) && data.revenue_month === item.revenue_month);
            if (previousYearData) {
                const previousYearRevenue = previousYearData.revenue;
                const revenueDate = `${data.revenue_year}-${data.revenue_month}`
                // 年增率精確至小點第二位，月營收單位為千元
                monthlyGrowthRate[revenueDate] = ((data.revenue / previousYearRevenue - 1) * 100).toFixed(2);
                monthlyRevenue[revenueDate] = data.revenue / 1000;
            }
        });
        dispatch(setCurrentStockCode(stockCode));
        dispatch(setMonthlyRevenue(monthlyRevenue));
        dispatch(setMonthlyGrowthRate(monthlyGrowthRate));
    } catch (error) {
        console.error(`Error fetching data for stock ${stockCode}:`, error);
    }
};