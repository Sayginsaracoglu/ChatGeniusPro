import React from 'react';
import { StyleSheet, View, Text} from 'react-native';


interface NavbarProps {
  title: string;
  
}

const Navbar = ({ title }: NavbarProps) => {
  return (
    <View style={styles.container}>
      
        
      
      <Text style={styles.title}>{title}</Text>
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0c2340',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 125,
    paddingHorizontal: 16,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Navbar;
