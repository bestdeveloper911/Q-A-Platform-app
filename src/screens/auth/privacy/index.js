import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  CheckBox
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import CustomBlueButton from '../../../components/CustomBlueButton';
import {connect} from 'react-redux';

const Privacy = (props) => {
  const [isSelected, setSelection] = useState(false);  
 
  return (
    <View style={styles.container}>      
      <TouchableOpacity style={{position:'absolute', right: 15, top:15}}>
        <Fontisto name='close-a' size={30} color='#000'/>
      </TouchableOpacity>
      <Text style={styles.textStyle}>
        Choose a language
      </Text>     
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Privacy);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  backbuttonStyle:{
    position:'absolute',
    top: 20,
    left:0
  }, 
  textStyle: {
    fontSize: 24,
    color: '#000', 
    textAlign: 'center',
    fontFamily: 'notoserif',
    fontWeight: 'bold',
    marginTop: 80,
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
