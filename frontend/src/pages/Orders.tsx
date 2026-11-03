import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import Spinner from "@/components/Buget/Spinner";
import OrderCard from "@/components/Card/OrderCard";
import { useGetOrdersQuery } from "@/redux/api/order";

export default function Orders() {
  const { data, isFetching } = useGetOrdersQuery();
  return (
    <SafeAreaViewLayout className="px-10">
      <div className="px-6 pt-8 flex flex-col flex-1 gap-3">
        <div className="md:px-10 flex flex-row justify-between items-center">
          <span className="font-bold text-2xl md:text-4xl text-black">
            Order ({data?.size || "0"})
          </span>
        </div>
        {isFetching ? (
          <Spinner />
        ) : data?.size ? (
          data?.data.map((order) => (
            <OrderCard {...order} key={order._id ?? order.id} />
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
