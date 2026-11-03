import Table from "@/svg/Table";
import XButton from "../Button/XButton";

type prop = {
  number: number;
  onClick?: () => void;
};

export default function TableCard({ number, onClick }: prop) {
  return (
    <div className="relative bg-white w-42 md:w-60 aspect-square rounded-2xl overflow-hidden ml-3">
      <div className="absolute inset-0 bg-black/55">
        <Table stroke="none" />
      </div>
      <div className="absolute top-2 left-2 bg-white/80 px-3 py-1.5 rounded-2xl">
        <span className="font-bold">#{number}</span>
      </div>
      {onClick && (
        <XButton
          text="Remove"
          onClik={onClick}
          className="absolute bottom-2 right-2"
        />
      )}
    </div>
  );
}
