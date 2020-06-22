import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

const HeaderAnswer = (props) => {
  const {onPress} = props;
  return (   
    <SafeAreaView style={styles.background}>
        <View style={{flexDirection: 'row', marginHorizontal: 10,marginTop: 20, justifyContent: 'space-between'}}>
          <Image source={require('../assets/images/headerlogo.png')} style={{alignSelf: 'center'}}/>    
          <TouchableOpacity onPress={onPress} style={styles.headerButtonStyle}>
            <Text style={{textAlign: 'center', fontSize: 30, fontWeight: '700', color:'#FFF'}}>
              Ask  
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
    borderBottomWidth: 1
  },
  headerButtonStyle: {
    width: 90, 
    height: 60, 
    backgroundColor: '#347EE9',
    borderRadius: 14,
    justifyContent:'center'
  }
});
export default HeaderAnswer