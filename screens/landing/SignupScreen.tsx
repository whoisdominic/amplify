import { Auth } from "aws-amplify";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function SignupScreen({ navigation }) {
  const [error, setError] = useState(null);
  const [userData, setuserData] = useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
  });
  const [twoFactor, setTwoFactor] = useState(false);

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
      const signupCall = await Auth.signUp({
        username: userData.email,
        password: userData.password,
        attributes: {
          email: userData.email,
        },
      });
      console.log("signup call", signupCall);
      setTwoFactor(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTwoFactor = async (factorCode) => {
    console.log(factorCode);
    try {
      const twoFactorCall = await Auth.confirmSignUp(
        userData.email,
        factorCode
      );
      console.log(twoFactorCall);
      /* Once the user successfully confirms their account, update form state to show the sign in form*/
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView />
      <View style={styles.form}>
        <View style={styles.action}>
          <Text style={styles.formTxt}>Email</Text>

          <TextInput
            placeholder={"Enter Email"}
            placeholderTextColor="#FFFFFF"
            maxLength={20}
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
            Signup
          </Text>
        </TouchableOpacity>

        {/* {twoFactor ? <></> : <> </>} */}
      </View>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnTxt} onPress={() => navigation.goBack()}>
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  btn: {
    backgroundColor: "#212121",
    width: width * 0.75,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
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
