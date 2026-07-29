import { useWindowDimensions } from "react-native";

export default function useGetTheme() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  return {
    card_width: isTablet ? 200 : 100,
    numColumns: isTablet ? 3 : 2,
    space: isTablet ? 28 : 12,
    color_bg: "#ebebed",
    width,
  };
}
