import { Auth } from "aws-amplify";
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

  const handleSubmit = async () => {
    console.log(userData);
    try {
      const signInCall = await Auth.signIn(userData.email, userData.password);
      console.log(signInCall);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.form}>
        <View style={styles.action}>
          <Text style={styles.formTxt}>Email</Text>
          <TextInput
            placeholder={"Enter Email"}
            placeholderTextColor="#FFFFFF"
            maxLength={50}
            onChangeText={handleEmailInput}
            style={styles.formInput}
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.formTxt}>Password</Text>
          <TextInput
            placeholder={"Enter Password"}
            placeholderTextColor="#FFFFFF"
            maxLength={15}
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
          <Text style={styles.btnTxt}>Need an account?</Text>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
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
    color: "#FFFFFF",
    borderRadius: 25,
    marginVertical: 25,
    textAlign: "center",
  },
});
