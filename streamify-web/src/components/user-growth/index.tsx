import { useEffect } from "react";
import { Typography, Skeleton } from "@mui/material";
import LineChart from "./line-chart";
import { useFetchWithCache } from "../../hooks/use-fetch-with-cache";
import { useNotify } from "../../hooks/use-notify";
import { useWindowWidth } from "../../hooks/use-window-width";

const UserGrowth = () => {
  const notify = useNotify();
  const screenWidth = useWindowWidth();

  const { data, error, isLoading } = useFetchWithCache<UserGrowthResponse>({
    key: ["user-growth"],
    url: "http://localhost:3000/api/user-growth",
  });

  useEffect(() => {
    if (error) {
      notify.error("Unable to fetch data!");
    }
  }, [error]);

  return (
    <div className="flex flex-col justify-between w-full pt-10">
      <Typography variant="h5">User Growth</Typography>
      <div
        className="bg-secondary mt-8 p-5 flex items-center justify-center rounded-2xl drop-shadow-xl"
        style={{ height: "420px", width: "100%" }}
      >
        {isLoading ? (
          <div className="flex flex-col">
            <Skeleton variant="text" width={80} />
            <Skeleton variant="text" width={screenWidth < 768 ? 200 : 430} />
            <Skeleton
              variant="rectangular"
              width={screenWidth < 1000 ? 300 : 1000}
              height={300}
            />
          </div>
        ) : (
          <LineChart userGrowth={data?.userGrowth} />
        )}
      </div>
    </div>
  );
};

export default UserGrowth;
