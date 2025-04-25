import { StyleSheet } from "react-native";
import Theme from "../../constants/Theme";

const SearchBarStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Theme.COLORS.INPUTBG,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
      },
      input: {
        flex: 1,
        marginLeft: 10,
      },
});

export default SearchBarStyles;
