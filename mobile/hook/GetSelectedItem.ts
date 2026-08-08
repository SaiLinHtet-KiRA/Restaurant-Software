import { useAppSelector } from "@/redux/store";
import { useLocalSearchParams } from "expo-router";

export default function useGetSelectedItem() {
  const { type } = useLocalSearchParams();
  const order = useAppSelector(({ order }) => order);
  const selectedItem =
    type == "take-away" ? order.takeAway : type == "eat-in" ? order.eatIn : [];
  return { type, selectedItem };
}
