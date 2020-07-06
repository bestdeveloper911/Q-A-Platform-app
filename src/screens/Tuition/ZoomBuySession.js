import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  CheckBox
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomBlueButton from '../../components/CustomBlueButton';
import HeaderLogo from '../../components/HeaderLogo';
import {createZoom} from '../../service/Zoom';
import {connect} from 'react-redux';
import database from '@react-native-firebase/database'

const ZoomBuySession = (props) => {
  const [name, setName] = useState('');
  const [isSelected, setSelection] = useState(false);

  useEffect(() => {
    database()
    .ref('/users')
    .orderByChild('uid')
    .equalTo(props.user.uid)
    .once('value')
    .then(snapshot => {
      snapshot.forEach(element => {
        setName(element.val().name)  
      });
    })
  }, [])


  const onPress = async() => {
    const response = await createZoom(props.user.uid, global.date, global.time, global.timezone, global.emailAddress, name);
    console.log(response)
    props.navigation.navigate('ZoomThanks');
  }

  const closePage = () => {
    props.navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => closePage()} style={{position:'absolute', right: 15, top:15}}>
        <Fontisto name='close-a' size={30} color='#000'/>
      </TouchableOpacity>
        <View style={{marginTop: 60, marginBottom: 50}}>
        <HeaderLogo/>
        </View>
        <Text style={styles.textStyle}>
          Get help from our teachers with 15 minute live video tuition sessions using Zoom.
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.bodyStyle, {fontSize: 26, fontWeight: 'bold'}]}>
              $8.00/
          </Text>
          <Text style={[styles.bodyStyle, {fontSize: 18, textAlignVertical:'bottom'}]}>
              15 minutes
          </Text>
        </View>
        <View>
          <View style={styles.countryView}>
            <Image source={require('../../assets/images/Vietnam.png')} style={{marginRight: 5}}/>
            <Text style={styles.moneyTextStyle}>187,200{'\u20AB'}</Text>
          </View>
          <View style={styles.countryView}>
            <Image source={require('../../assets/images/Thailand.png')} style={{marginRight: 5}}/>
            <Text style={styles.moneyTextStyle}>{'\u0E3F'}256,00</Text>
          </View>
          <View style={styles.countryView}>
            <Image source={require('../../assets/images/Indonesia.png')} style={{marginRight: 5}}/>
            <Text style={styles.moneyTextStyle}>Rp120,000</Text>
          </View>
          <View style={styles.countryView}>
            <Image source={require('../../assets/images/Japan.png')} style={{marginRight: 5}}/>
            <Text style={styles.moneyTextStyle}>{'\u00A5'}857.00</Text>
          </View>
          <View style={styles.countryView}>
            <Image source={require('../../assets/images/South-Korea.png')} style={{marginRight: 5}}/>
            <Text style={styles.moneyTextStyle}>{'\u20A9'}9,865</Text>
          </View>
          <View style={styles.countryView}>
            <Image source={require('../../assets/images/Cambodia.png')} style={{marginRight: 5}}/>
            <Text style={styles.moneyTextStyle}>32,633{'\u17DB'}</Text>
          </View>
          <View style={styles.countryView}>
            <Image source={require('../../assets/images/Myanmar.png')} style={{marginRight: 5}}/>
            <Text style={styles.moneyTextStyle}>K11,205</Text>
          </View>
          <View style={styles.countryView}>
            <Image source={require('../../assets/images/Laos.png')} style={{marginRight: 5}}/>
            <Text style={styles.moneyTextStyle}>12,000{'\u20AD'}</Text>
          </View>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
          <Text style={styles.label}>I agree to the terms</Text>
        </View>
     <CustomBlueButton title='Buy a Session' onPress={onPress}/>
    </View>
  );
}

 const mapStatToProps = state => {
   return {
     user: state.auth.user
   }
 }

export default connect(mapStatToProps)(ZoomBuySession);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingHorizontal: 25
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    textAlignVertical: "center",
    fontSize: 16
  },
  textStyle: {
    fontSize: 22,
    color: '#000', 
    textAlign: 'center',
    fontFamily: 'notoserif',
    marginBottom: 25
  },
  bodyStyle: {
    fontSize: 22, 
    color: '#000',
    fontFamily: 'notoserif',
    textAlign: 'center',
    marginBottom: 25
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
  },
  countryView: {
    flexDirection:'row'
  },
  moneyTextStyle: {
    textAlignVertical: 'center', 
    fontWeight:'bold'
  },
});
