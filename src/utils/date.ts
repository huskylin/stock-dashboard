import { format, subYears } from "date-fns";

export const subYearDateStr = (date: Date | string, num: number) => format(subYears(new Date(date), num), 'yyyy-MM-01')
export const yearDateStr = (date: Date | string) => format(new Date(date), 'yyyy-MM-01');
export const yearRangeItems = [
    { text: '近 3 年', value: '3' },
    { text: '近 5 年', value: '5' },
    { text: '近 8 年', value: '8' },
];
export const defaultYearRange = '5';
