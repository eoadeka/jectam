import React from "react";
import Chart from "react-apexcharts";
const data = {
  series: [
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ],
  options: {
    chart: {
      type: "line",
      fontFamily: "Space Grotesk, sans-serif",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Project Statistics",
      align: "left"
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    colors:['#F44336' ]
  },
};
function ApexLineChart() {
  return (
    <div>
      <Chart
        options={data.options}
        series={data.series}
        type="line"
        height={200}
        style={{fontFamily:"'Space Grotesk', sans-serif"}}
        
      />
    </div>
  );
}
export default ApexLineChart;