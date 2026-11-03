import type { ReactNode } from "react";
import type Order from "@/interface/Order";
import type Item from "@/interface/Item";
import ItemList from "./ItemList";
import PriceFooterOfCard from "../footer/PriceFooterOfCard";
import ItemSectionHeader from "./ItemSectionHeader";

export default function BaseCard({
  id,
  eatIn,
  price,
  table,
  takeAway,
  children,
}: Order & {
  children: ReactNode;
}) {
  return (
    <div className="bg-sky-500 py-6 px-8 rounded-2xl flex flex-col gap-4">
      <div className="flex flex-row items-center">
        <span className="text-white font-bold text-2xl"># {id} </span>
        <span className="opacity-90 text-white font-bold text-lg bg-sky-400 px-2 py-1 rounded-xl">
          {Number(table) ? `Table No ${table}` : table}
        </span>
      </div>

      {eatIn.length ? (
        <div className="flex-1 bg-bg-sec pl-6 py-4 rounded-2xl">
          <ItemList
            items={takeAway}
            add={() => {
              return;
            }}
            className="w-30!"
            header={<ItemSectionHeader text={`Eat In (${takeAway.length})`} />}
          >
            {(item: Item) => (
              <PriceFooterOfCard count={item.count} price={item.price} />
            )}
          </ItemList>
        </div>
      ) : (
        <></>
      )}
      {takeAway.length ? (
        <div className="flex-1 bg-bg-sec pl-6 py-4 rounded-2xl">
          <ItemList
            items={takeAway}
            add={() => {
              return;
            }}
            className="w-30!"
            header={
              <ItemSectionHeader text={`Take Away (${takeAway.length})`} />
            }
          >
            {(item: Item) => (
              <PriceFooterOfCard count={item.count} price={item.price} />
            )}
          </ItemList>
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-row justify-between items-center">
        <span className="text-white font-bold text-2xl">{price}฿</span>
        <div className="flex flex-row gap-3">{children}</div>
      </div>
    </div>
  );
}
