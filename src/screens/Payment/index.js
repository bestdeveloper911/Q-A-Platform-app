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
import {onSubscribe} from '../../redux/actions/QA'
import CustomBlueButton from '../../components/CustomBlueButton';
import {connect} from 'react-redux';

const Payment = (props) => {
  const [isSelected, setSelection] = useState(false);
  const onPress = () => {
    props.onSubscribe(true, props.user.uid)
    props.navigation.goBack();
  }

  const closePage = () => {
    props.navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => closePage()} style={{position:'absolute', right: 15, top:15}}>
        <Fontisto name='close-a' size={30} color='#000'/>
      </TouchableOpacity>
        <Image source={require('../../assets/images/headerlogo.png')} style={{marginTop: 50, marginBottom: 40}}/>
        <Text style={styles.textStyle}>
          15 question & answer sessions per month with our teachers.
        </Text>
        <Text style={styles.bodyStyle}>
            3-Day free trial with 4 question & answer sessions.
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.bodyStyle, {fontSize: 26, fontWeight: 'bold'}]}>
              $20.00/
          </Text>
          <Text style={[styles.bodyStyle, {fontSize: 18, textAlignVertical:'bottom'}]}>
              month
          </Text>
        </View>
        <View>
          <View style={styles.countryView}>
            <Image source={require('../../assets/images/Vietnam.png')} style={{marginRight: 5}}/>
            <Text style={styles.moneyTextStyle}>468,000{'\u20AB'}</Text>
          </View>
          <View style={styles.countryView}>
            <Image source={require('../../assets/images/Thailand.png')} style={{marginRight: 5}}/>
            <Text style={styles.moneyTextStyle}>{'\u0E3F'}642,00</Text>
          </View>
          <View style={styles.countryView}>
            <Image source={require('../../assets/images/Indonesia.png')} style={{marginRight: 5}}/>
            <Text style={styles.moneyTextStyle}>Rp297,996</Text>
          </View>
          <View style={styles.countryView}>
            <Image source={require('../../assets/images/Japan.png')} style={{marginRight: 5}}/>
            <Text style={styles.moneyTextStyle}>{'\u00A5'}2,141</Text>
          </View>
          <View style={styles.countryView}>
            <Image source={require('../../assets/images/South-Korea.png')} style={{marginRight: 5}}/>
            <Text style={styles.moneyTextStyle}>{'\u20A9'}24,660</Text>
          </View>
          <View style={styles.countryView}>
            <Image source={require('../../assets/images/Cambodia.png')} style={{marginRight: 5}}/>
            <Text style={styles.moneyTextStyle}>81,582{'\u17DB'}</Text>
          </View>
          <View style={styles.countryView}>
            <Image source={require('../../assets/images/Myanmar.png')} style={{marginRight: 5}}/>
            <Text style={styles.moneyTextStyle}>K28,014</Text>
          </View>
          <View style={styles.countryView}>
            <Image source={require('../../assets/images/Laos.png')} style={{marginRight: 5}}/>
            <Text style={styles.moneyTextStyle}>180,100{'\u20AD'}</Text>
          </View>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
          <Text style={styles.label}>I agree to the subscription terms</Text>
        </View>
     <CustomBlueButton title='Try it FREE for 3 days' onPress={onPress}/>
    </View>
  );
}
const mapStateToProps = state => {
  return{
    user: state.auth.user
  } 
}

const mapDispatchToProps = dispatch => {
  return {
    onSubscribe: (status, uid) => {dispatch(onSubscribe(status, uid))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

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
