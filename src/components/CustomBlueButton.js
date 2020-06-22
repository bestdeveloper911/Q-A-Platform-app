import React, { Component } from 'react'
import { 
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

export default class CustomBlueButton extends Component {
  render() {
    const { title,ButtonStyle, onPress} = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, ButtonStyle]}>
        <Text style={styles.buttonText}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  buttonStyle:{
    width: '90%',
    height: 60,
    borderRadius: 25,
    backgroundColor: '#347EE9',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  },
})
