import React, { Suspense } from "react";
import Header from "../components/header";
import MetricCards from "../components/metric-cards";
import MostStreamed from "../components/most-streamed";
import RevenueDistribution from "../components/revenue-distribution";
import TopStreams from "../components/top-streams";

const UserGrowth = React.lazy(() => import("../components/user-growth"));
const DataTable = React.lazy(() => import("../components/data-table"));

const Page = () => {
  return (
    <div className="w-4/5 m-auto py-4 flex-col">
      <Header />
      <MetricCards />
      <MostStreamed />
      <div className="flex flex-col w-full justify-between items-center pt-10 gap-10 md:flex-row">
        <RevenueDistribution />
        <TopStreams />
      </div>
      <Suspense>
        <UserGrowth />
      </Suspense>
      <Suspense>
        <DataTable />
      </Suspense>
    </div>
  );
};

export default Page;
