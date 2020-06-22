import React, {Fragment, Component, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'

const LearnerCreate = (props) => {
  useEffect(() => {
    // props.navigation.navigate('Auth');
  },[])

  const movePage = (item) => {
    props.navigation.navigate(item);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{position:'absolute', right: 15, top:15}}>
        <Fontisto name='close-a' size={30} color='#FFF'/>
      </TouchableOpacity>
      <View style={{marginTop: '50%'}}>
        <Text style={styles.titleStyle}>
          To work as a teacher on 
        </Text>
        <Text style={[styles.titleStyle, {marginBottom: 30}]}>
          Yolingo you must:
        </Text>
        <Text style={styles.bodyStyle}>
            a) Be a native English speaker  (UK, Ireland, USA, Canada, South Africa, New Zealand and Australia) 
        </Text>
        <Text style={styles.bodyStyle}>
            b) Have a teaching qualification  (TEFL, TESOL, CELTA, DELTA) or a university degree. 
        </Text>
      </View>
      <TouchableOpacity onPress={() => movePage('Register')} style={styles.buttonStyle}>
        <Text style={styles.buttonText} ellipsizeMode="middle">
          Continue
        </Text>
      </TouchableOpacity>
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
    letterSpacing: 1
  },
  bodyStyle: {
    fontSize: 16, 
    color: '#FFF', 
    fontWeight:'700', 
    fontFamily: 'Arial',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 30
  },
  buttonStyle:{
    width: '100%',
    height: 60,
    borderRadius: 18,
    backgroundColor: '#FFF',
    marginVertical: 30,
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

export default LearnerCreate;
