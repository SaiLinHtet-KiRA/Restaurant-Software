import { useNavigate, useParams } from "react-router-dom";
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

  const busy = isLoading || updating;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex flex-col">
      <div className="h-10 bg-gradient-to-b from-transparent to-[#0084bf]" />
      <div className="bg-bg-sec px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_28px_-14px_rgba(15,23,42,0.45)]">
        <div className="mx-auto flex w-full max-w-5xl flex-row items-center justify-between gap-3">
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-medium uppercase tracking-wide text-white/70">
              Total
            </span>
            <span className="text-xl font-bold text-white">{TotalPrice}฿</span>
          </div>
          <button
            type="button"
            onClick={Handler}
            disabled={busy}
            className="press inline-flex h-11 shrink-0 items-center rounded-xl bg-sky-500 px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-sky-400 disabled:opacity-60"
          >
            {IsUpdate
              ? updating
                ? "Updating…"
                : "Update Order"
              : isLoading
                ? "Creating…"
                : "Create Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
