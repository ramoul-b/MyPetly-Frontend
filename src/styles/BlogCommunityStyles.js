import { StyleSheet } from "react-native";
import Theme from "../constants/Theme";

const BlogCommunityStyles = StyleSheet.create({
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
    color: Theme.COLORS.PRIMARY,
    fontWeight: "bold",
  },
  list: {
    paddingVertical: 10,
  },
  articleCard: {
    width: 200,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFF",
    marginRight: 10,
  },
  articleImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 8,
  },
  articleDate: {
    fontSize: 12,
    color: Theme.COLORS.TEXT_SECONDARY,
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  postCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    width: 250,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  postMessage: {
    fontSize: 12,
    color: Theme.COLORS.TEXT_PRIMARY,
  },
  postDate: {
    fontSize: 10,
    color: Theme.COLORS.TEXT_SECONDARY,
  },
});

export default BlogCommunityStyles;
