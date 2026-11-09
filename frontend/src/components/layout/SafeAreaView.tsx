import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

type props = {
  className?: string;
  children: ReactNode;
};

export default function SafeAreaViewLayout({ className, children }: props) {
  const { pathname } = useLocation();
  const isAdd = pathname.startsWith("/add");
  const isOrder = pathname.startsWith("/order");

  return (
    <div
      className={clsx(
        "flex min-h-screen flex-col bg-bg",
        isAdd ? "pb-[44vh]" : isOrder ? "pb-32" : "pb-24",
        className,
      )}
    >
      <div className="flex flex-1 flex-col gap-6">{children}</div>
    </div>
  );
}
