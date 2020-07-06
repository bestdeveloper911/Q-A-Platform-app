import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Slider,
} from 'react-native';
import {SCREEN} from '../../common/Styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {connect} from 'react-redux';
import CustomBlueButton from '../../components/CustomBlueButton';
import HeaderLogo from '../../components/HeaderLogo';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const ZoomClock = (props) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(moment(new Date()).format('LT').split(' '));
  const [show, setShow] = useState(false); 
  const [aP, setAP] = useState('AM')
  const onPress = () => {
    global.time = time[0] + ' '+ aP;
    console.log('global.time',global.time)
    props.navigation.navigate('ZoomTimeZone');
  }

  const onChangeAP = () => {
    if (aP == 'AM'){
      setAP('PM')
    } else {
      setAP('AM')
    }
  }

  const onChange = (event, selectedDate) => {
    // global.time = moment(selectedDate).format('LT');
    let timeArr = moment(selectedDate).format('LT').split(' ');
    setTime(timeArr)
    setShow(false)
  };

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backbuttonStyle}>
          <Fontisto name='angle-left' color='#000' size={32}/>
        </TouchableOpacity>
        <View style={{alignItems: 'center', marginTop: 60}}>         
          <HeaderLogo/>
        </View>
        <Text style={styles.textStyle}>
          At what time?
        </Text>
        <View style={{flexDirection: 'row', marginVertical: 70}}>
        <TouchableOpacity onPress={() => setShow(true)}>
          <View style={[styles.timeView, {width: 120, marginRight: 20}]}>
            <Text style={styles.timeText}>
              {time[0]}
            </Text> 
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onChangeAP()}>
          <View style={styles.timeView}>
            <Text style={styles.timeText}>
            {aP}
            </Text> 
          </View>
        </TouchableOpacity>
        </View>
        {show&&
        <RNDateTimePicker 
          value={date}
          mode='time'
          is24Hour={false}
          display="clock"
          onChange={onChange}
          />
        }
        {/* <Image source={require('../../assets/images/clock.png')} style={{marginBottom: 30}}/> */}
        <CustomBlueButton title='Continue' onPress={onPress}/>
      </View>
    );
}

const mapStateToProps = state => {
  return{
    user: state.auth.user
  } 
}

export default connect(mapStateToProps)(ZoomClock);

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
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    timeView: {
      justifyContent: 'center', 
      alignItems:'center', 
      borderWidth: 1, 
      borderColor:'#000', 
      borderRadius: 10, 
      width: 60, 
      height: 60
    },
    timeText: {
      textAlign: 'center', 
      fontSize: 28, 
      fontWeight:'bold'
    }
  });

