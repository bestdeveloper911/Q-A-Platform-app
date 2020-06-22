import React, {Fragment, Component, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View
} from 'react-native';
import Svg, { G, Path } from "react-native-svg"
import {connect} from 'react-redux';
import {Login} from '../../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';

const Loading = (props) => {
  // const { error , loggedin , fetching } = props.login;
  useEffect(() => {
    setTimeout(async () => {
      props.navigation.navigate('Auth')
  }, 2000);
    // authChecker()
  },[])

  authChecker = async() => {
    const username =await AsyncStorage.getItem('username');
    const password =await AsyncStorage.getItem('password');
    props.dispatch(Login( username, password , device_id ));
  };

  // useEffect(() => {
  //   if(!fetching && error && !loggedin){
  //     props.navigation.navigate('Auth');
  //   }
  //   if(!fetching && !error && loggedin){
  //     props.navigation.navigate('App');
  //   }
  // },[fetching,error,loggedin])

    return (
      <Fragment>
        <View style={styles.container}>
          <View style={{width: 190, height:70}}>
          <Svg viewBox="0 0 117 40.45" {...props}>
            <G data-name="Layer 2">
              <G data-name="Layer 1" fill="#fff">
                <Path d="M0 0h5.49l8.14 12.15L21.86 0h5.51L15.91 16.6v14h-4.58v-14zM39.9 30.58V0h4.36v30.58zM47.11 4.73a2.57 2.57 0 01-.86-2 2.6 2.6 0 01.86-2 2.86 2.86 0 012-.81 2.9 2.9 0 012.07.8 2.64 2.64 0 01.83 2 2.6 2.6 0 01-.83 2 3.05 3.05 0 01-4.11 0zM47 30.58V10.79h4.37v19.79zM54 30.58V12.7h4.4v2.69a5.3 5.3 0 012.54-2.27 8.2 8.2 0 013.53-.81 7.38 7.38 0 015.57 2 8 8 0 012 5.81v10.46h-4.39v-9.94a4.57 4.57 0 00-1.11-3.28 4.05 4.05 0 00-3.05-1.16 5.66 5.66 0 00-3.63 1.16A4.37 4.37 0 0058.4 21v9.6zM73.58 20.73A10.66 10.66 0 0175 15.27a9.51 9.51 0 013.65-3.66 10.05 10.05 0 015-1.26 9.12 9.12 0 013.94.89 6.07 6.07 0 012.77 2.45v-2.9h4.37v16.87q0 6.6-2.87 9.7t-8.13 3.09a10.11 10.11 0 01-5.4-1.45 10.28 10.28 0 01-3.82-4.12c.25-.11.85-.41 1.79-.9s1.55-.79 1.81-.9a5.8 5.8 0 002.33 2.38 6.5 6.5 0 003.22.89 6.34 6.34 0 004.9-1.88q1.72-1.89 1.73-5.88v-1a5.73 5.73 0 01-2.72 2.52 9.1 9.1 0 01-4 .91 10.25 10.25 0 01-3.82-.72 10.12 10.12 0 01-3.19-2 9.29 9.29 0 01-2.17-3.3 11 11 0 01-.81-4.27zm4.49-.06a5.87 5.87 0 006 6.1 6.13 6.13 0 004.24-1.69 5.66 5.66 0 001.86-4.41 5.76 5.76 0 00-1.77-4.46 6.14 6.14 0 00-4.33-1.64 5.95 5.95 0 00-6 6.1zM97.72 26.07a10.44 10.44 0 01-1.42-5.44 10.28 10.28 0 011.42-5.41 9.54 9.54 0 013.76-3.62 11.32 11.32 0 0110.34 0 9.47 9.47 0 013.76 3.62 10.28 10.28 0 011.42 5.41 10.44 10.44 0 01-1.42 5.44 9.53 9.53 0 01-3.77 3.66 11.2 11.2 0 01-10.32 0 9.6 9.6 0 01-3.77-3.66zm3-5.44a5.94 5.94 0 001.72 4.43 6.16 6.16 0 008.52 0 5.94 5.94 0 001.72-4.43 5.7 5.7 0 00-1.72-4.32 6.32 6.32 0 00-8.52 0 5.7 5.7 0 00-1.77 4.32z" />
                <Path d="M36.84 15.22a9.5 9.5 0 00-3.77-3.62 11.32 11.32 0 00-10.34 0A9.54 9.54 0 0019 15.22a10.37 10.37 0 00-1.42 5.41A10.53 10.53 0 0019 26.07a9.67 9.67 0 003.77 3.66 11.2 11.2 0 0010.32 0 9.62 9.62 0 003.78-3.66 10.53 10.53 0 001.41-5.44 10.37 10.37 0 00-1.44-5.41zm-4.68 9.84a5.82 5.82 0 01-4.27 1.71h-.13l-2.12.68-3.58 1.16a12 12 0 002.09-2.1 3.86 3.86 0 00.35-.74l-.1-.07a6.36 6.36 0 01-.75-.64 5.91 5.91 0 01-1.73-4.43 5.67 5.67 0 011.73-4.32 5.9 5.9 0 014.24-1.65 5.93 5.93 0 014.27 1.65 5.71 5.71 0 011.73 4.32 5.94 5.94 0 01-1.73 4.43z" />
              </G>
            </G>
          </Svg>
          </View>
        </View>
      </Fragment>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6323E',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    alignSelf: 'center',
    height: 100,
    width: 300
  },
});

// const mapStateToProps = state => {
//   return {
//     login : state.LoginUser,
//   };
// };

// const LoadingScreen = connect(mapStateToProps)(Loading);
export default Loading;
