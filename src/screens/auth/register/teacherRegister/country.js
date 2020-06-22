import React, {useState, Component, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import CheckBox from 'react-native-check-box';
import CustomButton from '../../../../components/CustomButton';

const Country = (props) => {
  const [selected, setSelected] = useState('');

  useEffect(() => {
    //selected
  }, [])

  const movePage = (item) => {
    props.navigation.navigate(item, {country: selected});
  }

  const SORTING_ITEMS = [
    'Japan', 'South Korea','Laos', 'Myanmar', 'Vietnam', 'Thailand', 'Indonesia', 'UK', 'Other'
  ]
  const onCheckedChanged = (name, val) => {
    if(!val){
      setSelected(name);
    }else{
      setSelected('');
    }
  }

  return (
    <View style={styles.container}>
      <View style={{marginTop: '25%', marginBottom:30}}>
        <Text style={styles.titleStyle}>
          Which Country do
        </Text>
        <Text style={styles.titleStyle}>
          you currently live in
        </Text>
      </View>
      <FlatList
        data={SORTING_ITEMS}
        extraData={selected}
        renderItem={({item})=>{
          let isSelected = item === selected
          return(
            <View style={{flexDirection:'row', marginVertical:4}}>
              <CheckBox
                checkBoxColor='#FFF'
                style={{marginRight: 5}}
                onClick={()=>{
                  onCheckedChanged(item, isSelected)
                }}
                isChecked={isSelected}
              />
              <Text style={{textAlignVertical:'center', color:'#FFF', fontSize: 18, fontWeight:'700'}}>{item}</Text>
            </View>
          )
        }}
      />
      <CustomButton
        ButtonStyle={{marginBottom: 80}} 
        textValue='Continue'
        onPress={() => movePage('Email')}
      />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6323E',
    alignItems: 'center',
    paddingHorizontal: 40
  },
  titleStyle: {
    fontSize: 26, 
    color: '#FFF', 
    fontWeight:'700', 
    textAlign: 'center',
    fontFamily: 'Arial',
    letterSpacing: 1
  },
  bodyStyle: {
    fontSize: 16, 
    color: '#FFF', 
    fontWeight:'700', 
    fontFamily: 'Arial',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 30
  },
  buttonStyle:{
    width: '100%',
    height: 60,
    borderRadius: 18,
    backgroundColor: '#FFF',
    marginBottom: 80,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  login: {
    letterSpacing: 1,
    fontSize: 17,
    color: '#FFF',
    fontWeight:'bold'
  }
});

export default Country;
