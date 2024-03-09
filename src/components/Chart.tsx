import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts-for-react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import theme from '@/style/theme';

const initialChartOption = {
  grid: {
    left: '3%',
    right: '3%',
    bottom: '3%',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {},
  xAxis: {
    type: 'category',
    data: [],
    max: 'dataMax',
    splitLine: {
      show: 'show',
    },
    axisLabel: {
      interval: 11,
      formatter: (value: string) => value.substring(0, 4),
    },
  },
  yAxis: [
    {
      type: 'value',
      name: '千元',
      show: true,
      position: 'left',
    },
    {
      type: 'value',
      name: '%',
      show: true,
      splitLine: {
        show: false,
      },
      position: 'right',
    },
  ],
  series: [
    {
      name: '每月營收',
      type: 'bar',
      yAxisIndex: 0,
      color: [theme.palette.secondary.main],
      data: [],
    },
    {
      name: '月營收年增率',
      type: 'line',
      yAxisIndex: 1,
      color: [theme.palette.warning.main],
      data: [],
      markLine: {
        symbol: 'none',
        silent: true,
        label: {
          show: false,
        },
        lineStyle: {
          color: 'red', // 可以根據需要設定線的顏色
        },
        data: [
          { yAxis: 0 }, // 0% 的基準線
        ],
      },
    },
  ],
};
export default function Chart() {
  const [options, setOption] = useState<EChartsOption>(initialChartOption);
  const { monthlyRevenue, monthlyGrowthRate, currentStockCode } = useSelector(
    (state: RootState) => state.stock
  );
  useEffect(() => {
    const updatedOption: EChartsOption = {
      ...initialChartOption,
      xAxis: { ...initialChartOption.xAxis, data: Object.keys(monthlyRevenue) },
      series: [
        {
          ...initialChartOption.series[0],
          data: Object.values(monthlyRevenue),
        },
        {
          ...initialChartOption.series[1],
          data: Object.values(monthlyGrowthRate),
        },
      ],
    };
    setOption(updatedOption);
  }, [monthlyRevenue, monthlyGrowthRate, currentStockCode]);
  return (
    <>
      <ReactECharts option={options} key={currentStockCode} />
    </>
  );
}
