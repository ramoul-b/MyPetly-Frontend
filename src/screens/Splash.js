import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import SplashScreen from "react-native-splash-screen";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      navigation.replace("HomeScreen");
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("./assets/images/background.png")} style={styles.background} />
      
      {/* Animation des icônes */}
      {[1, 2, 3, 4, 5, 6].map((num, index) => (
        <Animatable.Image
          key={index}
          animation="fadeInUp"
          delay={index * 300}
          source={require(`./assets/images/icon-${num}.png`)}
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
