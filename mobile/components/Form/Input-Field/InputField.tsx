import { TextInput, KeyboardType, View, Text } from "react-native";
import React, { createElement } from "react";
import { Controller, Control } from "react-hook-form";
import Item from "@/interface/Item";

type props = {
  control: Control<Partial<Omit<Item, "photo">>>;
  name: keyof Omit<Item, "photo">;
  keyboardType: KeyboardType;
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
        <View className="relative  flex-row gap-1">
          <View className="absolute  ml-2 top-4 size-7 aspect-square ">
            {createElement(Svg, { stroke: "black" })}
          </View>

          <TextInput
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor="#bcccc0"
            className="outline outline-gray-400 text-xl font-semibold h-14 focus:outline-blue-500 flex-1 pl-10 pr-5 py-2 rounded-xl placeholder:font-normal"
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
          />
        </View>
      )}
    />
  );
}
