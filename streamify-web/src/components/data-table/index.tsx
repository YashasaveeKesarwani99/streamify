import { Skeleton, Typography } from "@mui/material";
import TableLayout from "./table-layout";
import { useFetchWithCache } from "../../hooks/use-fetch-with-cache";
import { useNotify } from "../../hooks/use-notify";
import { useEffect } from "react";
import { useWindowWidth } from "../../hooks/use-window-width";

const DataTable = () => {
  const notify = useNotify();
  const screenWidth = useWindowWidth();

  const { data, error, isLoading } = useFetchWithCache<TableDataResponse[]>({
    key: ["data-table"],
    url: "http://localhost:3000/api/table-data",
  });

  useEffect(() => {
    if (error) {
      notify.error("Unable to fetch data!");
    }
  }, [error]);

  return (
    <div className="pt-10 mb-10">
      <Typography variant="h5">Recent Activity</Typography>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          width={screenWidth < 768 ? 280 : 1200}
          height={400}
          className="!mt-8"
        />
      ) : (
        <TableLayout rows={data} />
      )}
    </div>
  );
};

export default DataTable;
