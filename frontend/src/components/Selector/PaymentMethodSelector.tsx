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
        <div className="animate-pop-in absolute bottom-[108%] left-0 z-50 min-w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card">
          {PaymentMethods.map((method) => (
            <button
              type="button"
              key={method.name}
              className={`flex w-full items-center justify-between gap-6 px-4 py-2.5 text-left transition-colors hover:bg-sky-50 ${
                method.name === selected ? "bg-sky-50" : "bg-white"
              }`}
              onClick={() => {
                dispatch(setSelected(method.name));
                setOpen(false);
              }}
            >
              <span
                className={`text-sm ${
                  method.name === selected
                    ? "font-semibold text-sky-700"
                    : "text-slate-700"
                }`}
              >
                {method.name}
              </span>
              {method.name === selected ? (
                <span className="text-sky-600">✓</span>
              ) : null}
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        className="press flex h-10 flex-row items-center gap-1.5 rounded-xl bg-bg-sec px-3 shadow-soft transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
        onClick={handleToggle}
      >
        <span className="text-sm font-semibold text-white">{selected}</span>
        {open ? (
          <span className="block size-3.5 rotate-90">
            <Arrow stroke="white" strokeWidth={3} />
          </span>
        ) : (
          <span className="block size-3.5 -rotate-90">
            <Arrow stroke="white" strokeWidth={3} />
          </span>
        )}
      </button>
    </div>
  );
}
