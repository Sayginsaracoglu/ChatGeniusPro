
import React from 'react';
import { Text, Button,View ,StyleSheet} from 'react-native';
import Navigation from './navigation';




function App(): JSX.Element {
 
  

  return (
    
    <View style={styles.mainView}>
    <Navigation/>
    {/* <Navbar title="Chatgenius Pro" />
    <ChatBox /> */}
    {/* <SignUpScreen></SignUpScreen> */}
    {/* <LoginScreen></LoginScreen> */}
    </View>
  );
    
  
}

const styles = StyleSheet.create({
  mainView:{
    marginTop:0,
    flex:1
  }
})


export default App;
