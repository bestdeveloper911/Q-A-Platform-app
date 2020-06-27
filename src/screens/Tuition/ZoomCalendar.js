import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import {SCREEN} from '../../common/Styles';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {connect} from 'react-redux';
import CustomBlueButton from '../../components/CustomBlueButton';
import HeaderLogo from '../../components/HeaderLogo';
import LinearGradient from 'react-native-linear-gradient';

const ZoomCalendar = (props) => {
  const [date, setDate] = useState(null);
  const onPress = () => {
    global.date = date;
    props.navigation.navigate('ZoomClock');
  }
  LocaleConfig.locales['en'] = {
    monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    monthNamesShort: ['Jan.','Feb','Mar','Apr','May','Jun','Jul.','Aug','Sep','Oct','Nov','Dec'],
    dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    dayNamesShort: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
  };
  LocaleConfig.defaultLocale = 'en';
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
        <LinearGradient colors={['#f8f8f8','#d6d5d5']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{width: 300, height: 350, marginBottom: 30}}>
           <Calendar
              style = {{borderWidth:1, borderColor: 'gray', height: 350, width: 300}}
              theme={{
                calendarBackground:'transparent',
                textSectionTitleColor: '#FFAC41',
                selectedDayBackgroundColor: 'red',
                selectedDayTextColor: 'white',
                todayTextColor: '#000',
                dayTextColor: '#000',
                textDisabledColor: '#000',
                dotColor: 'red',
                selectedDotColor: '#ffffff',
                arrowColor: '#28abe5',
                'stylesheet.calendar.main': {
                  container: {
                    paddingLeft: 0,
                    paddingRight: 0,
                  }
                },
                'stylesheet.calendar.header': {
                  header: {
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 0,
                    marginBottom: 15
                  },
                  arrow: {
                    padding: 14,
                  },
                  week: {
                    marginTop: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }
                },
                monthTextColor: '#506b83',
                // indicatorColor: '#28abe5', 
                textMonthFontWeight: 'bold',
                textMonthFontSize: 20,
                textMonthFontWeight: 'bold',
                textDayFontSize: 14,
                textDayFontWeight: 'bold',
                textDayHeaderFontSize: 14
              }}
              markedDates={{
                [date]: { selected: true },
                }}
              onDayPress={(day) => {setDate(day.dateString)}}
              onDayLongPress={(day) => {console.log('selected day', day.dateString)}}
              hideExtraDays={true}
            />
        </LinearGradient>
        {/* <Image source={require('../../assets/images/calendar.png')} style={{marginBottom: 30}}/> */}
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
      marginTop: 20,
      marginBottom: 20,
      marginHorizontal: 50,
      textAlign: 'center',
      fontFamily: 'sans-serif',
    },
    backbuttonStyle:{
      position:'absolute',
      top: 20,
      left:0
    },
  });

