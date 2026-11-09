import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import Spinner from "@/components/Buget/Spinner";
import EmptyState from "@/components/Buget/EmptyState";
import HistoryCard from "@/components/Card/HistoryCard";
import ListBullet from "@/svg/ListBullet";
import { useGetHistorysQuery } from "@/redux/api/history";

export default function Historys() {
  const { data, isFetching } = useGetHistorysQuery();
  return (
    <SafeAreaViewLayout>
      <div className="screen">
        <div className="flex flex-col">
          <span className="page-title">History</span>
          <span className="page-subtitle">
            {data?.size || 0} completed order{data?.size === 1 ? "" : "s"}
          </span>
        </div>
        {isFetching ? (
          <Spinner />
        ) : data?.size ? (
          <div className="flex flex-col gap-3">
            {data?.data.map((order) => (
              <HistoryCard {...order} key={order._id ?? order.id} />
            ))}
          </div>
        ) : (
          <EmptyState
            SVG={ListBullet}
            text="No order history yet"
            subtitle="Completed and cashed-out orders will show up here."
            className="text-slate-500"
          />
        )}
      </div>
    </SafeAreaViewLayout>
  );
}
