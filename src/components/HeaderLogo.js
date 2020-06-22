import React from 'react';
import {View, Text, Image} from 'react-native';

const HeaderLogo = (props) => {
    return (
    <View style={{flexDirection:'row'}}>
        <Text style={{fontSize: 30, fontWeight: 'bold', letterSpacing: -1.5, textAlignVertical: 'center'}}>Yolingo</Text>
        <Image source={require('../assets/images/video-camera.png')} style={{alignSelf: 'center', top: 3, marginLeft: 3}}/>    
    </View>
    )    
}

export default HeaderLogo