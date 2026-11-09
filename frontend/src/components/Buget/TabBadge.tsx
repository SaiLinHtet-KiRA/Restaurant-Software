import { createElement } from "react";
import type { Tab } from "@/constants/data";

export default function TabBadge({ title, svg }: Tab) {
  return (
    <div className="press flex flex-row items-center gap-3 rounded-2xl border border-white/70 bg-white px-4 py-3.5 shadow-soft hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-card">
      <span className="block size-10 text-slate-700">
        {createElement(svg, { stroke: "currentColor" })}
      </span>
      <span className="text-lg font-semibold text-slate-700">{title}</span>
    </div>
  );
}
