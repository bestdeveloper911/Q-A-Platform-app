import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  CheckBox
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import langen from '../../../common/en.json'
import langvi from '../../../common/vi.json'
import langsk from '../../../common/sk.json'
import langth from '../../../common/th.json'
import { ScrollView } from 'react-native-gesture-handler';

const Terms = (props) => {
  const [isSelected, setSelection] = useState(false);
  let lang; 
  const closePage = () => {
    const back = props.navigation.getParam('backpage');
    if (back == 'payment'){
      props.navigation.navigate('Payment')
    } else {
      props.navigation.goBack()
    }
  }
  const selectedLanguage = props.navigation.getParam('index')

  if (selectedLanguage == 0){
    lang = langen
  } else if (selectedLanguage == 1){
    lang = langvi
  } else if (selectedLanguage == 2){
    lang = langen
  } else if (selectedLanguage == 3){
    lang = langen
  } else if (selectedLanguage == 4){
    lang = langth
  } else if (selectedLanguage == 5){
    lang = langen
  } else if (selectedLanguage == 6){
    lang = langen
  } else if (selectedLanguage == 7){
    lang = langsk
  } else if (selectedLanguage == 8){
    lang = langen
  }
  
  return (
    <View style={styles.container}>      
        <TouchableOpacity onPress={() => closePage()} style={{position:'absolute', zIndex: 10, right: 15, top:15}}>
          <Fontisto name='close-a' size={30} color='#000'/>
        </TouchableOpacity>
        <ScrollView style={{flex: 1}}>
          <Text style={[styles.titleStyle, {marginTop: 80}]}>
            {lang.Terms.Terms_serivce}
          </Text>
          <Text style={styles.subtitleStyle}>
            {lang.Terms.Introduction_title}
          </Text> 
          <Text style={styles.contentStyle}>
            {lang.Terms.Introduction_con1}
          </Text> 
          <Text style={styles.contentStyle}>
            {lang.Terms.Introduction_con2}
          </Text>
          <Text style={styles.subtitleStyle}>
            {lang.Terms.General_title}
          </Text> 
          <Text style={styles.contentStyle}>
            {lang.Terms.General_con1}
          </Text> 
          <Text style={styles.contentStyle}>
            {lang.Terms.General_con2}
          </Text> 
          <Text style={styles.contentStyle}>
            {lang.Terms.General_con3}
          </Text> 
          <Text style={styles.contentStyle}>
            {lang.Terms.General_con4}
          </Text> 
          <Text style={styles.contentStyle}>
            {lang.Terms.General_con5}
          </Text> 
          <Text style={styles.contentStyle}>
            {lang.Terms.General_con6}
          </Text>
          <Text style={styles.subtitleStyle}>
            {lang.Terms.Payment_title}
          </Text>  
          <Text style={styles.contentStyle}>
            {lang.Terms.Payment_con1}
          </Text> 
          <Text style={styles.contentStyle}>
            {lang.Terms.Payment_con2}
          </Text>
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <Image source={require('../../../assets/images/headerlogo.png')}/>
            <Text style={[styles.subtitleStyle, {marginVertical: 0, marginLeft: 5}]}>
              {lang.Terms.Terms_use}
            </Text> 
          </View>
          <Text style={styles.contentStyle}>
            {lang.Terms.Terms_use_con1}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Terms_use_subcon1_1}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Terms_use_subcon1_2}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Terms_use_subcon1_3}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Terms_use_subcon1_4}
          </Text>
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <Image source={require('../../../assets/images/yolingocamera.png')} />
            <Text style={[styles.subtitleStyle, {marginVertical: 0, marginLeft: 5}]}>
              {lang.Terms.Terms_use}
            </Text> 
          </View>
          <Text style={styles.contentStyle}>
            {lang.Terms.Terms_use_con2}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Terms_use_subcon2_1}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Terms_use_subcon2_2}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Terms_use_subcon2_3}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Terms_use_subcon2_4}
          </Text>
          <Text style={styles.subtitleStyle}>
            {lang.Terms.Cancellation_Refund_title}
          </Text>
          <View style={{marginVertical: 10}}>
            <Image source={require('../../../assets/images/headerlogo.png')}/>
          </View>
          <Text style={styles.contentStyle}>
            {lang.Terms.Cancellation_title}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.iphone}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Cancellation_iphone_con1}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Cancellation_iphone_con2}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Cancellation_iphone_con3}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Cancellation_iphone_con4}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.android}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Cancellation_android_con1}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Cancellation_android_con2}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Cancellation_android_con3}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Cancellation_android_con4}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Cancellation_android_con5}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Cancellation_android_con6}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Cancellation_note}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Cancellation_refund}
          </Text>
          <View style={{marginVertical: 10}}>
            <Image source={require('../../../assets/images/yolingocamera.png')}/>
          </View>
          <Text style={styles.contentStyle}>
            {lang.Terms.Refund_title}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Refund_con1}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Refund_con2}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Refund_addtional1}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Refund_addtional2}
          </Text>
          <Text style={styles.subtitleStyle}>
            {lang.Terms.Rights_Responsibilities_title}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Rights_Responsibilities_con1}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Rights_Responsibilities_con2}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Rights_Responsibilities_con3}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Rights_Responsibilities_con4}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Rights_Responsibilities_con5}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Rights_Responsibilities_con6}
          </Text>
          <Text style={styles.subtitleStyle}>
            {lang.Terms.User_Responsibilities_title}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.User_Responsibilities_subtitle}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.User_Responsibilities_con1}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.User_Responsibilities_con2}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.User_Responsibilities_con3}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.User_Responsibilities_con4}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.User_Responsibilities_con5}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.User_Responsibilities_con6}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.User_Responsibilities_con7}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.User_Responsibilities_con8}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.User_Responsibilities_final}
          </Text>
          <Text style={styles.subtitleStyle}>
            {lang.Terms.Change_terms_condition_title}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Terms.Change_terms_condition_con}
          </Text>
          <Text style={[styles.contentStyle, {fontFamily: 'OpenSans-Bold'}]}>
            {lang.Terms.Footer}
          </Text>
        </ScrollView>
      </View>
  );
 
}

export default Terms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 25,
  },
  backbuttonStyle:{
    position:'absolute',
    top: 20,
    left:0
  }, 
  titleStyle: {
    fontSize: 24,
    color: '#000', 
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    marginVertical: 10
  },
  subtitleStyle: {
    fontSize: 20,
    color: '#000', 
    fontFamily: 'OpenSans-Bold',
    marginVertical: 10
  },
  contentStyle: {
    fontSize: 16,
    color: '#000', 
    fontFamily: 'OpenSans-Semibold',
    marginVertical: 10
  },
});
