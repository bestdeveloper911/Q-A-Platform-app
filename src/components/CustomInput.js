import React, { Component } from 'react'
import { 
    StyleSheet,
    View,
    TextInput,
    Text
} from 'react-native'

export default class CustomInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            isfocus: false
        }
    }
    render() {
      const { inputWrapperStyle, inputStyle} = this.props;
      return (
        <View style={[styles.textInputWrapper, inputWrapperStyle ]}>
          <TextInput 
              style={[styles.textInput, inputStyle]}
              {...this.props}
          />
        </View>
      )
    }
}

const styles = StyleSheet.create({
    textInputWrapper: {
        flexDirection: 'row',
        height: 55,
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 1,
        backgroundColor: '#F2F2F2',
        marginHorizontal: 28,
        // justifyContent: 'center',
        overflow: 'hidden'
    },
    textInput: {
        fontSize: 16,
        paddingHorizontal: 24,
        paddingVertical: 5,
        color: '#000',
        width: '100%',
        fontFamily: 'Roboto-LightItalic'
    },
})
