import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import CustomBlueButton from '../../components/CustomBlueButton';

const freeTrial = (props) => {
  const onPress = () => {
    props.navigation.navigate('ANSWERS');
  }
  return (
    <View style={styles.container}>      
      <TouchableOpacity onPress={() => onPress()} style={{position:'absolute', right: 15, top:15}}>
        <Fontisto name='close-a' size={30} color='#000'/>
      </TouchableOpacity>
      <Image source={require('../../assets/images/headerlogo.png')} style={{marginTop: 150, marginBottom: 30}}/>
      <Text style={styles.textStyle}>
        After the 3-day free trial your monthly subscription will automatically start.
      </Text>
      <Text style={[styles.textStyle]}>
        Should you not wish to subscribe to Yolingo GO! after the trial then please follow the cancellation steps in the terms of service.
      </Text>
      <CustomBlueButton title='Continue' onPress={onPress}/>
    </View>
  );
}

export default freeTrial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  textStyle: {
    fontSize: 18,
    color: '#000', 
    textAlign: 'center',
    fontFamily: 'notoserif',
    marginHorizontal: 25,
    marginBottom: 30,
  }, 
  flag: {
    width: 100, 
    height: 60, 
    borderWidth: 1,
    borderColor: '#000', 
    marginHorizontal: 3, 
    marginVertical: 3
  }
});
