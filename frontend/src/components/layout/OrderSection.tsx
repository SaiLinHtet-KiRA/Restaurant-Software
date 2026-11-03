import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/store";
import ItemList from "./ItemList";
import type Item from "@/interface/Item";
import ItemCardAddFooter from "../footer/ItemCardAddFooter";
import InputItemSectionHeader from "./InputItemSectionHeader";

export default function OrderSection() {
  const order = useAppSelector(({ order }) => order);
  const navigate = useNavigate();

  return (
    <div className="px-6 flex flex-col gap-5">
      <div className="flex flex-row items-center gap-2">
        <span className="text-xl font-bold text-white">Table No: </span>
        <span className="text-2xl font-bold text-white px-3.5 py-2 bg-[rgba(0,0,0,0.15)] rounded-2xl">
          {order.table}
        </span>
      </div>
      {order.table !== "Take Away" && (
        <div className="bg-bg-sec px-4 py-6 rounded-xl outline-2 outline-white/30 ">
          <InputItemSectionHeader
            name={"Eat In"}
            size={order?.eatIn.length}
            _id={""}
          />
          <ItemList
            items={order!.eatIn}
            add={() => navigate("/add/eat-in")}
            header={<></>}
          >
            {(item: Item) => (
              <ItemCardAddFooter
                item={item}
                Type="eat-in"
                key={"eat-" + item._id}
              />
            )}
          </ItemList>
        </div>
      )}

      <div className="bg-bg-sec px-4 py-6 rounded-xl outline-2 outline-white/30 ">
        <InputItemSectionHeader
          name={"Take Away"}
          size={order?.takeAway.length}
          _id={""}
        />
        <ItemList
          items={order!.takeAway}
          add={() => navigate("/add/take-away")}
          header={<></>}
        >
          {(item: Item) => (
            <ItemCardAddFooter
              item={item}
              Type="take-away"
              key={"take-" + item._id}
            />
          )}
        </ItemList>
      </div>
    </div>
  );
}
