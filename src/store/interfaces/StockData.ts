export interface StockData {
    date: string;
    stock_id: string;
    country: string;
    revenue: number;
    revenue_month: number;
    revenue_year: number;
}

export interface StockInfo {
    industry_category: string;
    stock_id: string;
    stock_name: string;
    type: string;
    date: string;
}

export interface Response {
    msg: string;
    status: number;
    data: any;
}

export interface MonthlyRevenue {
    [key: string]: number; // 使用日期作為鍵，值為營收金額
}

export interface MonthlyGrowthRate {
    [key: string]: string; // 使用日期作為鍵，值為營收年增率
}

export interface StockCodes {
    name: string;
    id: string;
}