import React from "react";
import Chart from "react-apexcharts";

const series = [20, 55, 41, 20, 10, 6];
const options = {
    chart: {
        type: "donut", 
        fontFamily: "Space Grotesk, sans-serif",
        // height: 220
    },
    title: {
        text: "Project Status",
        align: "left"
    },
    plotOptions: {
        pie: {
            donut: {
                size: "60%",
                labels: {
                    show: true,
                    total: {
                        showAlways: true,
                        show: true
                      }
      
                }
                
            }
        }
    },
    labels: ['To do', 'In Progress','On Hold', 'Under Review', 'Done', 'Cancelled'],
    colors:['#F44336', '#E91E63', '#9C27B0', '#87CEEB', '#FFD700', '#7FFF00']
    };


export default function PieChart() {
    return (
        <div>
            <Chart options={options} series={series} type="donut" height={210} />
        </div>
    );
}