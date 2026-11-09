import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import Spinner from "@/components/Buget/Spinner";
import EmptyState from "@/components/Buget/EmptyState";
import OrderCard from "@/components/Card/OrderCard";
import ShoppingBag from "@/svg/ShoppingBag";
import { useGetOrdersQuery } from "@/redux/api/order";

export default function Orders() {
  const { data, isFetching } = useGetOrdersQuery();
  return (
    <SafeAreaViewLayout>
      <div className="screen">
        <div className="flex flex-col">
          <span className="page-title">Orders</span>
          <span className="page-subtitle">
            {data?.size || 0} open order{data?.size === 1 ? "" : "s"}
          </span>
        </div>
        {isFetching ? (
          <Spinner />
        ) : data?.size ? (
          <div className="flex flex-col gap-3">
            {data.data.map((order) => (
              <OrderCard {...order} key={order._id ?? order.id} />
            ))}
          </div>
        ) : (
          <EmptyState
            SVG={ShoppingBag}
            text="No open orders"
            subtitle="New orders you create will appear here."
            className="text-slate-500"
          />
        )}
      </div>
    </SafeAreaViewLayout>
  );
}
