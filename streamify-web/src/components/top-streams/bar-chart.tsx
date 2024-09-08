import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  topStreams: Songs[] | undefined;
}

const BarChart: React.FC<BarChartProps> = ({ topStreams }) => {
  // Define the data for the bar chart
  const data = {
    labels: topStreams?.map((streams: Songs) => streams.songTitle),
    datasets: [
      {
        label: "Sales",
        data: topStreams?.map((streams: Songs) => streams.streams),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Define the options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#ffffff",
          font: {
            size: 10,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
