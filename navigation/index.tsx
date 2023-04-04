import React, { useState } from "react";
import {View , Text} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from "../screens/MainScreen";


const Stack = createNativeStackNavigator();

const Navigation = () =>{
    
    
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="Main" component={MainScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default Navigation;