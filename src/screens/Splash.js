import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import SplashScreen from "react-native-splash-screen"; // Import du package
import * as Animatable from "react-native-animatable";
import { CommonActions } from "@react-navigation/native";

const pawIcons = [
  require("../assets/imgs/icon-1.png"),
  require("../assets/imgs/icon-2.png"),
  require("../assets/imgs/icon-3.png"),
  require("../assets/imgs/icon-4.png"),
  require("../assets/imgs/icon-5.png"),
  require("../assets/imgs/icon-6.png"),
];

const pawPositions = [
  { top: 500, left: 150 },
  { top: 450, left: 180 },
  { top: 400, left: 160 },
  { top: 350, left: 190 },
  { top: 300, left: 170 },
  { top: 250, left: 200 },
];

const Splash = ({ navigation }) => {


  return (
    <View style={styles.container}>
      <Image source={require("../assets/imgs/Loader.png")} style={styles.background} />
      
      {/* Animation des empreintes de pattes */}
      {pawIcons.map((icon, index) => (
        <Animatable.Image
          key={index}
          animation={{
            from: { opacity: 0, translateY: 20 },
            to: { opacity: 1, translateY: 0 },
          }}
          delay={index * 400} // Délais progressifs pour un effet réaliste
          source={icon}
          style={[styles.pawIcon, pawPositions[index]]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#004AAD",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  pawIcon: {
    position: "absolute",
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});

export default Splash;
