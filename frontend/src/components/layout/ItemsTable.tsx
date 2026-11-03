import { useAppSelector } from "@/redux/store";
import useGetTheme from "@/constants/useGetTheme";
import type Item from "@/interface/Item";
import clsx from "clsx";

export default function ItemsTable() {
  const order = useAppSelector(({ order }) => order);
  const { width } = useGetTheme();
  return (
    <div className="p-3 flex flex-col gap-3" style={{ width: width * 0.8 }}>
      <div>
        <span className="text-xl">Tabel No - {order.table}</span>
      </div>
      {order.eatIn.length ? (
        <div className="flex flex-col">
          <span className="font-semibold">Eat In</span>
          <div className="flex flex-col">
            {order.eatIn.map((item, index) => (
              <TableRow
                key={item._id}
                {...item}
                className={index % 2 ? "bg-[rgba(0,0,0,0.1)]" : ""}
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}

      {order.takeAway.length ? (
        <div className="flex flex-col">
          <span className="font-semibold">Take Away</span>
          <div className="flex flex-col">
            {order.takeAway.map((item, index) => (
              <TableRow
                key={item._id}
                {...item}
                className={index % 2 ? "bg-[rgba(0,0,0,0.1)]" : ""}
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

const TableRow = ({
  name,
  photo_url,
  count,
  price,
  className,
}: Item & {
  className: string;
}) => {
  return (
    <div
      className={clsx(
        "flex-1 flex flex-row justify-between items-center p-2",
        className,
      )}
    >
      <div className="block size-10 aspect-square relative ">
        <img
          src={photo_url}
          alt={name}
          className="absolute size-full object-center rounded-lg"
        />
      </div>
      <span>{name}</span>
      <span>{price}฿</span>
      <span>x{count}</span>
      <span>{count * Number(price)}฿</span>
    </div>
  );
};
