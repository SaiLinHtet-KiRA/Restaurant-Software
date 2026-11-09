import type { ReactNode } from "react";
import { useLocation, useParams } from "react-router-dom";
import ItemCard from "../Card/ItemCard";
import PlusCirlce from "@/svg/PlusCircle";
import type Item from "@/interface/Item";

type props = {
  items: Item[];
  add: () => void;
  children?: (item: Item) => React.ReactNode;
  className?: string;
  header: ReactNode;
};

export default function ItemList({
  items,
  add,
  children,
  className,
  header,
}: props) {
  const { type } = useParams();
  const { pathname } = useLocation();

  return (
    <>
      {header}
      <div className="no-scrollbar flex w-full overflow-x-auto">
        <div className="flex flex-row gap-3 px-1 py-3 sm:gap-4">
          {!type && pathname !== "/orders" && pathname !== "/history" && (
            <button
              type="button"
              onClick={add}
              aria-label="Add item"
              className="press flex items-center self-center rounded-2xl bg-sky-500 p-3 shadow-soft transition hover:bg-sky-400"
            >
              <span className="block size-7">
                <PlusCirlce stroke="white" />
              </span>
            </button>
          )}
          <div className="flex flex-row gap-3 sm:gap-4">
            {items.map((item) => (
              <ItemCard key={item._id} {...item} className={className}>
                {children && children(item)}
              </ItemCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
