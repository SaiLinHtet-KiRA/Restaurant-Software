import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "@/components/Button/Button";
import TableCard from "@/components/Card/TableCard";
import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import Spinner from "@/components/Buget/Spinner";
import useGetTheme from "@/constants/useGetTheme";
import { useGetTablesQuery } from "@/redux/api/table";
import { clearOrder, setOrderTableNo } from "@/redux/features/Order";
import ShoppingBag from "@/svg/ShoppingBag";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isFetching } = useGetTablesQuery({ taken: false });
  const { space, numColumns } = useGetTheme();

  return (
    <SafeAreaViewLayout className="px-10">
      <div className="px-6 pt-8 flex flex-col flex-1 gap-3">
        <div className="md:px-10 flex flex-row justify-between items-center">
          <span className="font-bold text-2xl md:text-4xl text-black">
            Table({data?.size || "0"})
          </span>
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
          <div className="self-center">
            <div
              className="grid"
              style={{
                gap: space,
                gridTemplateColumns: `repeat(${numColumns}, minmax(0, 1fr))`,
              }}
            >
              {data.data.map(({ number, _id }) => (
                <button
                  type="button"
                  key={_id}
                  onClick={() => {
                    dispatch(clearOrder());
                    dispatch(setOrderTableNo(number.toString()));

                    navigate(`/order/${number}`);
                  }}
                >
                  <TableCard number={number} />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1 justify-center items-center">
            <span className="text-black text-xl font-bold">
              There is no tables!!!
            </span>
          </div>
        )}
      </div>
    </SafeAreaViewLayout>
  );
}
