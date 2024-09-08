import { useEffect } from "react";
import { Typography, Skeleton } from "@mui/material";
import BarChart from "./bar-chart";
import { useFetchWithCache } from "../../hooks/use-fetch-with-cache";
import { useNotify } from "../../hooks/use-notify";

const TopStreams = () => {
  const notify = useNotify();

  const { data, error, isLoading } = useFetchWithCache<TopStreamsResponse>({
    key: ["top-streamed"],
    url: "http://localhost:3000/api/top-streamed",
  });

  useEffect(() => {
    if (error) {
      notify.error("Unable to fetch data!");
    }
  }, [error]);

  return (
    <div className="flex flex-col justify-between w-full md:w-1/2">
      <Typography variant="h5">Top Streams</Typography>
      <div
        className="bg-secondary mt-8 p-5 flex items-center justify-center rounded-2xl drop-shadow-xl"
        style={{ height: "420px" }}
      >
        {isLoading ? (
          <div className="flex flex-col">
            <Skeleton variant="text" width={60} />
            <Skeleton variant="rectangular" width={400} height={300} />
          </div>
        ) : (
          <BarChart topStreams={data?.top5StreamedSongs} />
        )}
      </div>
    </div>
  );
};

export default TopStreams;
