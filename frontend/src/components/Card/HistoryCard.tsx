import { useState } from "react";
import type Order from "@/interface/Order";
import { useDispatch } from "react-redux";
import { setorder } from "@/redux/features/Order";
import Button from "../Button/Button";
import PopUpModal from "../Model/PopUpModal";
import ItemsTable from "../layout/ItemsTable";
import ListBullet from "@/svg/ListBullet";
import BaseCard from "../layout/BaseCard";

export default function HistoryCard(order: Order) {
  const [ShowModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  return (
    <>
      <BaseCard {...order}>
        <Button
          SVG={ListBullet}
          onClik={() => {
            dispatch(setorder(order));
            setShowModal(true);
          }}
          text="View"
          disabled={false}
        />
      </BaseCard>
      <PopUpModal
        Close={() => {
          setShowModal(false);
        }}
        modalVisible={ShowModal}
      >
        <ItemsTable />
      </PopUpModal>
    </>
  );
}
