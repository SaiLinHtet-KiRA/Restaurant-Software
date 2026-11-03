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
          <span className="absolute ml-2 top-4 block size-7 aspect-square ">
            {createElement(Svg, { stroke: "black" })}
          </span>

          <input
            type={keyboardType === "numeric" ? "number" : "text"}
            placeholder={placeholder}
            className="bg-[rgba(0,0,0,0.1)] outline outline-gray-400 text-xl font-semibold h-14 focus:outline-blue-500 flex-1 pl-10 pr-5 py-2 rounded-xl placeholder:font-normal"
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
