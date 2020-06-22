import React, { Component } from 'react'
import {View} from 'react-native'
import {connect} from "react-redux";
import AppNavigation from './navigation';
import { LoadingModal } from './components/LoadingModal';
import withLoader from './redux/actions/withLoader';

class MainApp extends Component {
  constructor(props){
    super(props);
    console.disableYellowBox = true;

  }
 
  render() {
    return (
      <View style={{ flex: 1 }} >
        <AppNavigation />
      </View>
    )
  }
}
export default MainApp

