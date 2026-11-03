import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import Spinner from "@/components/Buget/Spinner";
import HistoryCard from "@/components/Card/HistoryCard";
import { useGetHistorysQuery } from "@/redux/api/history";

export default function Historys() {
  const { data, isFetching } = useGetHistorysQuery();
  return (
    <SafeAreaViewLayout className="px-10">
      <div className="px-6 pt-8 flex flex-col flex-1 gap-3">
        <div className="md:px-10 flex flex-row justify-between items-center">
          <span className="font-bold text-2xl md:text-4xl text-black">
            History ({data?.size || "0"})
          </span>
        </div>
        {isFetching ? (
          <Spinner />
        ) : data?.size ? (
          data?.data.map((order) => (
            <HistoryCard {...order} key={order._id ?? order.id} />
          ))
        ) : (
          <div className="flex flex-col flex-1 justify-center items-center">
            <span className="text-black text-xl font-bold">
              There is no order!!!
            </span>
          </div>
        )}
      </div>
    </SafeAreaViewLayout>
  );
}
