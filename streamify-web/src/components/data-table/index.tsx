import { Skeleton, Typography } from "@mui/material";
import TableLayout from "./table-layout";
import { useFetchWithCache } from "../../hooks/use-fetch-with-cache";
import { useNotify } from "../../hooks/use-notify";
import { useEffect, useRef, useState } from "react";
import { useWindowWidth } from "../../hooks/use-window-width";

const DataTable = () => {
  const notify = useNotify();
  const screenWidth = useWindowWidth();
  const [isIntersecting, setIsIntersecting] = useState(false);
  const tableAreaRef = useRef(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const { data, error, isLoading } = useFetchWithCache<TableDataResponse[]>({
    key: ["data-table"],
    url: `${apiUrl}/table-data`,
    enabled: isIntersecting,
  });

  useEffect(() => {
    if (error) {
      notify.error("Unable to fetch data!");
    }
  }, [error]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsIntersecting(true);
        }
      },
      {
        threshold: 1,
      }
    );

    if (tableAreaRef.current) {
      observer.observe(tableAreaRef.current);
    }

    return () => {
      if (tableAreaRef.current) observer.unobserve(tableAreaRef.current);
    };
  });

  return (
    <div className="pt-10 mb-10" ref={tableAreaRef}>
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
