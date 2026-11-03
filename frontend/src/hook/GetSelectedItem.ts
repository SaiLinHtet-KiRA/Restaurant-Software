import { useAppSelector } from "@/redux/store";
import { useParams } from "react-router-dom";

export default function useGetSelectedItem(PT?: string) {
  const { type } = useParams();
  const order = useAppSelector(({ order }) => order);
  const Type: string | undefined | false =
    PT || type
      ? type
      : Number(order.table)
        ? "eat-in"
        : order.table == "Take Away" && "take-away";

  const selectedItem =
    Type == "take-away" ? order.takeAway : Type == "eat-in" ? order.eatIn : [];
  return { type: Type, selectedItem };
}
