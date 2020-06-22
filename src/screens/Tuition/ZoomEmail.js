import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';
import {SCREEN} from '../../common/Styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {connect} from 'react-redux';
import CustomBlueButton from '../../components/CustomBlueButton';
import HeaderLogo from '../../components/HeaderLogo';

const ZoomEmail = (props) => {
  const [selected, setSelected] = useState('');
  const [email, setEmail] = useState('');

  const onPress = () => {
    props.navigation.navigate('ZoomBuySession')
  }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backbuttonStyle}>
          <Fontisto name='angle-left' color='#000' size={32}/>
        </TouchableOpacity>
        <View style={{alignItems: 'center', marginTop: 60}}>         
          <HeaderLogo/>
        </View>
        <TextInput
          style={styles.textInputStyle}
          placeholder='Please add your email address'
          placeholderTextColor='#878787'
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <Text style={styles.bodyTextStyle}>
          (A Yolingo teacher will send you a Zoom invitation by email to join the tuition session)
        </Text>
        <CustomBlueButton title='Continue' onPress={onPress}/>
      </View>
    );
}

const mapStateToProps = state => {
  return{
    user: state.auth.user
  } 
}

export default connect(mapStateToProps)(ZoomEmail);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      marginHorizontal: 15
    },
    textStyle: {
      fontSize: 26, 
      fontWeight: 'bold', 
      color: '#000',
      marginTop: 30,
      marginBottom: 30,
      marginHorizontal: 70,
      textAlign: 'center',
      fontFamily: 'sans-serif',
    },
    backbuttonStyle:{
      position:'absolute',
      top: 20,
      left:0
    },
    textInputStyle: {
      height: 40,
      textAlign: 'center',
      marginTop: 60,
      marginBottom: 10,
      width: '90%',
      color: '#000',
      borderColor: '#000', 
      fontSize: 20,
      borderBottomWidth: 2,
      paddingBottom: 2
    },
    bodyTextStyle: {
      textAlign: 'center', 
      fontWeight: 'bold', 
      fontFamily: 'sans-serif-light',
      marginBottom: 40
    }
  });

