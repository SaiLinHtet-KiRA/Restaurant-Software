import type { ReactNode } from "react";
import BackArrowButton from "../Button/BackArrowButton";

export default function StackLayout({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <BackArrowButton />
      {children}
    </div>
  );
}
