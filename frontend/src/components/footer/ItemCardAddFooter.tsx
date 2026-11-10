import type Item from "@/interface/Item";
import IconButton from "../Button/IconButton";
import MinusCircle from "@/svg/MinusCircle";
import PlusCircle from "@/svg/PlusCircle";
import { useDispatch } from "react-redux";
import { increaseItem, reduceItem } from "@/redux/features/Order";
import useGetSelectedItem from "@/hook/GetSelectedItem";

export default function ItemCardAddFooter({
  item,
  Type,
}: {
  item: Item;
  Type?: string;
}) {
  const { type: T, selectedItem } = useGetSelectedItem(Type);
  const type = Type || T;
  const dispatch = useDispatch();

  const selected = selectedItem.find(({ _id }) => _id === item._id);
  const count = selected?.count ?? 0;

  return (
    <div className="flex flex-row items-center justify-between gap-2 px-2">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={count < 1}
        className="press transition disabled:opacity-40"
        onClick={() =>
          dispatch(reduceItem({ type: type as string, item: item }))
        }
      >
        <IconButton svg={MinusCircle} />
      </button>
      <span className="flex h-8 flex-1 items-center justify-center rounded-xl bg-sky-500 text-sm font-bold text-white shadow-sm">
        {count}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="press transition disabled:opacity-40"
        onClick={() =>
          dispatch(increaseItem({ type: type as string, item: item }))
        }
      >
        <IconButton svg={PlusCircle} />
      </button>
    </div>
  );
}
