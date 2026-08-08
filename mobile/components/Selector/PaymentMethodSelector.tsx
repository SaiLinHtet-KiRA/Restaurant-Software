import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { PaymentMethods } from "@/constants/data";
import Arrow from "@/svg/Arrow";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setSelected } from "@/redux/features/PaymentMethod";

export default function PaymentMethodSelector() {
  const selected = useAppSelector(({ paymentMethod }) => paymentMethod);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <View>
      {open && (
        <View className="absolute bottom-[105%] left-0 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden z-50">
          {PaymentMethods.map((method) => (
            <Pressable
              key={method.name}
              className={`px-4 py-2 ${method.name === selected ? "bg-sky-100" : "bg-white"}`}
              onPress={() => {
                dispatch(setSelected(method.name));
                setOpen(false);
              }}
            >
              <Text
                className={`text-sm   ${method.name === selected ? "text-bg-sec font-semibold" : "text-black"}`}
              >
                {method.name}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
      <Pressable
        className="bg-bg-sec flex-row items-center gap-1 px-3 py-2 rounded-lg"
        onPress={handleToggle}
      >
        <Text className="text-white text-[14px] font-semibold">{selected}</Text>
        {open ? (
          <View className="size-4 rotate-90">
            <Arrow stroke="white" strokeWidth={3} />
          </View>
        ) : (
          <View className="size-4 -rotate-90">
            <Arrow stroke="white" strokeWidth={3} />
          </View>
        )}
      </Pressable>
    </View>
  );
}
