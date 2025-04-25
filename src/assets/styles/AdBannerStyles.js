import { StyleSheet } from "react-native";
import Theme from "../../constants/Theme";

const AdBannerStyles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.SPACING.MEDIUM,
    marginVertical: Theme.SPACING.SMALL,
  },
  banner: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: Theme.COLORS.SECONDARY,
  },
});

export default AdBannerStyles;
