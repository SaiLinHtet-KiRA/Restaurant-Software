import useGetTotalPrice from "@/hook/GetTotalPrice";
import Button from "../Button/Button";
import CashOut from "@/svg/CashOut";
import PaymentMethodSelector from "../Selector/PaymentMethodSelector";

type props = {
  closeModal: () => void;
};

export default function ReceiptFooter({ closeModal }: props) {
  const price = useGetTotalPrice();
  return (
    <div className="flex flex-col items-center justify-between gap-3 pb-2">
      <span className="self-end rounded-lg bg-black/5 px-3 py-1.5 text-sm font-semibold text-slate-700">
        <span className="font-normal text-slate-500">Total </span>
        {price}฿
      </span>
      <div className="h-px w-full rounded-full bg-slate-400/40" />
      <div className="flex flex-row items-center gap-2">
        <PaymentMethodSelector />
        <Button
          SVG={CashOut}
          onClik={closeModal}
          className="bg-emerald-500! hover:bg-emerald-600!"
          text="Cash Out"
          disabled={false}
        />
      </div>
    </div>
  );
}
