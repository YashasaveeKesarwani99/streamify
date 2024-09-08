import { useEffect } from "react";
import MetricCard from "../../atoms/metric-card";
import { useFetchWithCache } from "../../hooks/use-fetch-with-cache";
import { useNotify } from "../../hooks/use-notify";
import { useWindowWidth } from "../../hooks/use-window-width";

const MetricCards = () => {
  const screenWidth = useWindowWidth();
  const notify = useNotify();

  const { data, error, isLoading } = useFetchWithCache<MetricCardsResponse>({
    key: ["users"],
    url: "http://localhost:3000/api/metric-cards",
  });

  useEffect(() => {
    if (error) {
      notify.error("Unable to fetch data!");
    }
  }, [error]);

  if (screenWidth < 768) {
    return (
      <div className="pt-10 flex flex-col !gap-10 justify-between">
        <div className="flex justify-between items-center !gap-10">
          <MetricCard
            title="Total Users"
            value={data?.totalUsers}
            isLoading={isLoading}
          />
          <MetricCard
            title="Active Users"
            value={data?.activeUsers}
            isLoading={isLoading}
          />
        </div>
        <div className="flex flex-col justify-between items-center !gap-10 sm:flex-row">
          {" "}
          <MetricCard
            title="Total Streams"
            value={data?.totalStreams}
            isLoading={isLoading}
          />
          <MetricCard
            title="Revenue"
            value={data?.revenue}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-10 flex flex-col !gap-10 justify-between md:flex-row">
      <MetricCard
        title="Total Users"
        value={data?.totalUsers}
        isLoading={isLoading}
      />
      <MetricCard
        title="Active Users"
        value={data?.activeUsers}
        isLoading={isLoading}
      />
      <MetricCard
        title="Total Streams"
        value={data?.totalStreams}
        isLoading={isLoading}
      />
      <MetricCard title="Revenue" value={data?.revenue} isLoading={isLoading} />
    </div>
  );
};

export default MetricCards;
