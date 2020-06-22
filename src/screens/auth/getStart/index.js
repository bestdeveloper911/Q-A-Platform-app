import React, {Fragment, Component, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import CustomButton from '../../../components/CustomButton';

const GetStart = (props) => { 
  const movePage = (item) => {
    props.navigation.navigate(item);
  }

  return (
    <View style={styles.container}>
      <View style={{marginTop: '55%'}}>
        <Text style={styles.textStyle}>
          The Q&A app for
        </Text>
        <Text style={styles.textStyle}>
        learning English.
        </Text>
      </View>
      <CustomButton 
        ButtonStyle={{marginVertical: 15}}
        textValue='Get Started'
        onPress={() => movePage('SubSelect')}
      />
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.login}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => movePage('Login')} style={{marginLeft: 10}}>
          <Text style={styles.login}>
            Log in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default GetStart;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6323E',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40
  },
  textStyle: {
    fontSize: 24, 
    color: '#FFF', 
    fontWeight:'700', 
    fontFamily: 'Arial',
    letterSpacing: 1
  },
  buttonStyle:{
    width: '75%',
    height: 60,
    borderRadius: 18,
    backgroundColor: '#FFF',
    marginVertical: 15,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  login: {
    letterSpacing: 1,
    fontSize: 17,
    color: '#FFF',
    fontWeight:'bold'
  }
});

