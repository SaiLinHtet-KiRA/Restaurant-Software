import { createElement } from "react";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import type { ItemFormValues } from "../types";

type props = {
  control: Control<ItemFormValues>;
  name: keyof ItemFormValues;
  keyboardType: "default" | "numeric";
  Svg: SVGComponent;
  placeholder: string;
};

export default function InputField({
  control,
  name,
  keyboardType,
  Svg,
  placeholder,
}: props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="relative flex flex-row gap-1">
          <span className="pointer-events-none absolute left-3 top-1/2 block size-5 aspect-square -translate-y-1/2 text-slate-500">
            {createElement(Svg, { stroke: "currentColor" })}
          </span>

          <input
            type={keyboardType === "numeric" ? "number" : "text"}
            placeholder={placeholder}
            className="h-12 flex-1 rounded-xl bg-black/5 py-2 pl-10 pr-4 text-sm font-semibold text-slate-800 outline outline-1 outline-slate-300 transition placeholder:font-normal placeholder:text-slate-400 hover:bg-black/[0.07] focus:bg-white focus:outline-2 focus:outline-sky-500"
            value={
              (field.value as string | number | undefined)?.toString() ?? ""
            }
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        </div>
      )}
    />
  );
}
