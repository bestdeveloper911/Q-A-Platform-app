import React, {useState, Component, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import {bindActionCreators} from 'redux';
import CustomButton from '../../../components/CustomButton';
import {connect} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {onLogin} from '../../../redux/actions/Auth'
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginInfo = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showpassword, setShowpassword] = useState(true);


  const movePage = async() => {
    if (email == ''){
      Toast.show('Please input email')
      return
    }
    if (password == ''){
      Toast.show('Please input email')
      return
    }
    await props.onLogin({email, password});
  }

  
  useEffect(() => {
    if (props.auth.user != null && props.islogin){
      if (props.auth.user.userrole == 1){
        if (props.auth.activity){
          props.navigation.navigate('Notification');
        } else{
          Toast.show('No activate!')  
        }
      } else {
        props.navigation.navigate('Notification');
      }
    } else if (props.auth.error){
      Toast.show('Email or Password is wrong!')
    }
  }, [props.auth, props.islogin])

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.viewcontainer}>
      <View style={{ marginTop: 80, marginBottom: 25}}>
        <Text style={styles.topTextStyle}>
          Log in with email
        </Text>
      </View>
      <View style={{marginTop: '10%', width: '100%'}}>
        <TextInput
          style={styles.textInputStyle}
          placeholder='Enter your email'
          placeholderTextColor='#FFF'
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <View>
          <TextInput
            style={styles.textInputStyle}
            placeholder='Password'
            placeholderTextColor='#FFF'
            secureTextEntry={showpassword}
            onChangeText={text => setPassword(text)}
            value={password}
          />
          {showpassword?
          <MaterialCommunityIcons 
            style={styles.icon}
            name={'eye-outline'}
            size={30}
            color='#FFF'
            onPress={() => setShowpassword(!showpassword)}
          />
          :   
          <MaterialCommunityIcons 
            style={styles.icon}
            name={'eye-off-outline'}
            size={30}
            color='#FFF'
            onPress={() => setShowpassword(!showpassword)}
          />
          }   
        </View>
      </View>
      {!props.loading? 
      <CustomButton
        ButtonStyle={{marginVertical: 0}} 
        textValue='Log in'
        onPress={() => movePage()}
      />
      :
      <View style={styles.buttonStyle}>
        <ActivityIndicator size='large' color='#F6323E'/>
      </View>
      }
      <Text style={{textAlign: 'center', color: '#FFF', marginTop: 20}}>
          By clicking on "Create an account" you agree to our Terms of Use and Privacy Policy.
      </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}

const mapStateToProps = state => {
  return{
    auth: state.auth,
    islogin: state.auth.islogin,
    loading: state.loading
  } 
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onLogin
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginInfo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6323E',
  },
  viewcontainer: {
    alignItems: 'center',
    paddingHorizontal: 40
  },
  topTextStyle: {
    textAlign:'left', 
    fontSize: 26, 
    color: '#FFF', 
    fontWeight: 'bold', 
    letterSpacing: 1
  },
  textInputStyle: {
    height: 40, 
    marginBottom: 40,
    color: '#FFF',
    borderColor: '#FFF', 
    fontSize: 20,
    borderBottomWidth: 2,
    paddingBottom: 2
  },
  icon: {
    position: 'absolute',
    top: 8,
    right: 5
  },
  buttonStyle:{
    width: '100%',
    height: 60,
    borderRadius: 18,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },

});

