import type { ReactNode } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import useGetTheme from "@/constants/useGetTheme";

type props = {
  className?: string;
  children: ReactNode;
};

export default function SafeAreaViewLayout({ className, children }: props) {
  const { height } = useGetTheme();
  const { type } = useParams();
  return (
    <div
      className="bg-bg flex-1"
      style={{ paddingBottom: type ? height * 0.4 : height * 0.15 }}
    >
      <div
        className={clsx(
          "flex flex-col flex-1 min-h-screen gap-10 bg-bg",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
