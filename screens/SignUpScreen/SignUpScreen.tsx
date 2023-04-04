import React, { useState } from "react";
import { View, Text, StyleSheet,Modal, TextInput, TouchableOpacity,Alert } from "react-native";
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import PrivacyPolicyModal from "../../components/PrivacyPolicy";

const SignUpScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();



    const validateForm = () => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regular expression to validate email address
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;

        setEmail(email.trim());

        if (!emailRegex.test(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return false;
          }
          if (!passwordRegex.test(password)) {
            Alert.alert("Password must be at least 8 characters with at least one uppercase letter, one special character, and one digit");
            return false;
          }
        if (confirmPassword === "") {
            Alert.alert("Please confirm your password");
          return false;
        }
        if (password !== confirmPassword) {
            Alert.alert("Passwords do not match");
          return false;
        }
        return true;
      };

      const handleSignUp = () => {
        if (validateForm()) {
          fetch("https://beige-bighorn-sheep-shoe.cyclic.app/api/signup", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          })
            .then((response) => response.json())
            .then((json) => {
              navigation.navigate('Main');
            })
            .catch((error) => {
              Alert.alert("Error", error.message);
            });
        }
      };
      
    const [privacyPolicyVisible, setPrivacyPolicyVisible] = useState(false);

  const handlePrivacyPolicyPress = () => {
    setPrivacyPolicyVisible(true);
  };

  const handlePrivacyPolicyClose = () => {
    setPrivacyPolicyVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ChatGenius</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
      
      <TouchableOpacity
  style={styles.signupBtn}
  onPress={() => {
    if (validateForm()) {
        Alert.alert('succsefully signed')
        handleSignUp();
      // Handle successful form submission here
    }
  }}
>
  <Text style={styles.signupText}>SIGN UP</Text>
</TouchableOpacity>
    <TouchableOpacity onPress={handlePrivacyPolicyPress}>
      <Text style={styles.smallText}>
        By signing up, you accept our Privacy Policy and Terms of Use.
      </Text>
    </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
          navigation.navigate('Login');
      }}>
        <Text style={styles.smallText}>Already have an account? Login</Text>
      </TouchableOpacity>
      <PrivacyPolicyModal
        isVisible={privacyPolicyVisible}
        onClose={handlePrivacyPolicyClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  signupBtn: {
    width: "80%",
    backgroundColor: "#003f5c",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  signupText: {
    color: "white",
  },
  smallText: {
    color: "gray",
    fontSize: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  
});

export default SignUpScreen;
