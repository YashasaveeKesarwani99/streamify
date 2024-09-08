import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface PieChartProps {
  ads: number | undefined;
  subscriptions: number | undefined;
}

const PieChart: React.FC<PieChartProps> = ({ ads, subscriptions }) => {
  const data = {
    labels: ["Ads", "Subscriptions"],
    datasets: [
      {
        label: "Revenue in usd",
        data: [ads, subscriptions],
        backgroundColor: ["rgba(53,83,239, 0.7)", "rgba(196,94,254, 0.7)"],
        borderColor: ["rgba(53,83,239, 1)", "rgba(196,94,254, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
