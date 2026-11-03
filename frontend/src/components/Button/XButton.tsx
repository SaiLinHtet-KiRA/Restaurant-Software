import clsx from "clsx";
import XMasrk from "@/svg/XMasrk";

type Props = {
  className?: string;
  text: string;
  onClik: () => void;
};

export default function XButton({ text, onClik, className }: Props) {
  return (
    <button
      type="button"
      className={clsx(
        "flex flex-row items-center px-2 py-1.5 rounded-lg bg-red-600",
        className,
      )}
      onClick={onClik}
    >
      <span className="block w-5 h-5 ">
        <XMasrk stroke="white" />
      </span>
      <span className="font-bold text-sm text-white">{text}</span>
    </button>
  );
}
