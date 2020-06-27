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

const ZoomThanks = (props) => {
  const [isSelected, setSelection] = useState(false);

  const closePage = () => {
    props.navigation.navigate('TUITION');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => closePage()} style={{position:'absolute', right: 15, top:15}}>
        <Fontisto name='close-a' size={30} color='#000'/>
      </TouchableOpacity>
        <View style={{marginTop: 60, marginBottom: 50}}>
        <HeaderLogo/>
        </View>
        <Text style={[styles.labelStyle, {fontSize: 32}]}>
          Thanks!
        </Text>
        <Text style={styles.labelStyle}>
          You will receive a Zoom invitation by email very soon.
        </Text>
        <Text style={styles.labelStyle}>
          Please check your email regularly.
        </Text>
    </View>
  );
}


export default ZoomThanks;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingHorizontal: 25
  },
  labelStyle: {
    fontSize: 28,
    color: '#000',
    fontWeight: 'bold', 
    textAlign: 'center',
    fontFamily: 'notoserif',
    marginBottom: 30
  },

});
