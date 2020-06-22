import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView
} from 'react-native';
import {logOut} from '../../redux/actions/Auth';
import {bindActionCreators} from 'redux'; 
import {connect} from 'react-redux';

const Account = (props) => {
  const [value, setValue] = useState('')
  const [visible, setVisible] = useState(false)
  const data = [
    {
      title: 'Personal Detail',
      content: 'Your account details',
    },
    {
      title: 'Change Password',
      content: 'Update your security',
    },
    {
      title: 'Chat with us',
      content: 'Tell us about your experience and suggestioins',
    },
    {
      title: 'Payment Details',
      content: 'Your payment details',
    },
    {
      title: 'Notifications',
      content: 'Set your preferences',
    },
    {
      title: 'LEGAL STUFF',
      content: '',
    },
    {
      title: 'Terms & Conditions',
      content: 'Learn about your rights',
    },
    {
      title: 'Privacy Policy',
      content: 'How we use your information',
    },
    {
      title: 'SETTINGS',
      content: '',
    },
    {
      title: 'Log Out',
      content: 'Sign out of your account',
    }
  ]

  const onlogout = () => {
    props.logOut();
    props.navigation.navigate('Login');
  }

  const renderItem = ({item, index}) => {
    return (
      <View style={{marginHorizontal: 20}}>
        {item.content != ''?
        <TouchableOpacity onPress={() => onlogout()} style={{flexDirection: 'row', justifyContent:'center'}}>
          <View style={{flex:6, marginLeft: 40}}>
            <Text style={styles.nameTextStyle}>{item.title}</Text>
            <Text style={styles.contentTextStyle}>{item.content}</Text>
          </View>
          <View style={{flex: 1}}>
          </View>         
        </TouchableOpacity>
        :
        <Text style={styles.subsectionTextStyle}>
          {item.title}
        </Text>
        }
        {item.content != '' &&
          <View style={styles.dashline}/>
        }
      </View>
    )
  } 
  return (
    <View style={styles.container}>
      <ScrollView style={{marginTop: 30, marginBottom: 30}}>
        <FlatList
          data={data}
          extraData={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
        />
        <View style={styles.logoViewStyle}>
          <Image source={require('../../assets/images/smalllogo.png')} style={{alignSelf: 'center'}}/>
          <Text style={styles.logoTextStyle}>
            Yolingo 1.0
          </Text>
        </View>
      </ScrollView>
    </View>
);
}
const mapStateToProps = state => {
  return{

  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    logOut
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Account)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
    },
    background: {
      height:135,
      backgroundColor: '#E5D9E5',
      borderBottomLeftRadius: 30, 
      borderBottomRightRadius: 6,
    },
    dashline : {
      borderWidth: 1,
      borderColor: '#878781',
      marginVertical: 15
    },
    nameTextStyle: {
      fontFamily: 'Roboto', 
      fontSize: 20,
      fontWeight: 'bold'
    },
    contentTextStyle: {
      fontFamily: 'sans-serif-light', 
      fontSize: 14,
      fontWeight: 'bold', 
      color: '#6C6C6C',
      marginVertical: 0
    },
    subsectionTextStyle: {
      fontFamily: 'sans-serif', 
      fontSize: 16,
      fontWeight: 'bold', 
      color: '#000',
      marginBottom: 20,
      marginLeft: 40
    },
    logoViewStyle: {
      flexDirection: 'row',
      alignSelf: 'center',
      marginTop: 30
    },
    logoTextStyle: {
      textAlignVertical: 'bottom',
      fontSize: 16,
      fontWeight: 'bold',
      marginHorizontal: 5
    }
  });