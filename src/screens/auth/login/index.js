import React, {Fragment, Component, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';


const Login = (props) => {
 
  const movePage = (item) => {
    props.navigation.navigate(item)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backbuttonStyle}>
        <Fontisto name='angle-left' color='#FFF' size={28}/>
      </TouchableOpacity>
      <View style={{ marginTop: 60, marginBottom: 25}}>
        <Text style={styles.topTextStyle}>
          Log in with...
        </Text>
      </View>
      <TouchableOpacity onPress={() => movePage('Country')} style={styles.cardViewStyle}>
        <View style={{justifyContent:'center', marginRight: 25}}>
          <Image style={{ width: 30, height: 30}} source={require('../../../assets/images/facebook.png')}/>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 18, color:'#000', fontWeight:'700'}}>
            Continue with Facebook
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardViewStyle}>
        <View style={{justifyContent:'center', marginRight: 25}}>
        <Image style={{ width: 30, height: 30}} source={require('../../../assets/images/google.png')}/>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 18, color:'#000', fontWeight:'700'}}>
            Continue with Google
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardViewStyle}>
        <View style={{justifyContent:'center', marginRight: 25}}>
        <Image source={require('../../../assets/images/apple.png')}/>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 18, color:'#000', fontWeight:'700'}}>
            Continue with Apple
          </Text>
        </View>
      </TouchableOpacity>  
      <TouchableOpacity style={[styles.cardViewStyle, {marginBottom: 10}]}>
        <View style={{justifyContent:'center', marginRight: 25}}>
        <Image style={{ width: 30, height: 30}} source={require('../../../assets/images/linkedin.png')}/>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 18, color:'#000', fontWeight:'700'}}>
            Continue with linkedin
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={{marginBottom: 10, color: '#FFF', fontSize: 24, fontWeight: '700', letterSpacing: 1}}>
        or  
      </Text> 
      <TouchableOpacity onPress={() => movePage('LoginInfo')} style={styles.cardViewStyle}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: 18, color:'#000', fontWeight:'700', textAlign: 'center'}}>
            Continue with email
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', alignSelf:'center'}}>
        <Text style={styles.login}>
          By logging in to Yolingo you agree to our privacy policy and terms of service.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6323E',
    paddingHorizontal: 40,
    alignItems:'center'
  },
  backbuttonStyle:{
    position:'absolute',
    left: 15,
    top: 20,
  },
  topTextStyle: {
    textAlign:'left', 
    fontSize: 26, 
    color: '#FFF', 
    fontWeight: 'bold', 
    letterSpacing: 1
  },
  cardViewStyle: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 50,
    marginBottom: 15,
    flexDirection: 'row',
    padding:8
  },
  
  login: {
    fontSize: 17,
    color: '#FFF',
    textAlign:'center',
    fontWeight:'bold'
  }
});

export default Login;
