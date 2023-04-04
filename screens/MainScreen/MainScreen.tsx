import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Alert } from "react-native";
import ChatBox from "../../components/Chatbox";
import Navbar from "../../components/Navbar";
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';


const MainScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();


    return(
        <View style={styles.mainView}>
            <Navbar title={"ChatGenius Pro"}/>
            <ChatBox></ChatBox>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView:{
      marginTop:0,
      flex:1
    }
  })

  export default MainScreen;