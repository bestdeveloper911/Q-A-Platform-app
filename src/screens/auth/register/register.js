import React, {useState, Component, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ActivityIndicator,
  ToastAndroid,
  TouchableOpacity
} from 'react-native';
import CustomButton from '../../../components/CustomButton'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { bindActionCreators } from 'redux';
import {onRegister} from '../../../redux/actions/Auth'
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';

const RegisterInfo = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showpassword, setShowpassword] = useState(true);


  const movePage = async() => {
    if (name == '' || email == '' || password == ''){
      Toast.show('Please fill all input');
      return;
    }
    props.onRegister({name, email, password});
  }

  const goToFlag = () => {
    props.navigation.navigate('Privacy')
  }
  
  useEffect(() => {
    if (props.register && props.user.userrole == 0){
      props.navigation.navigate('Login');  
    } else if (props.register && props.user.userrole == 1) {
      props.navigation.navigate('Country');
    }
  }, [props.register, props.user])

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 80, marginBottom: 25}}>
        <Text style={styles.topTextStyle}>
          Sign up with email
        </Text>
      </View>
      <View style={{marginTop: '10%', width: '100%'}}>
        <TextInput
          style={styles.textInputStyle}
          placeholder='Name'
          placeholderTextColor='#FFF'
          onChangeText={text => setName(text)}
          value={name}
        />
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
        textValue='Create an account'
        onPress={() => movePage()}
      />
      :
      <View style={styles.buttonStyle}>
        <ActivityIndicator size='large' color='#F6323E'/>
      </View>
      }
      <View style={{marginTop: 20}}>
          <Text style={styles.normalText}>
              By clicking on "Create an account" you agree
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.normalText}>
              to our
            </Text>
            <TouchableOpacity onPress={() => goToFlag()}>
              <Text style={styles.underlineText}>
                Terms of Use
              </Text>
            </TouchableOpacity>
            <Text style={styles.normalText}>
              and
            </Text>
            <TouchableOpacity onPress={() => goToFlag()}>
              <Text style={styles.underlineText}>
                Privacy Policy.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
}

const mapStateToProps = state => {
  return{
    register: state.auth.register,
    user: state.auth.user,
    loading: state.loading
  } 
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onRegister
  }, dispatch)
}
export default connect(mapStateToProps ,mapDispatchToProps)(RegisterInfo)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6323E',
    alignItems: 'center',
    paddingHorizontal: 30
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
  normalText: {
    fontSize: 15, 
    textAlign: 'center', 
    color: '#FFF', 
    marginHorizontal: 8
  },
  underlineText: {
    fontSize: 15, 
    textAlign: 'center', 
    color: '#FFF', 
    textDecorationLine: 'underline', 
    fontWeight: 'bold'
  }
});

