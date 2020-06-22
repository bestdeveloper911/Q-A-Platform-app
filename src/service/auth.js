import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database'

export const login =async ({vMobile , vPassword})=>{
    return await post_request({target : "login", body : {vMobile,vPassword}});
}

/* registeration  */
export const registerUser = async (name , email , password, uid) => {
  await database()
      .ref(`/users/${uid}`)
      .set({
        name: name,
        email: email,
        userrole: global.user,
        uid: uid,
        accept: false
      })
    .then(() => console.log('Data updated.'));
  }

export const loginUser = async (email, uid) => {
  const snapshot = await database()
    .ref(`/users/${uid}`)
    .once('value')
    return snapshot.val();
  }

export const updateTeacher = async(country, email, uid) => {
  database()
    .ref(`/users/${uid}`)
    .update({
      country: country,
      newEmail: email
   }).then(() => {return true})
}