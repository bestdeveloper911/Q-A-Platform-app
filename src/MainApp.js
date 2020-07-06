import React, { useEffect } from 'react'
import {View, Alert} from 'react-native'
import AppNavigation from './navigation';
import messaging from '@react-native-firebase/messaging';

export function MainApp(){
  console.disableYellowBox = true;
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <View style={{ flex: 1 }} >
      <AppNavigation />
    </View>
  )
}
export default MainApp

