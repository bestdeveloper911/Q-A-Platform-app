import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Platform
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import database, { firebase } from '@react-native-firebase/database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReadMore from 'react-native-read-more-text';
import {connect} from 'react-redux';

const TeacherQuestion = (props) => {
  const [content, setContent] = useState('');
  const [qAList, setQAList] = useState([]);
 
  const scrollViewRef = useRef();
 
  useEffect(() => {
    async function fetchQAList(){
      database()
      .ref('/question')
      .on('value', snapshot => {
        let qalist = [];
        snapshot.forEach(item => {
          if (item.val().newquestion && !item.val().isclose){
            qalist.push(item.val());
          }
        })
        qalist.sort(function(a,b){return a.timestamp-b.timestamp})
        setQAList(qalist);
      })
    }
    fetchQAList()
  },[])


  const _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{color: 'blue', marginTop: 5}} onPress={handlePress}>
        Read more
      </Text>
    );
  }
 
  const _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{color: 'blue', marginTop: 5}} onPress={handlePress}>
        Show less
      </Text>
    );
  }
 
  const _handleTextReady = () => {
    // ...
  }
  const showMessage = () => {
    return qAList.length> 0 && qAList.map((item, index) => {
        return (
          <TouchableOpacity activeOpacity={index != 0 && 1} onPress={() => index == 0 && props.navigation.navigate('TeacherQA', {questionitem: item})} key={index} style={styles.cardView}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}  opacity={index == 0? 1: 0.5}>
              <View style={[styles.nameViewStyle]}>
                <Image source={require('../../assets/images/user.png')} style={{width: 40, height: 40}}/>
                <Text>{item.username}</Text>
              </View>
              <View style={{flex: 1}}>
                <View style={styles.textMessageContentQuestion}>
                <ReadMore
                  numberOfLines={3}
                  renderTruncatedFooter={_renderTruncatedFooter}
                  renderRevealedFooter={_renderRevealedFooter}
                  onReady={_handleTextReady}>
                  <Text style={styles.textMessageQuestion}>
                    {item.content}
                  </Text> 
                </ReadMore>
                  
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )
    })
  } 



  return (
    <View style={styles.teacherContainer}>
      <KeyboardAwareScrollView 
        ref={scrollViewRef} style={{flex:1, marginTop: 35}}
        onContentSizeChange={(contentWidth, contentHeight) => {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }}
      >
      {qAList.length != 0?
      <>     
        {showMessage()}
      </>
      :
      <View style={styles.teacherContainer}>
        <Text style={styles.teacherBlankTextStyle}>
          There are currently no questions
        </Text>
      </View>
      }
      </KeyboardAwareScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  return{
    user: state.auth.user,
    subscribe: state.auth.subscribe
  } 
}

export default connect(mapStateToProps)(TeacherQuestion);

const styles = StyleSheet.create({
  teacherContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    marginHorizontal: 10
  },
  teacherBlankTextStyle: {
    color: '#9D9D9C', 
    fontSize: 40, 
    textAlign: 'center',
    marginTop: 150,
    marginHorizontal: 40,
    letterSpacing: 2
  },
  teacherBlankTextStyle1: {
    color: '#fdd2d5', 
    fontSize: 44, 
    textAlign: 'center', 
    marginHorizontal: 40,
    marginTop: 80,
    fontFamily: 'sans-serif-medium',
    fontWeight:'bold',
    letterSpacing: 1
  },
  teacherBlankTextStyle2: {
    color: '#fdd2d5', 
    fontSize: 22, 
    textAlign: 'center', 
    marginHorizontal: 40,
    marginTop: 10,
    fontFamily: 'sans-serif-medium',
    fontWeight:'bold',
    letterSpacing: 1
  },
  backbuttonStyle:{
    position:'absolute',
    top: 20,
    left:0,
    zIndex: 99
  },
  QAtitleTextStyle: {
    textAlign: 'center', 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 25, 
    color: '#F6323E'
  },
  textInputWrapper: {
    height: 55,
    borderRadius: 50,
    backgroundColor: '#F2F2F2',
    marginHorizontal: 5,
    justifyContent: 'center'
  },
  textInput: {
      fontSize: 16,
      paddingHorizontal: 24,
      paddingVertical: 5,
      paddingRight:120,
      color: '#000',
      fontFamily: 'Roboto'
  },

  //-------chatScreenStyle---------//
    nameTextStyle: {
      fontFamily: 'Roboto', 
      fontSize: 16,
      color: '#FFF'
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
    nameViewStyle: {
      width: 60, 
      height: 60, 
      borderRadius: 10, 
      justifyContent:'center',
      alignSelf: 'center', 
    },
    contentTextStyle: {
      fontFamily: 'Roboto', 
      fontSize: 12, 
      color: '#6C6C6C',
      marginVertical: 3
    },
    messageQuestion: {
      alignSelf: 'flex-start',
      paddingHorizontal: 5,
      paddingVertical: 8
    },
    messageAnswer: {
      alignItems: 'flex-end',
      paddingHorizontal: 5,
      paddingVertical: 8
    },
    textMessageAnswer: {
      fontFamily: 'Roboto',
      color: '#FFF',
      fontSize: 14
    },

    textMessageQuestion: {
      fontFamily: 'Roboto',
      fontSize: 14,
    },
    textMessageContentQuestion: {
      flexDirection: 'column', 
      marginLeft: 10, 
      backgroundColor: '#FAF4F9', 
      paddingHorizontal: 18, 
      paddingVertical: 12,
      borderTopLeftRadius:3,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      alignSelf: 'flex-start',
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

