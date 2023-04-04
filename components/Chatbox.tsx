import React, { useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity,ActivityIndicator, Text, ScrollView, Platform,StyleSheet, KeyboardAvoidingView } from 'react-native';
import { storeMessageHistory,getMessageHistory } from '../store';
import axios from 'axios';

type Message = {
  role: string;
  content: string;
}

function handleClear(){
  
}

const ChatBox = () => {
  
  
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const [isSending, setIsSending] = useState(false);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  const day = ('0' + currentDate.getDate()).slice(-2);
  const formattedDate = `${year}-${month}-${day}`;
  
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: `You are a helpful assistant called ChatGenius Pro. Answer as concisely and friendly possible. To save token try to avoid unnecessary repetition. If you cannot help with a question, try to avoid sounding like an AI. Knowledge cutoff: 2021 Current date: ${formattedDate}` }
  ]);
  

  
  const handleSend = async () => {
    try {
      let storedMessages = await getMessageHistory();
      if(( storedMessages).length){
          setMessages(storedMessages)
      }
      if (inputText !== '') {
        const newMessage: Message = { role: 'user', content: inputText };
        const newMessages: Message[] = [...messages, newMessage];
        setMessages(newMessages);
        setInputText('');
        setIsSending(true);
        const response = await axios.post(`https://beige-bighorn-sheep-shoe.cyclic.app/api/message`, {
          messageHistory: JSON.stringify(newMessages),
        });
        
        const aiResponse = response.data.aiResponse;
        const newAiMessage: Message = { role: 'assistant', content: aiResponse };
        const updatedMessages: Message[] = [...newMessages, newAiMessage];
        
        // Update messages and inputText state
        setMessages(updatedMessages);
        setInputText('');
  
        // Save the updated message history
        await storeMessageHistory(updatedMessages);
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setIsSending(false);
    }
  
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };
  

  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={styles.content}>
      <ScrollView
  contentContainerStyle={styles.scrollViewContent}
  ref={scrollViewRef}
  onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
>
  {messages.map((message, index) => {
    if (message.role !== 'user' && message.role !== 'assistant') {
      return null;
    }
    
    return message.role === 'user' ? (
      <View
        key={index}
        style={[
          styles.messageContainer,
          { alignSelf: 'flex-end', marginRight: 16 },
          styles.userMessageContainer,
        ]}
      >
        <Text style={styles.userMessageText}>{message.content}</Text>
      </View>
    ) : (
      <View
        key={index}
        style={[
          styles.messageContainer,
          { alignSelf: 'flex-start', marginLeft: 16 },
          styles.assistantMessageContainer,
        ]}
      >
        <Text style={styles.assistantMessageText}>{message.content}</Text>
      </View>
    );
  })}
</ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message here"
          />
          {isSending ? (
            <View style={styles.typingContainer}>
              <Text style={styles.typingText}>Assistant is typing...</Text>
              <ActivityIndicator size="small" color="#4287f5" />
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleSend}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
  },
  messageContainer: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '90%',
  },
  userMessageContainer: {
    backgroundColor: '#0A192F',
  },
  userMessageText: {
    color: '#F2AA4CFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  assistantMessageContainer: {
    backgroundColor: '#F2AA4CFF',
  },
  assistantMessageText: {
    color: '#0A192F',
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
  },
  input: {
    flex: 1,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 8,
    padding: 8,
    fontSize: 24,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingText: {
    marginRight: 8,
    fontSize: 16,
    color: '#4287f5',
  },
  button: {
    backgroundColor: '#4287f5',
    padding: 8,
    borderRadius: 8,
    fontSize: 30
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  }
});

export default ChatBox;
