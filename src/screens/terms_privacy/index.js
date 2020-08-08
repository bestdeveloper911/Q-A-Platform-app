import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  CheckBox
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import CustomBlueButton from '../../components/CustomBlueButton';
import {connect} from 'react-redux';

const imageData = [
  {url: require('../../assets/images/England-F.png')},
  {url: require('../../assets/images/Vietnam-F.png')},
  {url: require('../../assets/images/Indonesia-F.png')},
  {url: require('../../assets/images/Japan-F.png')},
  {url: require('../../assets/images/Thailand-F.png')},
  {url: require('../../assets/images/Laos-F.png')},
  {url: require('../../assets/images/Myanmar-F.png')},
  {url: require('../../assets/images/South-Korea-F.png')},
  {url: require('../../assets/images/Cambodia-F.png')}
]

const TermsPrivacy = (props) => {
  const [isSelected, setSelection] = useState(false);  
  const closePage = () => {
    const back = props.navigation.getParam('backpage');
    if (back == 'payment'){
      props.navigation.navigate('Payment')
    } else {
      props.navigation.goBack()
    }
  }

  const goTermPrivacy = (index) => {
    const item = props.navigation.getParam('item');
    if (item == 'terms'){
      props.navigation.navigate('Terms', {index: index})
    } else {
      props.navigation.navigate('Privacy', {index: index})
    }
  }

  return (
    <View style={styles.container}>      
      <TouchableOpacity onPress={() => closePage()} style={{position:'absolute', right: 15, top:15}}>
        <Fontisto name='close-a' size={30} color='#000'/>
      </TouchableOpacity>
      <Text style={styles.textStyle}>
        Choose a language
      </Text>
      <FlatList
        data={imageData}
        extraData={imageData}
        numColumns={3}
        renderItem={({item, index}) => {
          return(
            <TouchableOpacity onPress={() => goTermPrivacy(index)}>
              <Image source={item.url} style={styles.flag}/>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item, index) => item.url}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(TermsPrivacy);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  backbuttonStyle:{
    position:'absolute',
    top: 20,
    left:0
  }, 
  textStyle: {
    fontSize: 24,
    color: '#000', 
    textAlign: 'center',
    fontFamily: 'notoserif',
    fontWeight: 'bold',
    marginTop: 80,
    marginBottom: 30
  },
  bodyStyle: {
    fontSize: 22, 
    color: '#000',
    fontFamily: 'notoserif',
    textAlign: 'center',
    marginBottom: 30
  },
  bottomTextStyle:{
    fontSize: 28,
    color: '#3C3C3B',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
    letterSpacing: 1
  },
  flag: {
    width: 100, 
    height: 60, 
    borderWidth: 1,
    borderColor: '#000', 
    marginHorizontal: 3, 
    marginVertical: 3
  }
});
