type props = {
  count: number;
  price: number;
};

export default function PriceFooterOfCard({ count, price }: props) {
  return (
    <div className="flex flex-row justify-between px-2">
      <span className="font-bold text-white">x {count}</span>
      <span className="font-bold text-white">{count * price} ฿</span>
    </div>
  );
}
