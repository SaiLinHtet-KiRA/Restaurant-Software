import clsx from "clsx";
import Table from "@/svg/Table";
import XButton from "../Button/XButton";

type prop = {
  number: number;
  onClick?: () => void;
  className?: string;
};

export default function TableCard({ number, onClick, className }: prop) {
  return (
    <div
      className={clsx(
        "group relative aspect-square w-full overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-float",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-sky-900/40 via-black/55 to-black/70">
        <Table stroke="none" className="opacity-90 transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="absolute top-2 left-2 rounded-xl bg-white/90 px-2.5 py-1 shadow-sm backdrop-blur-sm">
        <span className="text-sm font-bold text-slate-800">#{number}</span>
      </div>
      {onClick && (
        <XButton
          text="Remove"
          onClik={onClick}
          className="absolute bottom-2.5 right-2.5"
        />
      )}
    </div>
  );
}
