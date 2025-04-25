import { StyleSheet } from "react-native";
import Theme from "../../constants/Theme";

const ReminderBarStyles = StyleSheet.create({
  container: {
    backgroundColor: Theme.COLORS.Reminder,  // Assorti au header
    paddingVertical: 0,
    paddingHorizontal: 16,
    borderRadius: 0,
    marginHorizontal: 0,
    marginBottom: 10,
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  reminderText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default ReminderBarStyles;
