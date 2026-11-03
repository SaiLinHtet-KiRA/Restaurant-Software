import type { ReactNode } from "react";
import { useLocation, useParams } from "react-router-dom";
import ItemCard from "../Card/ItemCard";
import PlusCirlce from "@/svg/PlusCircle";
import type Item from "@/interface/Item";
import useGetTheme from "@/constants/useGetTheme";

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

  const { space } = useGetTheme();

  return (
    <>
      {header}
      <div className="flex flex-row w-full overflow-x-auto">
        <div className="flex flex-row px-5 py-4">
          {!type && pathname !== "/orders" && pathname !== "/history" && (
            <button
              type="button"
              onClick={add}
              className="p-4 rounded-2xl bg-sky-500 mx-3 self-center"
            >
              <span className="block size-10 ">
                <PlusCirlce stroke="white" />
              </span>
            </button>
          )}
          <div className="flex flex-row" style={{ gap: space }}>
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
