import { useEffect, useState } from "react";

export default function useGetTheme() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const onResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { width, height } = size;
  const isTablet = width >= 600;

  return {
    height,
    card_width: isTablet ? 200 : 100,
    numColumns: isTablet ? 3 : 2,
    space: isTablet ? 28 : 12,
    color_bg: "#ebebed",
    width,
    insetsBottom: 0,
  };
}
