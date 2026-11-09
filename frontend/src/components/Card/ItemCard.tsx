import type { ReactNode } from "react";
import type Item from "@/interface/Item";
import clsx from "clsx";

export default function ItemCard({
  name,
  photo_url,
  price,
  children,
  className,
}: Item & {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-2 content-center">
      <div
        className={clsx(
          className,
          "item-card group relative overflow-hidden rounded-2xl bg-slate-200 shadow-soft ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card",
        )}
      >
        <div
          className="absolute inset-0 z-[1] transition-opacity duration-300 group-hover:opacity-90"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.1) 60%, transparent)",
          }}
        />
        {photo_url ? (
          <img
            src={photo_url}
            alt={name}
            className="absolute size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400">
            <span className="text-sm font-medium">No image</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 z-[2] flex flex-col gap-0.5 bg-black/35 p-2 backdrop-blur-[2px]">
          <span className="truncate text-sm font-semibold text-white">
            {name}
          </span>
          <span className="text-xs text-white/80">{price} ฿</span>
        </div>
      </div>
      {children}
    </div>
  );
}
