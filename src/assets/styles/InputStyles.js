// src/styles/InputStyles.js
import { StyleSheet } from "react-native";
import Theme from "../../constants/Theme";

const InputStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Theme.COLORS.INPUTBG,
    borderRadius: 10,
    padding: Theme.SPACING.SMALL,
    alignItems: "center",
    marginVertical: Theme.SPACING.SMALL,
    marginHorizontal: Theme.SPACING.SMALL,
  },
  input: {
    flex: 1,
    marginLeft: Theme.SPACING.SMALL,
    fontSize: Theme.FONTS.MEDIUM,
    color: Theme.COLORS.TEXT_PRIMARY,
  },
});

export default InputStyles;
