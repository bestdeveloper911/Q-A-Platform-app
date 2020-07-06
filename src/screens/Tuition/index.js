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
import database from '@react-native-firebase/database';

const Tuition = (props) => {
  const [zoomList, setZoomList] = useState([]);
  
  useEffect(() =>{
    database()
    .ref('/zoom')
    .on('value', snapshot=> {
      let zoomlist = [];
      snapshot.forEach(element => {
        if (!element.val().isaccept){
          zoomlist.push(element.val())
        }
      });
      setZoomList(zoomlist);
  })
  }, [])

  const moveToCalendar = () => {
    props.navigation.navigate('ZoomCalendar')
  }

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('TeacherZoomDetail', {zoomitem: item})} key={index} style={styles.cardView}>
        <View style={{ flexDirection: 'row', maxWidth: '80%' }}>
          <View style={[styles.nameViewStyle]}>
            <Image source={require('../../assets/images/user.png')} style={{width: 40, height: 40}}/>
            <Text>{item.name}</Text>
          </View>
          <View>
            <View style={styles.textMessageContentQuestion}>
              <Text style={styles.textMessageQuestion}>
                {item.date} | {item.time} | {item.timezone}
              </Text> 
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
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
        {zoomList.length != 0?
          <FlatList
            data={zoomList}
            extraData={zoomList}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id}
          />
          :
          <View style={styles.blankView}>
            <Text style={styles.teacherBlankTextStyle}>
              There are currently no Zoom tuition sessions
            </Text>
          </View>
        }
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
      // alignItems: 'center',
    },
    blankView: {
      flex:1,
      justifyContent: 'center',
      alignSelf: 'center'
    },
    teacherBlankTextStyle: {
      color: '#9D9D9C', 
      fontSize: 40, 
      textAlign: 'center', 
      marginHorizontal: 40,
      letterSpacing: 2,
      fontWeight: 'bold'
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
    nameTextStyle: {
      fontFamily: 'Roboto', 
      fontSize: 16,
      color: '#FFF'
    },
    nameViewStyle: {
      width: 70, 
      height: 40, 
      borderRadius: 10, 
      justifyContent:'center',
      alignSelf: 'center', 
      alignItems:'flex-start'
    },
    contentTextStyle: {
      fontFamily: 'Roboto', 
      fontSize: 12, 
      color: '#6C6C6C',
      marginVertical: 3
    },
    cardView: {
      marginHorizontal: 10,
      borderColor: 'gray',
      backgroundColor: '#FAF4F9', 
      borderWidth: 1,
      borderRadius: 10,
      marginVertical: 7,
      paddingHorizontal: 5,
      paddingVertical: 8
    },
    textMessageContentQuestion: {
      flexDirection: 'column', 
      marginLeft: 10, 
      // backgroundColor: '#FAF4F9', 
      paddingHorizontal: 18, 
      paddingVertical: 12,
      borderTopLeftRadius:3,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      alignSelf: 'flex-start'
    },
    textMessageQuestion: {
      fontFamily: 'Roboto',
      fontSize: 16
    },
    textMessageContentAnswer: {
      // flexDirection: 'column', 
      marginRight: 10, 
      backgroundColor: '#fe524d', 
      paddingHorizontal: 10, 
      paddingVertical: 10,
      borderTopLeftRadius:10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 3,
      // alignSelf: 'flex-end'
    },
  });

