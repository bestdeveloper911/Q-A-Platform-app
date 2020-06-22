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
import {connect} from 'react-redux';

const Notification = (props) => {
  const [isSelected, setSelection] = useState(false);
  
  const onPress = () => {
    if (props.user.userrole == 1){
      props.navigation.navigate('QUESTIONS');
    } else {
      console.log('I am here')
      props.navigation.navigate('ANSWERS');
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/bell.png')} style={{marginTop: '30%', marginBottom: 40}}/>
      <Text style={styles.textStyle}>
        You've got a message!
      </Text>
      <Text style={styles.bodyStyle}>
          We'll let you know when teachers answer your questions.
      </Text>
      <CustomBlueButton title='Turn on notifications' onPress={onPress}/>
      <TouchableOpacity onPress={() => props.navigation.navigate('ANSWERS')} style={{marginTop: 70}}>
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
    paddingHorizontal: 25
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
