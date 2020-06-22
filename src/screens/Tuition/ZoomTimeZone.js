import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {SCREEN} from '../../common/Styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {connect} from 'react-redux';
import CheckBox from 'react-native-check-box';
import CustomBlueButton from '../../components/CustomBlueButton';
import HeaderLogo from '../../components/HeaderLogo';

const ZoomTimeZone = (props) => {
  const [selected, setSelected] = useState('');

  const SORTING_ITEMS = [
    'ICT', 'JST','KST', 'WIB', 'WITA', 'WIT', 'MMT'
  ]

  const onCheckedChanged = (name, val) => {
    if(!val){
      setSelected(name);
    }else{
      setSelected('');
    }
  }

  const onPress = () => {
    props.navigation.navigate('ZoomEmail')
  }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backbuttonStyle}>
          <Fontisto name='angle-left' color='#000' size={32}/>
        </TouchableOpacity>
        <View style={{alignItems: 'center', marginTop: 60}}>         
          <HeaderLogo/>
        </View>
        <Text style={styles.textStyle}>
          Please choose your time zone.
        </Text>
        <View style={{height: 280}}>
        <FlatList
          data={SORTING_ITEMS}
          extraData={selected}
          renderItem={({item})=>{
          let isSelected = item === selected
          return(
            <View style={{flexDirection:'row', marginVertical:4}}>
              <CheckBox
                checkBoxColor='#000'
                style={{marginRight: 5}}
                onClick={()=>{
                onCheckedChanged(item, isSelected)
                }}
                isChecked={isSelected}
              />
              <Text style={{textAlignVertical:'center', color:'#000', fontSize: 18, fontWeight:'700'}}>{item}</Text>
            </View>
          )
          }}
        />
        </View>
        <CustomBlueButton title='Continue' onPress={onPress}/>
      </View>
    );
}

const mapStateToProps = state => {
  return{
    user: state.auth.user
  } 
}

export default connect(mapStateToProps)(ZoomTimeZone);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      marginHorizontal: 15
    },
    textStyle: {
      fontSize: 26, 
      fontWeight: 'bold', 
      color: '#000',
      marginTop: 30,
      marginBottom: 30,
      marginHorizontal: 70,
      textAlign: 'center',
      fontFamily: 'sans-serif',
    },
    backbuttonStyle:{
      position:'absolute',
      top: 20,
      left:0
    },
  });

