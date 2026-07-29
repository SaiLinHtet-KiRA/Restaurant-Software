import { View, Text } from "react-native";
import React, { ReactNode } from "react";
import BackArrowButton from "../Button/BackArrowButton";

export default function StackLayout({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <>
      <BackArrowButton />
      {children}
    </>
  );
}
