import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function useGetTheme() {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 600;
  const insets = useSafeAreaInsets();

  return {
    height,
    card_width: isTablet ? 200 : 100,
    numColumns: isTablet ? 3 : 2,
    space: isTablet ? 28 : 12,
    color_bg: "#ebebed",
    width,
    insetsBottom: insets.bottom,
  };
}
