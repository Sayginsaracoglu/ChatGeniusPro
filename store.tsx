import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

type Message = {
  role: string;
  content: string;
}


// Store the messageHistory
export async function storeMessageHistory(messageHistory: Message[]) {
  try {
    await AsyncStorage.setItem('messageHistory', JSON.stringify(messageHistory));
  } catch (error) {
    console.log(error);
  }
}

// Retrieve the messageHistory
export async function getMessageHistory(): Promise<Message[]> {
  try {
    const messageHistory = await AsyncStorage.getItem('messageHistory');
    return messageHistory !== null ? JSON.parse(messageHistory) : [];
  } catch (error) {
    console.log(error);
    return [];
  }
}
