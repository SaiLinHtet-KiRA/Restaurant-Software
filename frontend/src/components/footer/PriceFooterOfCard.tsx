type props = {
  count: number;
  price: number;
};

export default function PriceFooterOfCard({ count, price }: props) {
  return (
    <div className="flex flex-row justify-between px-2 text-sm">
      <span className="font-semibold text-white">x {count}</span>
      <span className="font-semibold text-white">{count * price} ฿</span>
    </div>
  );
}
