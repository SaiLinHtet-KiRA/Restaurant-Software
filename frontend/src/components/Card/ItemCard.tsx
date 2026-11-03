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
    <div className="flex flex-col gap-2 content-center ">
      <div
        className={clsx(
          className,
          "item-card relative overflow-hidden rounded-2xl",
        )}
      >
        <div
          className="absolute size-full z-[1]"
          style={{ background: "linear-gradient(to top, #000, #0000)" }}
        />
        {photo_url ? (
          <img
            src={photo_url}
            alt={name}
            className="absolute size-full object-cover"
          />
        ) : null}
        <div className="absolute bottom-0 inset-x-0 bg-black/50 p-2 flex flex-col gap-0.5 z-[2]">
          <span className="text-white font-bold truncate">{name}</span>

          <span className="text-white text-sm">{price} ฿</span>
        </div>
      </div>
      {children}
    </div>
  );
}
