import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <div className="bg-sky-500 py-5 rounded-t-full" />
      <div className="px-5 h-full bg-sky-500 flex flex-col gap-4">{children}</div>
    </div>
  );
}
