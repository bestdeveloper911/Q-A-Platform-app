import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import {SCREEN} from '../../common/Styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {connect} from 'react-redux';
import CustomBlueButton from '../../components/CustomBlueButton';
import HeaderLogo from '../../components/HeaderLogo';

const ZoomCalendar = (props) => {
  const [isvisible, setIsvisible] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const onPress = () => {
    props.navigation.navigate('ZoomClock')
  }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backbuttonStyle}>
          <Fontisto name='angle-left' color='#000' size={32}/>
        </TouchableOpacity>
        <View style={{alignItems: 'center', marginTop: 60}}>         
          <HeaderLogo/>
        </View>
        <Text style={styles.textStyle}>
          What date would you like your tuition?
        </Text>
        <Image source={require('../../assets/images/calendar.png')} style={{marginBottom: 30}}/>
        <CustomBlueButton title='Continue' onPress={onPress}/>
      </View>
    );
}

const mapStateToProps = state => {
  return{
    user: state.auth.user
  } 
}

export default connect(mapStateToProps)(ZoomCalendar);

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
  });

