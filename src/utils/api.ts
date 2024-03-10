import { MonthlyGrowthRate, MonthlyRevenue, Response, StockData, StockInfo } from '@/store/interfaces/StockData';
import axios from 'axios';

const API_BASE_URL = 'https://api.finmindtrade.com/api/v4/data';
const apiToken = process.env.API_TOKEN;


export const fetchStockCodes = async () => {
    const response = await axios.get<Response>(`${API_BASE_URL}?dataset=TaiwanStockInfo&token=${apiToken}`);
    return response
}

export const fetchStockMonthRevenue = async (stockCode: string, startDate: string, endDate: string, signal: AbortSignal) => {
    const response = await axios.get<Response>(
        `${API_BASE_URL}?dataset=TaiwanStockMonthRevenue&data_id=${stockCode}&start_date=${startDate}&end_date=${endDate}&token=${apiToken}`
        , { signal });
    return response
}

// 排除相同ID的股票，取最新的資料
export const filterUniqueData = (data: StockInfo[]) => {
    const uniqueData: StockInfo[] = Object.values(
        data.reduce((acc: { [key: string]: StockInfo }, item: StockInfo) => {
            if (!acc[item.stock_id] || new Date(item.date) > new Date(acc[item.stock_id].date)) {
                acc[item.stock_id] = item;
            }
            return acc;
        }, {})
    );
    return Object.values(uniqueData);
}

// 計算月營收與年增
export const calcMonthlyRevenue = (res: StockData[]) => {
    const monthlyRevenue: MonthlyRevenue = {};
    const monthlyGrowthRate: MonthlyGrowthRate = {};
    res.forEach((monthData) => {
        // 多撈取前一年資料，計算年增
        const previousYearData = res.find((item: StockData) => (monthData.revenue_year - 1) === (item.revenue_year) && monthData.revenue_month === item.revenue_month);
        if (previousYearData) {
            const previousYearRevenue = previousYearData.revenue;
            const revenueDate = `${monthData.revenue_year}-${monthData.revenue_month}`
            // 年增率精確至小點第二位，月營收單位為千元
            monthlyGrowthRate[revenueDate] = ((monthData.revenue / previousYearRevenue - 1) * 100).toFixed(2);
            monthlyRevenue[revenueDate] = monthData.revenue / 1000;
        }
    });
    return { monthlyRevenue, monthlyGrowthRate }
}
