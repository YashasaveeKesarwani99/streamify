import { useEffect } from "react";
import { Typography, Skeleton } from "@mui/material";
import BarChart from "./bar-chart";
import { useFetchWithCache } from "../../hooks/use-fetch-with-cache";
import { useNotify } from "../../hooks/use-notify";
import { useWindowWidth } from "../../hooks/use-window-width";

const TopStreams = () => {
  const notify = useNotify();
  const screenWidth = useWindowWidth();

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
            <Skeleton
              variant="rectangular"
              width={screenWidth < 768 ? 250 : 400}
              height={screenWidth > 375 ? 300 : 200}
            />
          </div>
        ) : (
          <BarChart topStreams={data?.top5StreamedSongs} />
        )}
      </div>
    </div>
  );
};

export default TopStreams;
