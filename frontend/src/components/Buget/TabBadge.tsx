import { createElement } from "react";
import type { Tab } from "@/constants/data";

export default function TabBadge({ title, svg }: Tab) {
  return (
    <div className="flex flex-row items-center border border-gray-200 rounded-xl md:px-8 md:py-6 px-4 py-3 bg-white gap-2">
      <span className="block w-14 h-14 md:w-24 md:h-24 ">
        {createElement(svg, { stroke: "#000" })}
      </span>
      <span className="md:text-4xl text-2xl text-gray-500">{title}</span>
    </div>
  );
}
