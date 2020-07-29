import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import CustomBlueButton from '../../components/CustomBlueButton';

const ZoomToday = (props) => {
  const closePage = () => {
    const back = props.navigation.getParam('backpage');
    if (back == 'payment'){
      props.navigation.navigate('Payment')
    } else {
      props.navigation.goBack()
    }
  }
  const onPress = () => {
    props.navigation.navigate('ZoomClock');
  }
  return (
    <View style={styles.container}>      
      <TouchableOpacity onPress={() => closePage()} style={{position:'absolute', right: 15, top:15}}>
        <Fontisto name='close-a' size={30} color='#000'/>
      </TouchableOpacity>
      <Text style={styles.textStyle}>
        The earliest time you can have a tuition session is 30 minutes from now.
      </Text>
      <CustomBlueButton title='Continue' onPress={onPress}/>
    </View>
  );
}

export default ZoomToday;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  textStyle: {
    fontSize: 20,
    color: '#000', 
    textAlign: 'center',
    fontFamily: 'notoserif',
    fontWeight: 'bold',
    marginHorizontal: 50,
    lineHeight: 30,
    marginTop: 150,
    marginBottom: 30
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
