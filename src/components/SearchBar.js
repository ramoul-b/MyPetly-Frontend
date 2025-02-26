// src/components/SearchBar.js
import React from "react";
import { View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import InputStyles from "../styles/InputStyles";

const SearchBar = () => {
  return (
    <View style={InputStyles.container}>
      <Icon name="search" size={20} color="#888" />
      <TextInput
        style={InputStyles.input}
        placeholder="Search for doctor, hospital and vaccine"
        placeholderTextColor="#888"
      />
    </View>
  );
};

export default SearchBar;
