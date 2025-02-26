import { StyleSheet } from "react-native";
import Theme from "../constants/Theme";

const ShoppingCategoriesStyles = StyleSheet.create({
    container: { 
        paddingHorizontal: Theme.SPACING.MEDIUM, 
        marginVertical: Theme.SPACING.SMALL,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Theme.SPACING.SMALL,
    },
    title: { 
        fontSize: Theme.FONTS.LARGE, 
        fontWeight: Theme.FONTS.BOLD,
        color: Theme.COLORS.TEXT_PRIMARY, 
    },
    seeAll: { 
        fontSize: Theme.FONTS.MEDIUM, 
        color: Theme.COLORS.TEXT_SECONDARY, 
        fontWeight: Theme.FONTS.BOLD,
    },
    list: { 
        paddingVertical: Theme.SPACING.SMALL,
    },
    category: {
        alignItems: 'center',
        padding: Theme.SPACING.SMALL,
        borderRadius: 10,
        marginRight: Theme.SPACING.SMALL,
        width: 90,
        backgroundColor: Theme.COLORS.PRIMARY, // Option : Couleur de fond par défaut
    },
    text: { 
        fontSize: Theme.FONTS.MEDIUM, 
        fontWeight: Theme.FONTS.BOLD, 
        color: Theme.COLORS.SECONDARY, 
        marginTop: Theme.SPACING.SMALL,
    },
});

export default ShoppingCategoriesStyles;
