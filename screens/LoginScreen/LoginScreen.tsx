import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';



const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const validateForm = () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regular expression to validate email address

    setEmail(email.trim());

    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return false;
    }
    if (password === "") {
      Alert.alert("Please enter your password");
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (validateForm()) {
      fetch("https://beige-bighorn-sheep-shoe.cyclic.app/api/login", {
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

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (validateForm()) {
            handleLogin();
            // Handle successful login here
          }
        }}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{
          navigation.navigate('SignUp');
      }}>
        <Text style={styles.smallText}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff'
    },
    logo: {
      fontWeight: 'bold',
      fontSize: 50,
      color: '#fb5b5a',
      marginBottom: 40
    },
    inputView: {
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 25,
      height: 50,
      marginBottom: 20,
      justifyContent: 'center',
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12
    },
    inputText: {
      height: 50,
      color: 'black'
    },
    forgot: {
      color: '#003f5c',
      fontSize: 12
    },
    loginBtn: {
      width: '80%',
      backgroundColor: '#003f5c',
      borderRadius: 25,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 10
    },
    loginText: {
      color: 'white'
    },
    signupBtn: {
      width: '80%',
      backgroundColor: '#003f5c',
      borderRadius: 25,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10
    },
    signupText: {
      color: 'white'
    },
    smallText: {
      color: 'gray',
      fontSize: 12,
      marginTop: 10,
      marginBottom: 10
    }
  });
  
  export default LoginScreen;
