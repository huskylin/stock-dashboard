import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts-for-react";

const tmp = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: [
    {
      type: "value",
      show: false,
    },
    {
      type: "value",
      show: false,
    },
  ],
  series: [
    {
      name: "柱状图",
      type: "bar",
      data: [120, 200, 150, 80, 70, 110, 130],
      yAxisIndex: 0,
    },
    {
      name: "折线图",
      type: "line",
      data: [120, 132, 101, 134, 90, 230, 210],
      yAxisIndex: 1,
    },
  ],
};
export default function Chart() {
  const [options, setOption] = useState<EChartsOption>(tmp);

  return <ReactECharts option={options} />;
}
