import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
Chart.register(...registerables);

const MetalChart = ({ metalName, data }) => {
  const chartData = {
    labels: data.map((entry) => entry.gmtVndUpdated),
    datasets: [
      {
        label: `${metalName} Price (VNĐ/g)`,
        data: data.map((entry) => entry.gramInUsd && entry.silverGramInVnd),
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MetalChart;
