import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import HeaderLogo from './HeaderLogo'
const HeaderZoom = (props) => {
  const {onPress} = props;
  return (   
    <SafeAreaView style={styles.background}>
        <View style={{flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-between'}}>
          <HeaderLogo/>
          <TouchableOpacity onPress={onPress} style={styles.headerButtonStyle}>
            <Text style={styles.headerButtonTextStyle}>
              Talk to a teacher  
            </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  background: {
    height:100,
    marginHorizontal: 4,
    marginVertical: 4,
    backgroundColor: '#FFF',
    borderBottomColor: '#a7a7aa',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  headerButtonStyle: {
    backgroundColor: '#347EE9',
    borderRadius: 14,
    justifyContent:'center'
  },
  headerButtonTextStyle: {
    textAlign: 'center', 
    fontSize: 20, 
    fontWeight: '700', 
    color:'#FFF', 
    paddingHorizontal: 10, 
    paddingVertical: 5
  }
});
export default HeaderZoom