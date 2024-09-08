import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

export interface LineChartProps {
  userGrowth:
    | {
        months: string[];
        totalUsers: number[];
        activeUsers: number[];
      }
    | undefined;
}

const LineChart: React.FC<LineChartProps> = ({ userGrowth }) => {
  const data = {
    labels: userGrowth?.months,
    datasets: [
      {
        label: "Total Users",
        data: userGrowth?.totalUsers,
        fill: true,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.4)", // Background color
        tension: 0.4,
        pointRadius: 3,
      },
      {
        label: "Active Users",
        data: userGrowth?.activeUsers,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.4)", // Background color
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          color: "white",
        },
      },
      tooltip: {
        callbacks: {
          labelTextColor: () => "white",
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
