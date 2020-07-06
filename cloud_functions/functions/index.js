const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp();

exports.QuestionNotification = functions.database
  .ref("question/{ID}")
  .onCreate(event => {
    const data = event._data;
    payload = {
      notification: {
        title: "Question",
        body: data.content,
      },
    };
   return admin
    .database()
    .ref('users')
    .once('value')
    .then(querySnapShot => {
        let users= [];
        querySnapShot.forEach (user => {
            let pushToken = user.val().token;
            let userrole = user.val().userrole;
            if (pushToken && pushToken !== '' && userrole == 1) {
              users.push (pushToken);
            }
        });
        return admin.messaging().sendToDevice(users, payload)
    })
});


exports.ZoomNotification = functions.database
  .ref("zoom/{ID}")
  .onCreate(event => {
    const data = event._data;
    payload = {
      notification: {
        title: 'Zoom',
        body: data.learneremail,
      },
    };
   return admin
    .database()
    .ref('users')
    .once('value')
    .then(querySnapShot => {
        let users= [];
        querySnapShot.forEach (user => {
            let pushToken = user.val().token;
            let userrole = user.val().userrole;
            if (pushToken && pushToken !== '' && userrole == 1) {
              users.push (pushToken);
            }
        });
        return admin.messaging().sendToDevice(users, payload)
    })
});

exports.AnswerNotification = functions.database
  .ref("answer/{ID}")
  .onCreate(event => {
    const data = event._data;
    payload = {
      notification: {
        title: 'Answer',
        body: data.content,
      },
    };
    const learnerUID = data.touid;
    return admin
        .database()
        .ref('users')
        .orderByChild('uid')
        .equalTo(learnerUID)
        .once('value')
        .then(querySnapShot => {
            let users= [];
            querySnapShot.forEach (user => {
                let pushToken = user.val().token;
                let userrole = user.val().userrole;
                if (pushToken && pushToken !== '' && userrole == 0) {
                    users.push (pushToken);
                }
            });
            return admin.messaging().sendToDevice(users, payload)
        })
});
