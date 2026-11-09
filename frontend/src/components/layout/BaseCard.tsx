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
    <div className="animate-slide-up flex flex-col gap-3 rounded-2xl bg-gradient-to-b from-sky-500 to-sky-600 px-4 py-4 shadow-card ring-1 ring-white/15 sm:px-5 sm:py-5">
      <div className="flex flex-row items-center gap-2">
        {id != null ? (
          <span className="text-lg font-bold text-white"># {id}</span>
        ) : null}
        <span className="rounded-lg bg-white/20 px-2.5 py-1 text-sm font-bold text-white backdrop-blur-sm">
          {Number(table) ? `Table No ${table}` : table}
        </span>
      </div>

      {eatIn.length ? (
        <div className="flex-1 rounded-xl bg-bg-sec py-3 pl-3 ring-1 ring-white/10">
          <ItemList
            items={eatIn}
            add={() => {
              return;
            }}
            header={<ItemSectionHeader text={`Eat In (${eatIn.length})`} />}
          >
            {(item: Item) => (
              <PriceFooterOfCard count={item.count} price={item.price} />
            )}
          </ItemList>
        </div>
      ) : null}
      {takeAway.length ? (
        <div className="flex-1 rounded-xl bg-bg-sec py-3 pl-3 ring-1 ring-white/10">
          <ItemList
            items={takeAway}
            add={() => {
              return;
            }}
            header={
              <ItemSectionHeader text={`Take Away (${takeAway.length})`} />
            }
          >
            {(item: Item) => (
              <PriceFooterOfCard count={item.count} price={item.price} />
            )}
          </ItemList>
        </div>
      ) : null}
      <div className="flex flex-row items-center justify-between gap-3">
        <span className="text-xl font-bold text-white">{price}฿</span>
        <div className="flex flex-row flex-wrap justify-end gap-2">
          {children}
        </div>
      </div>
    </div>
  );
}
