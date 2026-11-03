import type Item from "@/interface/Item";
import useGetTheme from "@/constants/useGetTheme";
import ItemList from "../layout/ItemList";
import useGetSelectedItem from "@/hook/GetSelectedItem";

export default function AddedItemSectionFooter() {
  const { type, selectedItem } = useGetSelectedItem();
  const { height } = useGetTheme();
  if (!selectedItem.length) return null;

  return (
    <div
      className="fixed flex flex-col bottom-0 left-0 right-0 z-40"
      style={{ height: height * 0.4 }}
    >
      <div className="relative h-[30%] ">
        <div
          className="absolute size-full z-10"
          style={{ background: "linear-gradient(to bottom, #0000, #0084bf)" }}
        />
      </div>
      <div className="flex-1 bg-bg-sec pl-6">
        <span className="text-xl font-bold text-white ">
          {type == "take-away" ? "Take Away" : "Eat In"} ({selectedItem.length})
        </span>
        <ItemList
          items={selectedItem}
          add={() => {
            return;
          }}
          className="w-30!"
          header={<></>}
        >
          {(item: Item) => (
            <div className="flex flex-row justify-between px-2">
              <span className="font-bold text-white">x {item.count}</span>
              <span className="font-bold text-white">
                {item.count * Number(item.price)} ฿
              </span>
            </div>
          )}
        </ItemList>
      </div>
    </div>
  );
}
