import type Item from "@/interface/Item";
import ItemList from "../layout/ItemList";
import useGetSelectedItem from "@/hook/GetSelectedItem";

export default function AddedItemSectionFooter() {
  const { type, selectedItem } = useGetSelectedItem();
  if (!selectedItem.length) return null;

  return (
    <div className="animate-slide-up fixed inset-x-0 bottom-0 z-40 flex max-h-[42vh] flex-col">
      <div className="h-10 shrink-0 bg-gradient-to-b from-transparent to-[#0084bf]" />
      <div className="overflow-y-auto bg-bg-sec px-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-8px_28px_-14px_rgba(15,23,42,0.45)]">
        <div className="mx-auto flex w-full max-w-5xl flex-col">
          <div className="flex items-center justify-between pr-2">
            <span className="section-title">
              {type == "take-away" ? "Take Away" : "Eat In"} (
              {selectedItem.length})
            </span>
          </div>
          <ItemList
            items={selectedItem}
            add={() => {
              return;
            }}
            header={<></>}
          >
            {(item: Item) => (
              <div className="flex flex-row justify-between px-2 text-sm">
                <span className="font-semibold text-white/80">
                  x {item.count}
                </span>
                <span className="font-semibold text-white">
                  {item.count * Number(item.price)} ฿
                </span>
              </div>
            )}
          </ItemList>
        </div>
      </div>
    </div>
  );
}
