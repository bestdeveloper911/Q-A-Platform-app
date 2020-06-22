import React, { Component } from 'react'
import { 
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

export default class CustomButton extends Component {
  render() {
    const { ButtonStyle,textValue, onPress} = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, ButtonStyle]}>
        <Text style={styles.buttonText}>
          {textValue}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  buttonStyle:{
    width: '100%',
    height: 60,
    borderRadius: 18,
    backgroundColor: '#FFF',
    marginVertical: 30,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
})
