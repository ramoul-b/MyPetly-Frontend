import { StyleSheet } from 'react-native';

const MarketplaceStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1D1D1D',
    marginVertical: 15,
    textAlign: 'center',
  },

  itemContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 10,
    margin: 10,
    width: '45%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  itemImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },

  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },

  itemPrice: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default MarketplaceStyles;
