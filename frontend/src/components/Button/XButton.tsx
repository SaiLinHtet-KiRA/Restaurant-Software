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
        "press inline-flex h-8 flex-row items-center gap-1 rounded-lg bg-red-600 px-2.5 shadow-sm hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700",
        className,
      )}
      onClick={onClik}
    >
      <span className="block size-4">
        <XMasrk stroke="white" />
      </span>
      <span className="text-xs font-bold text-white">{text}</span>
    </button>
  );
}
