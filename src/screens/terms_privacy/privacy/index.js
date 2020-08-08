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

const Privacy = (props) => {
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
            {lang.Privacy.Privacy_Policy_title}
          </Text> 
          <Text style={styles.contentStyle}>
            {lang.Privacy.Privacy_Policy_con1}
          </Text> 
          <Text style={styles.contentStyle}>
            {lang.Privacy.Privacy_Policy_con2}
          </Text>
          <Text style={styles.subtitleStyle}>
            {lang.Privacy.Kinds_title}
          </Text> 
          <Text style={styles.contentStyle}>
            {lang.Privacy.Kinds_con1}
          </Text> 
          <Text style={styles.contentStyle}>
            {lang.Privacy.Kinds_subcon1}
          </Text> 
          <Text style={styles.contentStyle}>
            {lang.Privacy.Kinds_subcon2}
          </Text> 
          <Text style={styles.subtitleStyle}>
            {lang.Privacy.Purpose_title}
          </Text>  
          <Text style={styles.contentStyle}>
            {lang.Privacy.Purpose_subtitle}
          </Text> 
          <Text style={styles.contentStyle}>
            {lang.Privacy.Purpose_con1}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Purpose_con2}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Purpose_con3}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Purpose_con4}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Purpose_midcon}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Purpose_admin}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Purpose_admin_con1}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Purpose_admin_con2}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Purpose_admin_con1}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Purpose_admin_con3}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Purpose_admin_con4}
          </Text>
          <Text style={styles.subtitleStyle}>
            {lang.Privacy.DirectMarketing_title}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.DirectMarketing_con1}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.DirectMarketing_con2}
          </Text>
          <Text style={styles.subtitleStyle}>
            {lang.Privacy.Third_PartyMarketing_title}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Third_PartyMarketing_con}
          </Text>
          <Text style={styles.subtitleStyle}>
            {lang.Privacy.Retention_title}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Retention_con1}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Retention_con2}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Retention_con3}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Retention_cookies_title}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Retention_cookies_con1}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Retention_cookies_con2}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Retention_cookies_subcon1}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Retention_cookies_subcon2}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Retention_cookies_subcon3}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Retention_cookies_subcon4}
          </Text>
          <Text style={styles.subtitleStyle}>
            {lang.Privacy.Retention_limitation_title}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Retention_limitation_con1}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Retention_limitation_con2}
          </Text>
          <Text style={styles.subtitleStyle}>
            {lang.Privacy.Changes_title}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.Changes_con}
          </Text>
          <Text style={styles.subtitleStyle}>
            {lang.Privacy.ContactUs_title}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.ContactUs_con}
          </Text>
          <Text style={styles.subtitleStyle}>
            {lang.Privacy.English_version_title}
          </Text>
          <Text style={styles.contentStyle}>
            {lang.Privacy.English_version_con}
          </Text>
          <Text style={[styles.contentStyle, {fontFamily: 'OpenSans-Bold'}]}>
            {lang.Privacy.Footer}
          </Text>
        </ScrollView>
      </View>
  );
 
}

export default Privacy;

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
