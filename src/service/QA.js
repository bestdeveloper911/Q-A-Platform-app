import database, { firebase } from '@react-native-firebase/database'
import { cos } from 'react-native-reanimated'

export const subscribe = async (status, uid) => {
   await database()
    .ref(`/users/${uid}`)
    .update({
      subscribe: status,
      session_amount: 15
   }).then(() => {return true})
}

export const getLearnerQuestionList = async(uid) => {
  database()
  .ref('/question')
  .orderByChild('uid')
  .equalTo(uid)
  .on('value', async(snapshot) => {
    let qalist = [];
    snapshot.forEach(item => {
      if (!item.val().isclose){
        qalist.push(item.val());
      }
    })
    database()
      .ref('/answer')
      .orderByChild('touid')
      .equalTo(uid)
      .on('value', subsnapshot => {
        subsnapshot.forEach(subitem => {
          if (!subitem.val().isclose){
            qalist.push(subitem.val());
          }
        })
        return qalist;
      })
})
}


export const updateSession = async(qalist, questionuid, answeruid, useruid, questionuseruid, userrole) => {
  qalist.map(item => {
    if (item.type == 'answer'){
      database()
      .ref(`/answer/${item.key}`)
      .update({
        isclose: true,
      })
      .then(() => console.log('Data updated.'));
    } else{
      database()
      .ref(`/question/${item.key}`)
      .update({
        isclose: true,
        questionuid: userrole == 1? questionuseruid: answeruid[0]
      })
      .then(() => console.log('Data updated.'));
    }
  })
  
  database()
    .ref(`/users/${useruid}`)
    .update({
      session_amount: global.session_amount - 1
    });
}
