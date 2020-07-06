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
import {connect} from 'react-redux';

const History = (props) => {
  const [searchtext, setSearchtext] = useState('');
  const [qAList, setQAList] = useState([]);
  const [constant, setConstant] = useState([]);
  const scrollViewRef = useRef();
 
  useEffect(() => {
    async function fetchQAList(){
      if (props.user.userrole == 1){
        database()
          .ref('/question')
          .orderByChild('questionuid')
          .equalTo(props.user.uid)
          .on('value', snapshot => {
            let qalist = [];
            snapshot.forEach(item => {
              if (item.val().newquestion && item.val().isclose){
                qalist.push(item.val());
              }
            })
            qalist.sort(function(a,b){return a.timestamp-b.timestamp})
            setQAList(qalist);
            setConstant(qalist);
        })
      } else {
        database()
          .ref('/question')
          .orderByChild('uid')
          .equalTo(props.user.uid)
          .on('value', snapshot => {
            let qalist = [];
            snapshot.forEach(item => {
              if (item.val().newquestion && item.val().isclose){
                qalist.push(item.val());
              }
            })
            qalist.sort(function(a,b){return a.timestamp-b.timestamp})
            setQAList(qalist);
            setConstant(qalist);
        })
      }
    }
    fetchQAList()
  },[])

  const showMessage = () => {
    return qAList.length> 0 && qAList.map((item, index) => {
        return (
          <TouchableOpacity onPress={() => props.navigation.navigate('HistoryQA', {questionitem: item})} key={index} style={styles.messageQuestion}>
            <View style={{ flexDirection: 'row', maxWidth: '80%' }}>
              <View style={[styles.nameViewStyle, {backgroundColor: '#C1E9F5'}]}>
                <Text style={styles.nameTextStyle}>
                  QE
                </Text>
              </View>
              <View>
                <View style={styles.textMessageContentQuestion}>
                  <Text style={styles.textMessageQuestion}>
                      {item.content}
                  </Text> 
                </View>
                <View style={{marginLeft:25, marginTop: 5}}>
                  <Text style={{fontSize: 10, fontFamily: 'Roboto', color:'#B3BDD8'}}>
                    {item.time}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )
    })
  }

  const searchFilterFunction = (text) => {
    const newData = constant.filter(function(item) {
      const itemData = item.content ? item.content.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setQAList(newData);
    setSearchtext(text);
  }

  return (
    <View style={styles.teacherContainer}>
      <Text style={styles.QAtitleTextStyle}>
          History
      </Text>
      {props.user.userrole == 0 &&
      <TextInput
        style={styles.textInputStyle}
        onChangeText={text => searchFilterFunction(text)}
        value={searchtext}
        underlineColorAndroid="transparent"
        placeholder="Type keywords"
      />
      }
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
          There are currently no history
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

export default connect(mapStateToProps)(History);

const styles = StyleSheet.create({
  teacherContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    marginHorizontal: 10
  },
  textInputStyle: {
    height: 45,
    borderWidth: 1,
    paddingLeft: 10,
    marginTop: 10,
    borderRadius: 5,
    borderColor: '#C1BABA',
    backgroundColor: '#FFFFFF',
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
    nameViewStyle: {
      width: 40, 
      height: 40, 
      borderRadius: 10, 
      justifyContent:'center', 
      alignItems: 'center'
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
      fontSize: 14
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
      alignSelf: 'flex-start'
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

