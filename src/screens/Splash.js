import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import SplashScreen from "react-native-splash-screen"; // Import du package
import * as Animatable from "react-native-animatable";


const pawIcons = [
  require("../assets/imgs/icon-1.png"),
  require("../assets/imgs/icon-2.png"),
  require("../assets/imgs/icon-3.png"),
  require("../assets/imgs/icon-4.png"),
  require("../assets/imgs/icon-5.png"),
  require("../assets/imgs/icon-6.png"),
];

const Splash = ({ navigation }) => {
  useEffect(() => {
    SplashScreen.hide();
    setTimeout(() => {
      navigation.replace("Main"); // Redirige vers Main après 3s
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/imgs/Loader.png")} style={styles.background} />
      
      {/* Animation des pattes */}
      {pawIcons.map((icon, index) => (
        <Animatable.Image
          key={index}
          animation="fadeInUp"
          delay={index * 300}
          source={icon}
          style={[styles.pawIcon, { top: index * 50 + 100, left: index * 30 + 80 }]}
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
