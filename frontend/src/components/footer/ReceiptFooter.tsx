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
    <div className="flex flex-col items-center justify-between gap-3 pb-3">
      <span className="font-semibold self-end">
        <span className="text-[14px] font-base">Total </span>
        {price}฿
      </span>
      <div className="bg-gray-400/30 h-1 w-75 rounded-full" />
      <div className="flex flex-row items-center ">
        <PaymentMethodSelector />
        <Button
          SVG={CashOut}
          onClik={closeModal}
          className="bg-emerald-400! scale-[0.8]"
          text="Cash Out"
          disabled={false}
        />
      </div>
    </div>
  );
}
