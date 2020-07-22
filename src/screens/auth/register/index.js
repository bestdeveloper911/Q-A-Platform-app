import React, {Fragment, Component, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Register = (props) => {
  
  const movePage = (item) => {
    props.navigation.navigate(item)
  }

  const goToFlag = () => {
    props.navigation.navigate('Privacy')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backbuttonStyle}>
        <Fontisto name='angle-left' color='#FFF' size={32}/>
      </TouchableOpacity>
      <View style={{ marginTop: 80, marginBottom: 25}}>
        <Text style={styles.topTextStyle}>
          Sign up with email
        </Text>
      </View>
      <TouchableOpacity onPress={() => movePage('Country')} style={styles.cardViewStyle}>
        <View style={{justifyContent:'center', marginRight: 25}}>
          <Image style={{ width: 30, height: 30}} source={require('../../../assets/images/facebook.png')}/>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 18, color:'#000', fontWeight:'700'}}>
            Sign up with Facebook
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardViewStyle}>
        <View style={{justifyContent:'center', marginRight: 25}}>
        <Image style={{ width: 30, height: 30}} source={require('../../../assets/images/google.png')}/>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 18, color:'#000', fontWeight:'700'}}>
            Sign up with Google
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardViewStyle}>
        <View style={{justifyContent:'center', marginRight: 25}}>
        <Image source={require('../../../assets/images/apple.png')}/>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 18, color:'#000', fontWeight:'700'}}>
            Sign up with Apple
          </Text>
        </View>
      </TouchableOpacity>  
      <TouchableOpacity style={styles.cardViewStyle}>
        <View style={{justifyContent:'center', marginRight: 25}}>
        <Image style={{ width: 30, height: 30}} source={require('../../../assets/images/linkedin.png')}/>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 18, color:'#000', fontWeight:'700'}}>
            Sign up with linkedin
          </Text>
        </View>
      </TouchableOpacity> 
      <TouchableOpacity onPress={() => movePage('RegisterInfo')} style={styles.cardViewStyle}>
        <View style={{justifyContent:'center', marginRight: 15}}>
          <Image style={{ width: 40, height: 30}} source={require('../../../assets/images/email.png')}/>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 18, color:'#000', fontWeight:'700'}}>
            Sign up with email
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{alignSelf:'center'}}>
        <Text style={styles.login}>
          By logging in to Yolingo you agree to our
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity onPress={goToFlag}>
            <Text style={styles.privacy}>
              privacy policy
            </Text>
          </TouchableOpacity>
          <Text style={[styles.login, {marginHorizontal: 7}]}>
            and
          </Text>
          <TouchableOpacity onPress={goToFlag}>
            <Text style={styles.privacy}>
              terms of service.
            </Text>
          </TouchableOpacity>
        </View>
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
    height: 60,
    marginBottom: 20,
    flexDirection: 'row',
    padding:8
  },
  login: {
    fontSize: 17,
    color: '#FFF',
    textAlign:'center',
  },
  privacy: {
    fontSize: 17,
    color: '#FFF',
    textAlign:'center',
    fontWeight:'bold',
    textDecorationLine: 'underline'
  }
});

export default Register;
