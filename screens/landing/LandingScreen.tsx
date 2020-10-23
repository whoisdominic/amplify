import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

export default function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <LottieView
        source={require("../../assets/lottie/15006-amazon-animated-logo.json")}
        autoPlay
        loop={false}
        speed={0.5}
        onAnimationFinish={() => navigation.navigate("Login")}
        style={{ marginBottom: 100 }}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <View style={styles.btn}>
          <Text style={styles.btnTxt}>Ready</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  btn: {
    backgroundColor: "#212121",
    width: width * 0.75,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 150,
  },
  btnTxt: {
    fontSize: 28,
    color: "#FFFFFF",
  },
});
