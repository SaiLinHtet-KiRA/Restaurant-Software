import { useAppSelector } from "@/redux/store";
import { useLocalSearchParams } from "expo-router";

export default function useGetSelectedItem(PT?: string) {
  const { type } = useLocalSearchParams();
  const order = useAppSelector(({ order }) => order);
  const Type =
    PT || type
      ? type
      : Number(order.table)
        ? "eat-in"
        : order.table == "Take Away" && "take-away";

  const selectedItem =
    Type == "take-away" ? order.takeAway : Type == "eat-in" ? order.eatIn : [];
  return { type: Type, selectedItem };
}
