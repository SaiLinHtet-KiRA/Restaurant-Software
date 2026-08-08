import { View, Text } from "react-native";
import React from "react";
import useGetTotalPrice from "@/hook/GetTotalPrice";
import Button from "../Button/Button";
import CashOut from "@/svg/CashOut";
import PaymentMethodSelector from "../Selector/PaymentMethodSelector";

type props = {
  closeModal: () => void;
};

export default function ReceiptFooter({ closeModal }: props) {
  const price = useGetTotalPrice();
  return (
    <View className=" items-center justify-between gap-3 pb-3">
      <Text className=" font-semibold self-end">
        <Text className="text-[14px] font-base">Total </Text>
        {price}฿
      </Text>
      <View className="bg-gray-400/30 h-1 w-75 rounded-full" />
      <View className="flex-row items-center ">
        <PaymentMethodSelector />
        <Button
          SVG={CashOut}
          onClik={closeModal}
          className="!bg-emerald-400 scale-[0.8]"
          text="Cash Out"
          disabled={false}
        />
      </View>
    </View>
  );
}
