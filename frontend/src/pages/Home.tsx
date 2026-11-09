import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "@/components/Button/Button";
import TableCard from "@/components/Card/TableCard";
import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import Spinner from "@/components/Buget/Spinner";
import EmptyState from "@/components/Buget/EmptyState";
import { useGetTablesQuery } from "@/redux/api/table";
import { clearOrder, setOrderTableNo } from "@/redux/features/Order";
import ShoppingBag from "@/svg/ShoppingBag";
import Table from "@/svg/Table";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isFetching } = useGetTablesQuery({ taken: false });
  return (
    <SafeAreaViewLayout>
      <div className="screen">
        <div className="flex flex-row items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="page-title">Tables</span>
            <span className="page-subtitle">
              {data?.size || 0} available · tap to start an order
            </span>
          </div>
          <Button
            SVG={ShoppingBag}
            disabled={false}
            onClik={() => {
              dispatch(clearOrder());
              dispatch(setOrderTableNo("Take Away"));

              navigate("/order/take-away");
            }}
            text="Take Away"
          />
        </div>
        {isFetching ? (
          <Spinner />
        ) : data?.size ? (
          <div className="table-grid w-full">
            {data.data?.map(({ number, _id }) => (
              <Link
                to={`/order/${number}`}
                key={_id}
                aria-label={`Open table ${number}`}
                className="press block w-full rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
                onClick={() => {
                  dispatch(clearOrder());
                  dispatch(setOrderTableNo(number.toString()));
                }}
              >
                <TableCard number={number} />
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            SVG={Table}
            text="No tables available"
            subtitle="Add tables from the More tab to start taking orders."
            className="text-slate-500"
          />
        )}
      </div>
    </SafeAreaViewLayout>
  );
}
