import { useState } from "react";
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
    <div className="relative">
      {open && (
        <div className="absolute bottom-[105%] left-0 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden z-50">
          {PaymentMethods.map((method) => (
            <button
              type="button"
              key={method.name}
              className={`block w-full text-left px-4 py-2 ${
                method.name === selected ? "bg-sky-100" : "bg-white"
              }`}
              onClick={() => {
                dispatch(setSelected(method.name));
                setOpen(false);
              }}
            >
              <span
                className={`text-sm ${
                  method.name === selected
                    ? "text-bg-sec font-semibold"
                    : "text-black"
                }`}
              >
                {method.name}
              </span>
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        className="bg-bg-sec flex flex-row items-center gap-1 px-3 py-2 rounded-lg"
        onClick={handleToggle}
      >
        <span className="text-white text-[14px] font-semibold">{selected}</span>
        {open ? (
          <span className="block size-4 rotate-90">
            <Arrow stroke="white" strokeWidth={3} />
          </span>
        ) : (
          <span className="block size-4 -rotate-90">
            <Arrow stroke="white" strokeWidth={3} />
          </span>
        )}
      </button>
    </div>
  );
}
