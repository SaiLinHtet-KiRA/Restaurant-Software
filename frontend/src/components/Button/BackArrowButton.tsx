import { useNavigate } from "react-router-dom";
import Arrow from "@/svg/Arrow";

export default function BackArrowButton() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      aria-label="Go back"
      onClick={() => navigate(-1)}
      className="press ml-1 flex size-10 items-center justify-center rounded-full text-slate-900 transition hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
    >
      <span className="block size-6">
        <Arrow stroke="currentColor" />
      </span>
    </button>
  );
}
