import React, {Fragment, Component, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

const SubSelect = (props) => {
  useEffect(() => {
    // props.navigation.navigate('Auth');
  },[])

  const movePage = (item, user) => {
    if (user == 0){
      global.user = 0
    } else if (user == 1) {
      global.user = 1
    }
    props.navigation.navigate(item)
  }

  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backbuttonStyle}>
        <Fontisto name='angle-left' color='#FFF' size={32}/>
      </TouchableOpacity>
      <View style={{ marginTop: 80, marginBottom: 25}}>
        <Text style={styles.topTextStyle}>
          I am a...
        </Text>
      </View>
      <TouchableOpacity onPress={() => movePage('Register', 0)} style={styles.cardViewStyle}>
        <View style={{flex:1,  justifyContent:'center'}}>
          <Image style={{ width: 85, height: 85}} source={require('../../../assets/images/learner.png')}/>
        </View>
        <View style={{flex:2, justifyContent: 'center'}}>
          <Text style={{fontSize: 22, color:'#000', fontWeight:'700'}}>
            Learner
          </Text>
          <Text style={{fontSize:16, fontWeight: '600'}}>
            Get help with your English language learning from our teachers.
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => movePage('ReadPage', 1)} style={styles.cardViewStyle}>
        <View style={{flex:1,  justifyContent:'center'}}>
          <Image style={{ width: 85, height: 85}} source={require('../../../assets/images/teacher.png')}/>
        </View>
        <View style={{flex:2, justifyContent: 'center'}}>
          <Text style={{fontSize: 22, fontWeight:'700'}}>
            Teacher
          </Text>
          <Text style={{fontSize:16, fontWeight: '600'}}>
            Help learners. Answer questions and give tuition on Zoom.
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', alignSelf:'center'}}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6323E',
    paddingHorizontal: 20
  },
  backbuttonStyle:{
    position:'absolute',
    left: 15,
    top: 20,
  },
  topTextStyle: {
    textAlign:'left', 
    fontSize: 30, 
    color: '#FFF', 
    fontWeight: 'bold', 
    letterSpacing: 1
  },
  cardViewStyle: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 30,
    height: 120,
    marginBottom: 25,
    flexDirection: 'row',
    padding:15
  },
  
  login: {
    letterSpacing: 1,
    fontSize: 17,
    color: '#FFF',
    textAlign:'center',
    fontWeight:'bold'
  }
});

export default SubSelect;
