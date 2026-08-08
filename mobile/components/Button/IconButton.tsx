import { View, Text } from "react-native";
import React, { createElement } from "react";
import clsx from "clsx";

type props = {
  svg: SVGComponent;
  className?: string;
};

export default function IconButton({ svg, className }: props) {
  return (
    <View className={clsx(className, "size-8")}>
      {createElement(svg, { stroke: "white" })}
    </View>
  );
}
