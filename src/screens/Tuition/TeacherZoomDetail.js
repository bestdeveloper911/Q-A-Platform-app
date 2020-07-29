import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import database from '@react-native-firebase/database';
import {SCREEN} from '../../common/Styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {connect} from 'react-redux';
import CustomBlueButton from '../../components/CustomBlueButton';
import Dialog, { DialogButton, DialogContent } from 'react-native-popup-dialog';
import CustomInput from '../../components/CustomInput';
import { acceptZoom } from '../../service/Zoom';

const TeacherZoomDetail = (props) => {
  const [isvisible, setIsvisible] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [timezone, setTimezone] = useState('');
  const [email, setEmail] = useState('')
  const [showinfomation,setShowinfomation] = useState(false);
  const zoomItem = props.navigation.getParam('zoomitem');
  useEffect(() => {
    const zoomItem = props.navigation.getParam('zoomitem');
    database()
    .ref('/users')
    .orderByChild('uid')
    .equalTo(zoomItem.from)
    .once('value')
    .then(snapshot => {
      snapshot.forEach(element => {
        setName(element.val().name)  
      });
      // setDate(zoomItem.)
    })
    
  })

  const onPress = () => {
    setIsvisible(true);
  }

  useEffect(() => {
    if (showinfomation){
      setTimeout(() => {
        setShowinfomation(false)
      }, 1500)
    }
  }, [showinfomation])

  const onAccept = async() => {
    const zoomItem = props.navigation.getParam('zoomitem');
    await acceptZoom(zoomItem);
    setIsAccept(true); 
    setIsvisible(false)
  }
 
  const onshowInformation = () => {
    switch(zoomItem.timezone){
      case 'MMT': setTimezone('Myanmar Time'); break;
      case 'ICT': setTimezone('Indochina Time'); break;
      case 'WIB': setTimezone('Western Indonesian Time'); break;
      case 'WITA': setTimezone('Central Indonesian Time'); break;
      case 'WIT': setTimezone('Eastern Indonesian Time'); break;
      case 'KST': setTimezone('Korea Standard Time'); break;
      case 'JST': setTimezone('Japan Standard Time'); break;
    }
    setShowinfomation(true); 
  }

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
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.cardTextStyle}>Name:</Text>
            <Text style={styles.cardTextStyle1}>{name}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.cardTextStyle}>Date:</Text>
            <Text style={styles.cardTextStyle1}>{zoomItem.date}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.cardTextStyle}>Time:</Text>
            <Text style={styles.cardTextStyle1}>{zoomItem.time}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.cardTextStyle}>Time Zone:</Text>
            <Text style={styles.cardTextStyle1}>{zoomItem.timezone}</Text>
            <TouchableOpacity onPress={() => onshowInformation()} style={{marginLeft: 70, alignSelf: 'center'}}>
              <Image source={require('../../assets/images/info.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        {isAccept?
          <View>
            <CustomInput 
              inputWrapperStyle={{
                  marginBottom: 40,
                  paddingLeft:10
              }}
              value={zoomItem.learneremail}
              editable={false}
              placeholder="email address"
              placeholderTextColor="#6C6C6C"
              // onChangeText={(text)=>setEmail(text)}
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
                <TouchableOpacity onPress={() => onAccept()} style={styles.modalButtonStyle}>
                  <Text style={styles.buttonTextStyle}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setIsAccept(false); setIsvisible(false)}} style={[styles.modalButtonStyle, {backgroundColor: '#347EE9'}]}>
                  <Text style={styles.buttonTextStyle}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </DialogContent>
      </Dialog> 
      <Dialog
        visible={showinfomation}
        onTouchOutside={() => {setShowinfomation(false)}}
        dialogStyle={styles.dialogInfoStyle}
        >
        <DialogContent style={{justifyContent: 'center'}}>
          <View style={{flex:1, alignItems: 'center', marginTop: 40}}>
            <Text style={styles.modalInfoTextStyle}>
              {timezone}
            </Text>           
          </View>
        </DialogContent>
      </Dialog> 
    </View>
  );
}

const mapStateToProps = state => {
  return{
    user: state.auth.user
  } 
}

export default connect(mapStateToProps)(TeacherZoomDetail);

const styles = StyleSheet.create({
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
    marginBottom: 3,
    width: 100
  },
  cardTextStyle1:{
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 20,
    marginBottom: 3,
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
  dialogInfoStyle:{
    width: SCREEN.WIDTH*0.9,
    height: SCREEN.HEIGHT*0.2
  },
  modalTextStyle: {
    marginTop: 60, 
    fontSize: 30, 
    fontWeight: 'bold', 
    textAlign: 'center',
    marginBottom: 30
  },
  modalInfoTextStyle: {
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center',
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
 
});

