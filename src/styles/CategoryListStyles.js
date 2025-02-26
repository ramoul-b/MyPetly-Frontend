import { StyleSheet } from "react-native";
import Theme from "../constants/Theme";

const CategoryListStyles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.SPACING.MEDIUM,
    marginVertical: Theme.SPACING.SMALL,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.SPACING.SMALL,
  },
  title: {
    fontSize: Theme.FONTS.LARGE,
    fontWeight: "bold",
    color: Theme.COLORS.TEXT_PRIMARY,
  },
  seeAll: {
    fontSize: 14,
    color: '#6D9EEB',
    fontWeight: 'bold',
  },
  list: {
    paddingVertical: 10,
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 25, // Forme ovale
    marginRight: 10,
    borderWidth: 1.5,
    backgroundColor: "#F5F5F5", // Fond léger pour le contraste
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default CategoryListStyles;
