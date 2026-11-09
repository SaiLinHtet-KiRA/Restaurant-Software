import { useAppSelector } from "@/redux/store";
import type Item from "@/interface/Item";
import clsx from "clsx";

export default function ItemsTable() {
  const order = useAppSelector(({ order }) => order);
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center justify-between border-b border-slate-300/60 pb-2">
        <span className="text-base font-bold text-slate-800">Order items</span>
        <span className="rounded-lg bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700">
          Table {order.table}
        </span>
      </div>
      {order.eatIn.length ? (
        <Section title="Eat In" items={order.eatIn} />
      ) : null}
      {order.takeAway.length ? (
        <Section title="Take Away" items={order.takeAway} />
      ) : null}
    </div>
  );
}

const Section = ({ title, items }: { title: string; items: Item[] }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
      {title}
    </span>
    <div className="overflow-hidden rounded-xl border border-slate-200">
      {items.map((item, index) => (
        <TableRow
          key={item._id}
          {...item}
          className={index % 2 ? "bg-slate-500/5" : "bg-white/60"}
        />
      ))}
    </div>
  </div>
);

const TableRow = ({
  name,
  photo_url,
  count,
  price,
  className,
}: Item & {
  className: string;
}) => {
  return (
    <div className={clsx("flex flex-1 flex-row items-center gap-2 p-2", className)}>
      <div className="relative block size-9 shrink-0 overflow-hidden rounded-lg bg-slate-200">
        {photo_url ? (
          <img
            src={photo_url}
            alt={name}
            className="absolute size-full object-cover"
          />
        ) : null}
      </div>
      <span className="flex-1 truncate text-sm font-medium text-slate-700">
        {name}
      </span>
      <span className="w-14 text-right text-xs text-slate-500">{price}฿</span>
      <span className="w-8 text-right text-xs font-semibold text-slate-700">
        x{count}
      </span>
      <span className="w-16 text-right text-sm font-bold text-slate-900">
        {count * Number(price)}฿
      </span>
    </div>
  );
};
