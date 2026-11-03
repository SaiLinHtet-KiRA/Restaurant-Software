import { useNavigate, useParams } from "react-router-dom";
import useGetTheme from "@/constants/useGetTheme";
import useGetTotalPrice from "@/hook/GetTotalPrice";
import {
  useCreateOrderMutation,
  useUpdateOrderMutation,
} from "@/redux/api/order";
import { useAppSelector } from "@/redux/store";

export default function OrderFooter() {
  const { number } = useParams();
  const IsUpdate = number === "update";
  const order = useAppSelector(({ order }) => order);
  const [create, { isLoading }] = useCreateOrderMutation();
  const [update, { isLoading: updating }] = useUpdateOrderMutation();
  const navigate = useNavigate();

  const { height } = useGetTheme();

  const TotalPrice = useGetTotalPrice();

  const Handler = async () => {
    try {
      if (IsUpdate)
        await update({ id: order._id!, body: { ...order, price: TotalPrice } });
      else await create({ ...order, price: TotalPrice }).unwrap();

      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="fixed flex flex-col bottom-0 left-0 right-0 z-40"
      style={{ height: height * 0.15 }}
    >
      <div className="relative h-[30%] ">
        <div
          className="absolute size-full z-10"
          style={{ background: "linear-gradient(to bottom, #0000, #0084bf)" }}
        />
      </div>
      <div className="flex-1 bg-bg-sec pl-6 px-5 pt-3">
        <div className="flex flex-row justify-between items-center">
          <span className="text-white font-bold text-2xl">
            Total {TotalPrice}฿
          </span>
          <button
            type="button"
            onClick={Handler}
            disabled={isLoading}
            className="rounded-2xl bg-sky-500 px-5 py-2"
          >
            <span className="text-white font-bold text-lg">
              {IsUpdate
                ? updating
                  ? "Updating Order"
                  : "Update Order"
                : isLoading
                  ? "Creating Order"
                  : "Create Order"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
