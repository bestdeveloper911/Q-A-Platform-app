import React, {useState, Component, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import CustomButton from '../../../../components/CustomButton'
import Fontisto from 'react-native-vector-icons/Fontisto'

const TeacherCreate = (props) => {
  const [value, onChangeText] = useState('');

  const movePage = (item) => {
    props.navigation.navigate(item);
  }

  return (
    <View style={styles.container}>
      <View style={{marginTop: '40%', width: '100%', marginBottom: 50}}>
        <TextInput
          style={styles.textInputStyle}
          placeholder='Add your email address'
          placeholderTextColor='#FFF'
          onChangeText={text => onChangeText(text)}
          value={value}
        />
      </View> 
      <CustomButton 
        textValue='Submit'
        onPress={() => movePage('Thanks')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6323E',
    alignItems: 'center',
    paddingHorizontal: 40
  },
  textInputStyle: {
    height: 40, 
    textAlign: 'center',
    color: '#FFF',
    borderColor: '#FFF', 
    fontSize: 20,
    borderBottomWidth: 2,
    paddingHorizontal: 30
  }
});

export default TeacherCreate;
