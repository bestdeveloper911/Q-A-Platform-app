import database, { firebase } from '@react-native-firebase/database'

export const createZoom = async (uid, date, time, timezone, emailAddress, name) => {
    const newReference = database()
        .ref('/zoom')
        .push();

        newReference
          .set({
            from: uid,
            date: date,
            time: time,
            timezone: timezone,
            learneremail: emailAddress,
            key: newReference.key,
            type: 'zoom',
            name: name,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          })
          .then(() => {
           console.log('zoom created')
        });
}

export const getZoomList = async (date, time, timezone, emailAddress) => {
  database()
    .ref('/zoom')
    .on('value', snapshot=> {
      let zoomlist = [];
      snapshot.forEach(element => {
        zoomlist.push(element.val())
      });
      return zoomlist
  })
}

export const acceptZoom = async(item) => {
  database()
    .ref(`/zoom/${item.key}`)
    .update({
      isaccept: true,
  })
}