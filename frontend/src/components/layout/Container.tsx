import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-sky-500">
      <div className="rounded-t-[2.5rem] bg-sky-500 pt-6 shadow-soft" />
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 bg-gradient-to-b from-sky-500 to-sky-600 px-4 pb-8 sm:px-6">
        {children}
      </div>
    </div>
  );
}
