import { useState } from "react";
import type Order from "@/interface/Order";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setorder } from "@/redux/features/Order";
import { useCreateHistoryMutation } from "@/redux/api/history";
import { useAppSelector } from "@/redux/store";
import Button from "../Button/Button";
import PencilSquare from "@/svg/PencilSquare";
import CashOut from "@/svg/CashOut";
import PopUpModal from "../Model/PopUpModal";
import ItemsTable from "../layout/ItemsTable";
import ReceiptFooter from "../footer/ReceiptFooter";
import BaseCard from "../layout/BaseCard";

export default function OrderCard(Order: Order) {
  const order = useAppSelector(({ order }) => order);
  const paymentMethod = useAppSelector(({ paymentMethod }) => paymentMethod);
  const [ShowModal, setShowModal] = useState<boolean>(false);
  const [create] = useCreateHistoryMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <BaseCard {...Order}>
        <Button
          SVG={PencilSquare}
          onClik={() => {
            dispatch(setorder(Order));
            navigate("/order/update");
          }}
          text="Edit"
          disabled={false}
        />
        <Button
          SVG={CashOut}
          onClik={() => {
            dispatch(setorder(Order));
            setShowModal(true);
          }}
          className="bg-emerald-400!"
          text="Cash Out"
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
        <ReceiptFooter
          closeModal={async () => {
            try {
              await create({ ...order, paymentMethod }).unwrap();
              setShowModal(false);
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </PopUpModal>
    </>
  );
}
