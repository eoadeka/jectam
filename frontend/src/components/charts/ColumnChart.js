import React from "react";
import Chart from "react-apexcharts";

const options = {
    series: [{
        data: [21, 22, 10]
    }],
    chart: {
        // height: 350,
        type: 'bar',
        fontFamily:"Space Grotesk, sans-serif",
        events: {
        click: function(chart, w, e) {
            // console.log(chart, w, e)
        }
        },
    },
    colors:[ '#7FFF00','#FFD700', '#F44336' ],
    plotOptions: {
        bar: {
            columnWidth: '25%',
            distributed: true,
        }
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        show: true,
    },
    xaxis: {
        categories: [
            ['Low'],
            ['Medium'],
            ['High'], 
        ],
        labels: {
        style: {
            colors:['#7FFF00','#FFD700', '#E91E63' ],
            fontSize: '12px',
            fontWeight: 'bolder',
            fontFamily:"'Space Grotesk', sans-serif"
        }
        }
    }
  };

  export default function ColumnChart() {
    return (
        <div>
            <Chart 
                options={options} 
                series={options.series} 
                type="bar" 
                height={220} 
                style={{fontFamily:"'Space Grotesk', sans-serif"}}
            />
        </div>
    );
}