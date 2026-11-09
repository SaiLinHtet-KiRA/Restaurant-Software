import type { ReactNode } from "react";
import useGetTheme from "@/constants/useGetTheme";
import XMasrk from "@/svg/XMasrk";

type props = {
  modalVisible: string | null | boolean;
  children: ReactNode;
  Close: () => void;
};

export default function PopUpModal({ modalVisible, children, Close }: props) {
  const { color_bg } = useGetTheme();
  if (!modalVisible) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={Close}
    >
      <div className="flex w-full justify-center">
        <div
          onClick={(e) => e.stopPropagation()}
          className="animate-pop-in relative flex max-h-[90vh] w-full max-w-[92vw] flex-col items-center justify-center overflow-auto rounded-2xl p-5 shadow-float ring-1 ring-black/5 sm:max-w-md"
          style={{ backgroundColor: color_bg }}
        >
          <button
            type="button"
            aria-label="Close"
            className="press absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-black/5 p-2 text-slate-700 transition hover:bg-black/10 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            onClick={Close}
          >
            <XMasrk stroke="currentColor" />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
