import { useEffect } from "react";
import { Skeleton, Typography } from "@mui/material";
import PieChart from "./pie-chart";
import { useFetchWithCache } from "../../hooks/use-fetch-with-cache";
import { useNotify } from "../../hooks/use-notify";

const RevenueDistribution = () => {
  const notify = useNotify();
  const apiUrl = import.meta.env.VITE_API_URL;

  const { data, error, isLoading } =
    useFetchWithCache<RevenueDistributionResponse>({
      key: ["revenue-distribution"],
      url: `${apiUrl}/revenue-distribution`,
    });

  useEffect(() => {
    if (error) {
      notify.error("Unable to fetch data!");
    }
  }, [error]);

  return (
    <div className="flex flex-col justify-between w-full md:w-1/2">
      <Typography variant="h5">Revenue Distribution</Typography>
      <div
        className="bg-secondary mt-8 p-5 flex items-center justify-center rounded-2xl drop-shadow-2xl"
        style={{ height: "420px" }}
      >
        {isLoading ? (
          <div className="flex flex-col">
            <Skeleton variant="text" width={60} />
            <Skeleton variant="circular" width={300} height={300} />
          </div>
        ) : (
          <PieChart ads={data?.ads} subscriptions={data?.subscriptions} />
        )}
      </div>
    </div>
  );
};

export default RevenueDistribution;
