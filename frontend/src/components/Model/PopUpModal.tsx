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
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
      <div className="w-screen flex justify-center items-center p-4">
        <div
          className="relative flex flex-col justify-center items-center rounded-xl max-w-[90vw] max-h-[90vh] overflow-auto p-4"
          style={{ backgroundColor: color_bg }}
        >
          <button
            type="button"
            className="absolute block size-8 top-3 right-3 z-10"
            onClick={Close}
          >
            <XMasrk stroke="black" />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
