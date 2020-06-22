import React, {Fragment, Component, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Thanks = (props) => {
  useEffect(() => {
    props.navigation.navigate('Auth');
  },[])

  const movePage = (item) => {
    props.navigation.navigate(item);
  }

  return (
    <View style={styles.container}>   
      <TouchableOpacity onPress={() => movePage('Login')} style={{position:'absolute', right: 15, top:15}}>
        <Fontisto name='close-a' size={30} color='#FFF'/>
      </TouchableOpacity>
      <View style={{marginTop: '50%'}}>
        <Text style={styles.titleStyle}>
          Thanks for signing up!
        </Text>
        <Text style={styles.bodyStyle}>
            Your account is pending. Yolingo will contact you shortly to go through a quick verification process.
        </Text>      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6323E',
    alignItems: 'center',
    paddingHorizontal: 40
  },
  titleStyle: {
    fontSize: 20, 
    color: '#FFF', 
    fontWeight:'700', 
    textAlign: 'center',
    fontFamily: 'Arial',
    letterSpacing: 1,
    marginBottom: 40
  },
  bodyStyle: {
    fontSize: 16, 
    color: '#FFF', 
    fontWeight:'700', 
    fontFamily: 'Arial',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 30
  }
});

export default Thanks;
