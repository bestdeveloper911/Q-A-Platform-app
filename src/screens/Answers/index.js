import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground
} from 'react-native';
// import {getquestionList} from '../../service/QA';
import HeaderAnswer from '../../components/HeaderAnswer';
import {SCREEN} from '../../common/Styles';
import {connect} from 'react-redux';
import database from '@react-native-firebase/database';

const Answers = (props) => {
  const [subscribe, setSubscribe] = useState(false);
  const [sessionAmount, setSessionAmount] = useState(false);
  useEffect(() => {
    const getsubscribe = props.navigation.addListener('didFocus', () => {
      database()
      .ref(`/users/${props.user.uid}`)
      .once('value')
      .then(snapshot => {
        setSubscribe(snapshot.val().subscribe);
        setSessionAmount(snapshot.val().session_amount);
        global.session_amount = snapshot.val().session_amount;
      })
    })
    return () => {
      getsubscribe.remove()
    }
  }, [])


  const moveToSubscribe = () => {
    if (subscribe){
      props.navigation.navigate('LearnerQA')
    } else {
      props.navigation.navigate('Payment')
    }
  }

  if (props.user.userrole == 0)
    return (
      <View style={styles.container}>
        <HeaderAnswer onPress={moveToSubscribe}/>
        <View style={{flex:1,marginHorizontal: 20}}>          
          {subscribe?
          <View style={styles.bodyCard}>
            <Text style={styles.numberTextStyle}>
              {sessionAmount}
            </Text>
            <View style={styles.divide}/>
            <View style={styles.cardTextStyle}>
              <Text style={{fontSize: 16, color: '#000', fontWeight: '700', flexWrap: 'wrap'}}>
                The amount of questioin sessions you have left this month.
              </Text>
            </View>
          </View>
          :
          <View style={styles.bodyEmptyCard}>
          </View>
          }
          <ImageBackground source={require('../../assets/images/background.png')} style={styles.backgroundImageStyle}/>
          <View style={{position:'absolute', top: '20%', alignItems:'center', right:0, left:0}}>
            <Image source={require('../../assets/images/handphone.png')}/>
            <Text style={styles.questionTextStyle}>ASK A QUESTION</Text>
            <Text style={styles.answerTextStyle}>Get quick answers</Text>
          </View>
        </View>
      </View>
    );
  else if (props.user.userrole == 1){
    return (
      <View style={styles.teacherContainer}>
        <Text style={styles.teacherBlankTextStyle}>
          There are currently no questions
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return{
    user: state.auth.user,
    subscribe: state.auth.subscribe
  } 
}

export default connect(mapStateToProps)(Answers);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F6323E'
    },
    teacherContainer: {
      flex: 1,
      backgroundColor: '#FFF',
      justifyContent: 'center',
    },
    teacherBlankTextStyle: {
      color: '#9D9D9C', 
      fontSize: 40, 
      textAlign: 'center', 
      marginHorizontal: 40,
      letterSpacing: 2
    },
    backgroundImageStyle: {
      width: SCREEN.WIDTH*0.9, 
      height: SCREEN.HEIGHT*0.7,
      marginTop: -60, 
      resizeMode: 'contain'
    },
    bodyCard: {
      height: 80,
      marginTop: 10,
      marginHorizontal: 10,
      backgroundColor: '#FFF',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#000',
      flexDirection: 'row',
      zIndex: 10
    },
    bodyEmptyCard: {
      height: 80,
      marginHorizontal: 10,
    },
    divide: {
      width: 1, 
      borderWidth: 1,
      height: '75%',
      borderColor: '#000',
      alignSelf: 'center',
      justifyContent: 'center'
    },
    numberTextStyle: {
      fontSize: 50, 
      fontWeight: 'bold', 
      textAlignVertical: 'center', 
      marginHorizontal: 10
    },
    cardTextStyle: {
      marginLeft: 20,
      marginRight: 40,
      marginVertical: 10,
      flex: 1,
      flexDirection: 'row'
    },
    questionTextStyle: {
      textAlign:'center', 
      color: '#FFF', 
      fontSize: 50, 
      fontWeight: '700', 
      marginTop: 20,
      marginBottom: 5, 
      marginHorizontal: 40, 
      fontFamily: 'sans-serif-medium',
      letterSpacing:2
    },
    answerTextStyle: {
      textAlign:'center', 
      color: '#FFF', 
      fontSize: 28, 
      fontWeight: '700',
      marginHorizontal: 40, 
      fontFamily: 'Roboto'
    },
   
  });

