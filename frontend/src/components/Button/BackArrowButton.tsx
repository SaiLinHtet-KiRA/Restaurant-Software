import { useNavigate } from "react-router-dom";
import Arrow from "@/svg/Arrow";

export default function BackArrowButton() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="block ml-2 md:ml-4 size-10 md:size-15 "
    >
      <Arrow stroke="black" />
    </button>
  );
}
