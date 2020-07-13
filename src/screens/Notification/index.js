import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  CheckBox
} from 'react-native';
import CustomBlueButton from '../../components/CustomBlueButton';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';

const Notification = (props) => {
  const [isSelected, setSelection] = useState(false);
  
  async function saveTokenToDatabase(token) {
    const userId = auth().currentUser.uid;
    console.log('userid', userId)
    await database()
      .ref(`users/${userId}`)
      .update({
        token: token,
      });

    // messaging().onMessage(async remoteMessage => {
    //   console.log('FCM Message Data:', remoteMessage.data);
    // });
  
    // messaging().onSendError(event => {
    //   console.log(event.messageId);
    //   console.log(event.error);
    // });
  }

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        console.log(token)
        return saveTokenToDatabase(token);
      });

    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });
  }, []);

  const onPress = () => {
    if (props.user.userrole == 1){
      props.navigation.navigate('QUESTIONS');
    } else {
      props.navigation.navigate('ANSWERS');
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/bell.png')} style={{ marginBottom: 40}}/>
      <Text style={styles.textStyle}>
        You've got a message!
      </Text>
      <Text style={styles.bodyStyle}>
          We'll let you know when teachers answer your questions.
      </Text>
      <CustomBlueButton title='Turn on notifications' onPress={onPress}/>
      <TouchableOpacity onPress={() => onPress()} style={{marginTop: 50}}>
        <Text style={styles.bottomTextStyle}>Later</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Notification);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingHorizontal: 25,
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 24,
    color: '#000', 
    textAlign: 'center',
    fontFamily: 'notoserif',
    fontWeight: 'bold',
    marginBottom: 30
  },
  bodyStyle: {
    fontSize: 22, 
    color: '#000',
    fontFamily: 'notoserif',
    textAlign: 'center',
    marginBottom: 30
  },
  bottomTextStyle:{
    fontSize: 28,
    color: '#3C3C3B',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
    letterSpacing: 1
  }
});
