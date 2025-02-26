// src/styles/HomeStyles.js
import { StyleSheet } from "react-native";
import Theme from "../constants/Theme";

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.COLORS.BACKGROUND,
  },
  scrollView: {
    paddingHorizontal: Theme.SPACING.NONE,
  },
});

export default HomeStyles;
