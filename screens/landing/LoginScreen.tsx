import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function LoginScreen({ navigation }) {
  const [error, setError] = useState(null);
  const [userData, setuserData] = useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const handleEmailInput = (val: any) => {
    if (val.length !== 0) {
      setuserData({
        ...userData,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setuserData({
        ...userData,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordInput = (val: any) => {
    setuserData({
      ...userData,
      password: val,
    });
  };

  const handleSubmit = () => {
    console.log(userData);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.form}>
        <View style={styles.action}>
          <Text style={styles.formTxt}>Email</Text>
          <TextInput onChangeText={handleEmailInput} style={styles.formInput} />
        </View>
        <View style={styles.action}>
          <Text style={styles.formTxt}>Password</Text>
          <TextInput
            onChangeText={handlePasswordInput}
            secureTextEntry={true}
            style={styles.formInput}
          />
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnTxt} onPress={handleSubmit}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => navigation.navigate("Signup")}
      >
        <View style={styles.btn}>
          <Text style={styles.btnTxt}>Signup</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  btn: {
    backgroundColor: "#212121",
    width: width * 0.75,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: {
    fontSize: 28,
    color: "#FFFFFF",
  },
  form: {
    height: height * 0.5,
  },
  formTxt: {
    fontSize: 28,
    color: "#212121",
    textAlign: "center",
  },
  action: {
    marginVertical: 25,
  },
  formInput: {
    width: width * 0.75,
    height: 55,
    backgroundColor: "#212121",
    borderRadius: 25,
    marginVertical: 25,
    textAlign: "center",
  },
});
