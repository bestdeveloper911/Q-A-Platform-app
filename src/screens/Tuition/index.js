import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  ImageBackground
} from 'react-native';
import HeaderZoom from '../../components/HeaderZoom';
import {SCREEN} from '../../common/Styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {connect} from 'react-redux';
import CustomBlueButton from '../../components/CustomBlueButton';
import Dialog, { DialogButton, DialogContent } from 'react-native-popup-dialog';
import CustomInput from '../../components/CustomInput';

const Tuition = (props) => {
  const [isvisible, setIsvisible] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [email, setEmail] = useState('');
  const onPress = () => {
    setIsvisible(true);
  }

  const moveToCalendar = () => {
   props.navigation.navigate('ZoomCalendar')
  }

  if (props.user.userrole == 0)
    return (
      <View style={styles.learnercontainer}>
        <HeaderZoom onPress={moveToCalendar}/>
        <View style={{flex:1,marginHorizontal: 20}}>
          <ImageBackground source={require('../../assets/images/background.png')} style={styles.backgroundImageStyle}/>
          <View style={{position:'absolute', top: '10%', alignItems:'center', right:0, left:0}}>
            <Image source={require('../../assets/images/zoom-body.png')}/>
            <Text style={styles.answerTextStyle}>Get Help from our teachers with 15 minute live video tuition sessions using Zoom.</Text>
          </View>
        </View>
      </View>
    );
  else if (props.user.userrole == 1){
    return (
      <View style={styles.teacherContainer}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backbuttonStyle}>
          <Fontisto name='angle-left' color='#000' size={32}/>
        </TouchableOpacity>
          <View style={{flexDirection: 'row', marginTop: 70}}>
            <Text style={styles.titleTextStyle}>
              Yolingo
            </Text>
            <View style={{justifyContent: 'center', marginLeft: 5, marginTop: 3}}>
              <Image source={require('../../assets/images/video-camera.png')}/>
            </View>
          </View>
          <View style={styles.teacherCard}>
            <Image source={require('../../assets/images/avatar.png')} style={styles.avatarImageStyle}/>
            <Text style={styles.cardTextStyle}>Name:</Text>
            <Text style={styles.cardTextStyle}>Date:</Text>
            <Text style={styles.cardTextStyle}>Time:</Text>
            <Text style={styles.cardTextStyle}>Time Zone:</Text>
          </View>
          {isAccept?
            <View>
              <CustomInput 
                inputWrapperStyle={{
                    marginBottom: 40,
                    paddingLeft:10
                }}
                value={email}
                placeholder="email address"
                placeholderTextColor="#6C6C6C"
                onChangeText={(text)=>setEmail(text)}
              />
              <Text style={styles.bottomTextStyle}>
                Please send a Zoom email invitation to the recipient at the email address above.
              </Text>
            </View>
            :
            <CustomBlueButton title='Accept' ButtonStyle={{backgroundColor: '#F6323E'}} onPress={onPress}/>
          }
          <Dialog
            visible={isvisible}
            onTouchOutside={() => {setIsvisible(false)}}
            dialogStyle={styles.dialogStyle}
            >
            <DialogContent style={{height: SCREEN.HEIGHT*0.8, marginHorizontal: 30}}>
              <View style={{flex:1, alignItems: 'center'}}>
                <Text style={styles.modalTextStyle}>
                  Are you sure you want to accept this tuition session?
                </Text>
                <View style={{flexDirection: 'row', alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {setIsAccept(true); setIsvisible(false)}} style={styles.modalButtonStyle}>
                    <Text style={styles.buttonTextStyle}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {setIsAccept(false); setIsvisible(false)}} style={[styles.modalButtonStyle, {backgroundColor: '#347EE9'}]}>
                    <Text style={styles.buttonTextStyle}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </DialogContent>
        </Dialog> 
      </View>
    );
  }
}

const mapStateToProps = state => {
  return{
    user: state.auth.user
  } 
}

export default connect(mapStateToProps)(Tuition);

const styles = StyleSheet.create({
    learnercontainer: {
      flex: 1,
      backgroundColor: '#F6323E'
    },
    teacherContainer: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      marginHorizontal: 15
    },
    titleTextStyle: {
      fontSize: 32, 
      fontWeight: 'bold', 
      color: '#000',
      fontFamily: 'sans-serif',
      letterSpacing: -1
    },
    teacherCard: {
      borderColor: '#000',
      width: '85%',
      marginTop: 30,
      borderWidth: 2,
      borderRadius: 25,
      height: 200,
      marginBottom: 40
    },
    cardTextStyle:{
      fontSize: 18,
      fontWeight: '700',
      marginLeft: 20,
      marginBottom: 3
    },
    avatarImageStyle: {
      alignSelf: 'center', 
      marginTop: 5, 
      marginBottom: 15
    },
    backbuttonStyle:{
      position:'absolute',
      top: 20,
      left:0
    },
    dialogStyle:{
      width: SCREEN.WIDTH*0.8,
      height: SCREEN.HEIGHT*0.6
    },
    dialogContentStyle:{
        width: SCREEN.WIDTH*0.9,
        height: SCREEN.HEIGHT*0.8
    },
    modalTextStyle: {
      marginTop: 60, 
      fontSize: 30, 
      fontWeight: 'bold', 
      textAlign: 'center',
      marginBottom: 30
    },
    modalButtonStyle: {
      width: 80, 
      height: 70, 
      borderRadius: 10, 
      backgroundColor: '#F6323E',
      marginHorizontal: 10,
      justifyContent: 'center'
    },
    buttonTextStyle: {
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
      color: '#FFF'
    },
    bottomTextStyle: {
      textAlign: 'center', 
      fontSize: 20, 
      marginHorizontal: 50, 
      fontWeight: 'bold', 
      fontFamily: 'sans-serif-light'
    },
    //learner style//
    backgroundImageStyle: {
      width: SCREEN.WIDTH*0.9, 
      height: SCREEN.HEIGHT*0.7, 
      resizeMode: 'contain'
    },
    answerTextStyle: {
      textAlign:'center', 
      color: '#FFF', 
      fontSize: 28, 
      fontWeight: '700',
      marginHorizontal: 40,
      marginTop: 40, 
      fontFamily: 'Roboto'
    },
  });

