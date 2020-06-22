import React, {useState, Component, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import CustomButton from '../../../../components/CustomButton';
import {updateTeacher} from '../../../../service/auth';
import {connect} from 'react-redux';

const Email = (props) => {
  const [email, setEmail] = useState('');
  const country = props.navigation.getParam('country');

  useEffect(() => {
    
  },[])

  const movePage = async(item) => {
    const response = await updateTeacher(country, email, props.user.uid);
    console.log(response);
    props.navigation.navigate(item);
  }

  return (
    <View style={styles.container}>
      <View style={{marginTop: '40%', width: '100%', marginBottom: 50}}>
        <TextInput
          style={styles.textInputStyle}
          placeholder='Add your email address'
          placeholderTextColor='#FFF'
          onChangeText={text => setEmail(text)}
          value={email}
        />
      </View> 
      <CustomButton 
        textValue='Submit'
        onPress={() => movePage('Thanks')}
      />
    </View>
  );
}

const mapStateToProps = state => {
  return{
    user: state.auth.user
  } 
}
export default connect(mapStateToProps)(Email);
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
