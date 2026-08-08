import { useAppSelector } from "@/redux/store";

export default function useGetTotalPrice() {
  let totalPrice = 0;
  const order = useAppSelector(({ order }) => order);

  for (const item of order.eatIn) totalPrice += item.count * Number(item.price);
  for (const item of order.takeAway)
    totalPrice += item.count * Number(item.price);

  return totalPrice;
}
