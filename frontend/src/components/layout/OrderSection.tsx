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
    <div className="flex flex-col gap-4 px-4 sm:px-6">
      <div className="flex flex-row items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-white/70">
          Table No
        </span>
        <span className="rounded-xl bg-white/20 px-3 py-1.5 text-base font-bold text-white backdrop-blur-sm">
          {order.table}
        </span>
      </div>
      {order.table !== "Take Away" && (
        <div className="panel">
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

      <div className="panel">
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
