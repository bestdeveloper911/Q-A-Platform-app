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
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {updateSession} from '../../service/QA';
import ImagePicker from 'react-native-image-picker';
import database, { firebase } from '@react-native-firebase/database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';

const TeacherQA = (props) => {
  const [content, setContent] = useState('');
  const [qAList, setQAList] = useState([]);
  const [questionuid,setQuestionuid ] = useState('');
  const [answerLength, setAnswerLength ] = useState(0);
  const [questionLength, setQuestionLength ] = useState(0);
  const [answeruid,setAnsweruid ] = useState('');
  const scrollViewRef = useRef();
  const onInputText = (text) => {
    setContent(text)
  } 
   
  useEffect(() => {
    const questionitem = props.navigation.getParam('questionitem')
    const getsubscribe = props.navigation.addListener('didFocus',()=> {
      database()
      .ref(`/users/${questionitem.uid}`)
      .once('value')
      .then(snapshot => {
        global.session_amount = snapshot.val().session_amount;
      })
    })

    async function fetchQAList(){
        database()
        .ref(`/answer`)
        .orderByChild('touid')
        .equalTo(questionitem.uid)
        .on('value', snapshot => {
          let alist = []
          let questionUID = []
          let answerUID = []
          snapshot.forEach(item => {
            if (item.val().parentkey == questionitem.parentkey){
              alist.push(item.val());
              answerUID.push(item.val().uid);
            }
          })
          database()
            .ref(`/question`)
            .orderByChild('uid')
            .equalTo(questionitem.uid)
            .on('value', subsnapshot => {
              let qlist = []
              subsnapshot.forEach(subitem => {
                if (subitem.val().parentkey == questionitem.parentkey){
                    qlist.push(subitem.val());
                    questionUID.push(subitem.val().uid);
                }
              })
              let qalist = [...qlist, ...alist];
              setQAList(qalist.sort(function(a,b){return a.timestamp - b.timestamp})); 
              setAnswerLength(answerUID.length);
              setQuestionLength(questionUID.length);
              setQuestionuid([...new Set(questionUID)]);
              setAnsweruid([...new Set(answerUID)])
              // let qaList = []
              // qaList = qalist.filter(item => {return item.questionkey == questionitem.key})
          })
        })
    }
    fetchQAList()

    return () => {
      getsubscribe.remove()
    }
  },[])

  const addPhotos = async() => {
    const questionitem = props.navigation.getParam('questionitem')
    ImagePicker.showImagePicker(options, async(response) => {    
      if (response.didCancel) {
        Toast.show('Cancelled')
      } else if (response.error) {
        Toast.show('Camera Error')
      } else {
        const source = { uri: response.uri };
        let nameArray = source.uri.split('/');
        let imageName = nameArray[nameArray.length-1]
        const reference = storage().ref(imageName);
        await reference.putFile(source.uri)
        const url = await reference.getDownloadURL().catch((error) => { throw error });
        const newReference = database()
        .ref('/answer')
        .push();
        newReference
          .set({
            content: content,
            url: url,
            uid: props.user.uid,
            touid: questionitem.uid,
            email: props.user.email,
            usertype: props.user.userrole,
            contenttype: 'image',
            key: newReference.key,
            type: 'answer',
            parentkey: questionitem.parentkey,
            ishistory: true,
            questionkey: questionitem.key,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          })
          .then(() => {
            setContent('')
        });
      }
    });
  }

  const sendMessage = async() => {
    const questionitem = props.navigation.getParam('questionitem')
    if (content == ''){
      return
    }
    if (/\s$/.test(content)){
      return
    }
    const newReference = database()
      .ref('/answer')
      .push();
    
      newReference
      .set({
        content: content,
        uid: props.user.uid,
        touid: questionitem.uid,
        email: props.user.email,
        usertype: props.user.userrole,
        contenttype: 'text',
        key: newReference.key,
        parentkey: questionitem.parentkey,
        questionkey: questionitem.key,
        type: 'answer',
        timestamp: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        setContent('')
      });   
  }

  const closeSession = async() => {
    const questionitem = props.navigation.getParam('questionitem')
    await updateSession(qAList, questionuid, answeruid, questionitem.uid, props.user.uid, props.user.userrole);
    props.navigation.goBack();
  }


  const showMessage = () => {
    return qAList.length> 0 && qAList.map((item, index) => {
        return (
          <View key={index} style={
            item.type == 'answer' ? styles.messageAnswer : styles.messageQuestion
          }>
            {item.type == 'answer' ?
                <View style={{ flexDirection: 'row-reverse', maxWidth: '80%'}}>
                   <View style={[styles.nameViewStyle, {backgroundColor: '#B8DEDE', alignSelf:'flex-end'}]}>
                    <Text style={styles.nameTextStyle}>
                      ME
                    </Text>
                  </View>
                  <View style={styles.textMessageContentAnswer}>
                    {item.contenttype == 'text'?
                      <Text style={styles.textMessageAnswer}>
                          {item.content}
                      </Text>
                      :
                      <Image source={{uri: item.url}} style={{width: 180, height: 220, marginVertical: 5}}/>
                    }
                  </View>
                 
                </View>
                :
                <View style={{ flexDirection: 'row', maxWidth: '80%' }}>
                    <View style={[styles.nameViewStyle, {backgroundColor: '#C1E9F5'}]}>
                      <Text style={styles.nameTextStyle}>
                        US
                      </Text>
                    </View>
                    <View>
                     <View style={styles.textMessageContentQuestion}>
                      {item.contenttype == 'text'?
                          <Text style={styles.textMessageQuestion}>
                              {item.content}
                          </Text>
                          :
                          <Image source={{uri: item.url}} style={{width: 180, height: 220, marginVertical: 5}}/>
                      }
                      </View>
                    </View>
                </View>
            }
        </View>
        )
    })
  } 

  return (
    <View style={styles.teacherContainer}>
      <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backbuttonStyle}>
        <Fontisto name='angle-left' color='#F6323E' size={32}/>
      </TouchableOpacity>
      <Text style={styles.QAtitleTextStyle}>
          Q & A
      </Text>
      <KeyboardAwareScrollView 
        ref={scrollViewRef} style={{flex:1, marginTop: 35}}
        onContentSizeChange={(contentWidth, contentHeight) => {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }}
      >     
        {showMessage()}
      </KeyboardAwareScrollView>
      {questionLength >0 && answerLength> 0&&
      <TouchableOpacity onPress={() => closeSession()} style={styles.closeButtonStyle}>
        <Text style={styles.closeButtonTextStyle}>
          Close Session
        </Text>
      </TouchableOpacity>
      }
      <View style={{justifyContent:'center', marginVertical: Platform.OS == 'ios'?30:20}}>
        <View style={[styles.textInputWrapper]}>
          <TextInput 
              style={styles.textInput}
              multiline={true}
              value={content}
              placeholder="Type Message"
              // onFocus = {isShow}
              onChangeText={(text) => {
                onInputText(text)
              }}
              placeholderTextColor="#6C6C6C"
          />
          <View style={{position: 'absolute', flexDirection:'row', right: Platform.OS == 'ios'?15:10}}>
            {/* <TouchableOpacity style={{justifyContent:'center', marginHorizontal: Platform.OS == 'ios'?15:4}}>
              <FontAwesome name="paperclip" color='#aaa' size={28} style={[{ transform: [{ rotateX: '180deg' }] }]} />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => addPhotos()} style={{justifyContent:'center', marginHorizontal: Platform.OS == 'ios'?15:6}}>
              <Feather name='camera' color='#B3BDD8' size={24}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sendMessage()} style={{marginHorizontal: Platform.OS == 'ios'?5:2}}>
              <MaterialCommunityIcons name='send-circle' color='#B3BDD8' size={28}/>
            </TouchableOpacity>
          </View>            
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return{
    user: state.auth.user,
    subscribe: state.auth.subscribe
  } 
}

export default connect(mapStateToProps)(TeacherQA);

const styles = StyleSheet.create({
  teacherContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    marginHorizontal: 10
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
    closeButtonStyle:{
      width: '60%',
      height: 50,
      borderRadius: 20,
      backgroundColor: '#F6323E',
      alignSelf: 'center',
      justifyContent: 'center',
      marginBottom: 10
    },
    closeButtonTextStyle: {
      textAlign: 'center',
      color: '#FFF',
      fontWeight: '700',
      fontSize: 16
    }
  });

