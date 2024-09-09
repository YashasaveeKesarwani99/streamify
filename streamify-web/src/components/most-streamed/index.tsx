import { useEffect } from "react";
import { Skeleton, Typography } from "@mui/material";
import { useFetchWithCache } from "../../hooks/use-fetch-with-cache";
import { useNotify } from "../../hooks/use-notify";

const MostStreamed = () => {
  const notify = useNotify();
  const apiUrl = import.meta.env.VITE_API_URL;

  const { data, error, isLoading } = useFetchWithCache<MostStreamedResponse>({
    key: ["most-streamed"],
    url: `${apiUrl}/most-streamed`,
  });

  useEffect(() => {
    if (error) {
      notify.error("Unable to fetch data!");
    }
  }, [error]);

  return (
    <div className="pt-10">
      <Typography variant="h5">Most Streamed Artist</Typography>
      <div className="pt-8 flex items-center justify-start gap-8">
        <div className="w-40 h-20 bg-secondary rounded-2xl drop-shadow-xl overflow-hidden">
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              className="!absolute !top-0 !w-full !h-full"
            />
          ) : (
            <img src={data?.image} />
          )}
          <img />
        </div>
        <div>
          {isLoading ? (
            <>
              <Typography>
                <Skeleton variant="text" className="!w-[50px]" />
              </Typography>
              <Typography>
                <Skeleton variant="text" className="!w-[70px]" />
              </Typography>
            </>
          ) : (
            <>
              <Typography>{data?.artistName}</Typography>
              <Typography>
                {data?.revenueGenerated}{" "}
                {data?.numberOfUsers ? data.numberOfUsers + " users" : ""}
              </Typography>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MostStreamed;
