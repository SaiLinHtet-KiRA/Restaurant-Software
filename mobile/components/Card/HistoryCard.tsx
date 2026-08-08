import { View, Text } from "react-native";
import React, { useState } from "react";
import Order from "@/interface/Order";
import ItemList from "../layout/ItemList";
import Item from "@/interface/Item";
import Button from "../Button/Button";
import PencilSquare from "@/svg/PencilSquare";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { setorder } from "@/redux/features/Order";
import CashOut from "@/svg/CashOut";
import PopUpModal from "../Model/PopUpModal";
import ItemsTable from "../layout/ItemsTable";
import ReceiptFooter from "../footer/ReceiptFooter";
import { useAppSelector } from "@/redux/store";
import { useCreateHistoryMutation } from "@/redux/api/history";
import ListBullet from "@/svg/ListBullet";

export default function HistoryCard({
  _id,
  id,
  eatIn,
  price,
  table,
  takeAway,
}: Order) {
  const data = useAppSelector(({ order, paymentMethod }) => ({
    ...order,
    paymentMethod,
  }));
  const [ShowModal, setShowModal] = useState<boolean>(false);
  const [create] = useCreateHistoryMutation();
  const dispatch = useDispatch();
  return (
    <View className="bg-sky-500 py-6 px-8 rounded-2xl flex gap-4">
      <View className="flex-row items-center">
        <Text className="text-white font-bold text-2xl"># {id} </Text>
        <Text className="opacity-90 text-white font-bold text-lg bg-sky-400 px-2 py-1 rounded-xl">
          Table No {table}
        </Text>
      </View>

      {eatIn.length ? (
        <View className="flex-1 bg-bg-sec pl-6 py-4 rounded-2xl">
          <Text className="text-xl font-bold text-white ">
            Eat In ({eatIn.length})
          </Text>
          <ItemList
            items={eatIn}
            add={() => {
              return;
            }}
            className="!w-30"
          >
            {(item: Item) => (
              <View className="flex-row justify-between px-2">
                <Text className="font-bold text-white">x {item.count}</Text>
                <Text className="font-bold text-white">
                  {item.count * Number(item.price)} ฿
                </Text>
              </View>
            )}
          </ItemList>
        </View>
      ) : (
        <></>
      )}
      {takeAway.length ? (
        <View className="flex-1 bg-bg-sec pl-6 py-4 rounded-2xl">
          <Text className="text-xl font-bold text-white ">
            Take Away ({takeAway.length})
          </Text>
          <ItemList
            items={takeAway}
            add={() => {
              return;
            }}
            className="!w-30"
          >
            {(item: Item) => (
              <View className="flex-row justify-between px-2">
                <Text className="font-bold text-white">x {item.count}</Text>
                <Text className="font-bold text-white">
                  {item.count * Number(item.price)} ฿
                </Text>
              </View>
            )}
          </ItemList>
        </View>
      ) : (
        <></>
      )}
      <View className="flex-row justify-between items-center">
        <Text className="text-white font-bold text-2xl">{price}฿</Text>
        <View className="flex-row gap-3">
          <Button
            SVG={ListBullet}
            onClik={() => {
              dispatch(setorder({ _id, id, eatIn, price, table, takeAway }));
              setShowModal(true);
            }}
            text="View"
            disabled={false}
          />
          <PopUpModal
            Close={() => {
              setShowModal(false);
            }}
            modalVisible={ShowModal}
          >
            <ItemsTable />
          </PopUpModal>
        </View>
      </View>
    </View>
  );
}
