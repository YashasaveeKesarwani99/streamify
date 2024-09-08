import DataTable from "../components/data-table";
import Header from "../components/header";
import MetricCards from "../components/metric-cards";
import MostStreamed from "../components/most-streamed";
import RevenueDistribution from "../components/revenue-distribution";
import TopStreams from "../components/top-streams";
import UserGrowth from "../components/user-growth";

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
      <UserGrowth />
      <DataTable />
    </div>
  );
};

export default Page;
