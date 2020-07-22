import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  CheckBox,
  ScrollView,
  FlatList,
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomBlueButton from '../../components/CustomBlueButton';
import HeaderLogo from '../../components/HeaderLogo';
import {createZoom} from '../../service/Zoom';
import {connect} from 'react-redux';
import database from '@react-native-firebase/database';

class ZoomBuySession extends React.Component {
  constructor(props){
    super(props);
    this.state={
      name: '',
      isSelected: false,
      productList: [],
			receipt: "",
			availableItemsMessage: "",
			purchaseIndicator: false,
			subscriptionIndicator: false,
			availableIndicator: false,
			modalVisible: false,
			validateItem: [],
    }
  }

  async componentDidMount(){
    database()
    .ref('/users')
    .orderByChild('uid')
    .equalTo(this.props.user.uid)
    .once('value')
    .then(snapshot => {
      snapshot.forEach(element => {
        this.setState({name: element.val().name})
        // setName(element.val().name)  
      });
    })
		try {
			const result = await RNIap.initConnection();
			if (Platform.OS === "android") {
				await RNIap.consumeAllItemsAndroid();
			}
		} catch (err) {
			console.warn(err.code, err.message);
		}
		this.retriveData()
	}

	getItemPurchaseInfo = async () => {
		try {
			this.setState({
				availableIndicator: true

			});
			const products = await RNIap.getProducts(itemSkus);
			if (Platform.OS === "ios") {
				this.setState(
					{
						productList: []
					},
					() => {
						this.getSubscriptionsInfo();
					}
				);
			} else {
				this.setState(
					{
						productList: products
					},
					() => {
						this.getSubscriptionsInfo();
					}
				);
			}
		} catch (err) {
			console.warn(err.code, err.message);
			if (Platform.OS === "ios") {
				this.setState(
					{
						productList: []
					},
					() => {
						this.getSubscriptionsInfo();
					}
				);
			} else {
				this.setState(
					{
						productList: products
					},
					() => {
						this.getSubscriptionsInfo();
					}
				);
			}

		}
	};

	getSubscriptionsInfo = async () => {
		try {
			const products = await RNIap.getSubscriptions(itemSubs);
			this.setState({
				productList: [],
				productList: [...this.state.productList, ...products],
				availableIndicator: false,
				modalVisible: true
			});
		} catch (err) {
			this.setState({
				availableIndicator: false,
				modalVisible: true
			});
			console.warn(err.code, err.message);
		}
	};

	afterSetStateChangePurchase = async () => {
		try {
			const products = await RNIap.getProducts(itemSkus);
			if (Platform.OS === "ios") {
				this.onPressSubscription(itemSkus[0]);
			} else {
				this.onPressProduct(products[0].productId);
			}
		} catch (err) {
			this.setState({
				purchaseIndicator: false,
			}, () => {
				console.warn(err.code, err.message);
			});
		}
	}

	// Purchase for android / iOS 
	getPurchases = async () => {
		this.setState({
			purchaseIndicator: true,
		}, () => {
			this.afterSetStateChangePurchase();
		});
	};

	afterSetStateChangeSubscription = async () => {
    const products = await RNIap.getSubscriptions(itemSubs);

		if (Platform.OS === "ios") {
			this.onPressSubscription(itemSubs[0]);
		} else {
			this.onPressSubscription(products[0].productId);
		}
	}

	// Subscription for android / iOS 
	getSubscriptions = async () => {
		try {
			this.setState({
				subscriptionIndicator: true,
			}, () => {
				this.afterSetStateChangeSubscription();
			});
		} catch (err) {
			this.setState({
				subscriptionIndicator: false,
			}, () => {
				console.warn(err.code, err.message);
			});

		}
	};

	onPressSubscription = async sku => {
		try {
			this.setState({
				purchaseIndicator: false,
				subscriptionIndicator: false,
			});

			const purchase = await RNIap.buySubscription(sku);

			if (Platform.OS === "ios") {
				this.receiptValidateIOS(purchase.transactionReceipt);
			} else {
				// Do stuff here for android server side validate receipt 
			}
		} catch (err) {
			this.setState({
				purchaseIndicator: false,
				subscriptionIndicator: false,
			}, () => {
				Alert.alert("Inapp", err.message);
			});
		}
	};

	onPressProduct = async sku => {
		try {
			this.setState({
				purchaseIndicator: false
			});
			const purchase = await RNIap.buyProduct(sku);
			const transaction = JSON.parse(purchase.transactionReceipt);
			if (Platform.OS === "android") {
				this.onConsumeProduct(transaction);
			} else {
				this.receiptValidateIOS(purchase.transactionReceipt);
			}
		} catch (err) {
			this.setState({
				purchaseIndicator: false
			}, () => {
				if (Platform.OS === "ios") {
					const subscription = RNIap.addAdditionalSuccessPurchaseListenerIOS(
						async purchase => {
							subscription.remove();
						}
					);
				}
			});
		}
	};

	onConsumeProduct = async sku => {
		try {
			await RNIap.consumePurchase(sku.purchaseToken);
			// Do stuff here for server side validate receipt 
		} catch (err) {
			if (Platform.OS === "ios") {
				const subscription = RNIap.addAdditionalSuccessPurchaseListenerIOS(
					async purchase => {
						subscription.remove();
					}
				);
			}
		}
	};

	saveData = async (result) => {
		try {
			var countries = await AsyncStorage.getItem('key');
			if (countries != null) {
				countries = JSON.parse(countries)
				if (!countries.includes(result)) {
					countries.push(result)
				}
				this.setState({
					validateItem: [],
					validateItem: countries,
				})
			}
			else {
				let arrProduct = []
				arrProduct.push(result)
				this.setState({
					validateItem: [],
					validateItem: arrProduct,
				})
			}
			console.log(this.state.validateItem);

			AsyncStorage.setItem('key', JSON.stringify(this.state.validateItem));

			console.log('success');
		} catch (error) {
			console.log('fail', error);

		}
	}

	retriveData = async () => {
		try {
			var myArray = await AsyncStorage.getItem('key');
			myArray = JSON.parse(myArray)
			if (myArray !== null) {
				this.setState({
					validateItem: myArray
				})
				console.log(this.state.validateItem);
			}
		} catch (error) {
			console.log(error);
		}
	}

	receiptValidateIOS = async receipt => {
		const receiptBody = {
			"receipt-data": receipt,
			password: "a740150a6e844879a53adcf1aacee812"
		};
		const result = await RNIap.validateReceiptIos(receiptBody, 1);
		const product = result.receipt.in_app[0].product_id
		this.setState({
			validateItem: [...this.state.validateItem, result.receipt.in_app[0].product_id],
			purchaseIndicator: false
		})
		this.saveData(result.receipt.in_app[0].product_id)
	};

	setModalVisible = visible => () => {
		this.setState({ modalVisible: visible });
  };
  
  closePage = () => {
   this.props.navigation.goBack();
  }

  renderItem = ({ item, index }) => {
		console.log(this.state.validateItem[index]);
		console.log(item.productId);
		return (
			<View style={{ flex: 1 }} key={index}>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={this.setModalVisible(!this.state.modalVisible)}>

					<Text style={{ fontWeight: "bold", color: "white" }}>
						{item.localizedPrice}
					</Text>
					<Text style={{ fontWeight: "bold", color: "black" }}>
						{item.currency}
					</Text>
					<Text style={{ fontWeight: "200", color: "white" }}>
						{item.description}
					</Text>
					{
						this.state.validateItem[index] === item.productId && (<Image style={styles.checkmark} source={checkMark} />)
					}
					<View style={styles.dividerContainer} />
				</TouchableOpacity>
			</View>
		);
	};

	_keyExtractor = (item, index) => item.productId;
  
  onPress = async() => {
    const response = await createZoom(this.props.user.uid, global.date, global.time, global.timezone, global.emailAddress, this.state.name);
    console.log(response)
    this.props.navigation.navigate('ZoomThanks');
  }

  closePage = () => {
    this.props.navigation.goBack();
  }
  
  render(){
    const {isSelected, name} = this.state;
    return (
      <ScrollView style={{flex:1}}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.closePage()} style={{position:'absolute', right: 15, top:15}}>
            <Fontisto name='close-a' size={30} color='#000'/>
          </TouchableOpacity>
          <View style={{marginTop: 60, marginBottom: 50}}>
          <HeaderLogo/>
          </View>
          <Text style={styles.textStyle}>
            Get help from our teachers with 15 minute live video tuition sessions using Zoom.
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.bodyStyle, {fontSize: 26, fontWeight: 'bold'}]}>
                $8.00/
            </Text>
            <Text style={[styles.bodyStyle, {fontSize: 18, textAlignVertical:'bottom'}]}>
                15 minutes
            </Text>
          </View>
          <View>
            <View style={styles.countryView}>
              <Image source={require('../../assets/images/Vietnam.png')} style={{marginRight: 5}}/>
              <Text style={styles.moneyTextStyle}>187,200{'\u20AB'}</Text>
            </View>
            <View style={styles.countryView}>
              <Image source={require('../../assets/images/Thailand.png')} style={{marginRight: 5}}/>
              <Text style={styles.moneyTextStyle}>{'\u0E3F'}256,00</Text>
            </View>
            <View style={styles.countryView}>
              <Image source={require('../../assets/images/Indonesia.png')} style={{marginRight: 5}}/>
              <Text style={styles.moneyTextStyle}>Rp120,000</Text>
            </View>
            <View style={styles.countryView}>
              <Image source={require('../../assets/images/Japan.png')} style={{marginRight: 5}}/>
              <Text style={styles.moneyTextStyle}>{'\u00A5'}857.00</Text>
            </View>
            <View style={styles.countryView}>
              <Image source={require('../../assets/images/South-Korea.png')} style={{marginRight: 5}}/>
              <Text style={styles.moneyTextStyle}>{'\u20A9'}9,865</Text>
            </View>
            <View style={styles.countryView}>
              <Image source={require('../../assets/images/Cambodia.png')} style={{marginRight: 5}}/>
              <Text style={styles.moneyTextStyle}>32,633{'\u17DB'}</Text>
            </View>
            <View style={styles.countryView}>
              <Image source={require('../../assets/images/Myanmar.png')} style={{marginRight: 5}}/>
              <Text style={styles.moneyTextStyle}>K11,205</Text>
            </View>
            <View style={styles.countryView}>
              <Image source={require('../../assets/images/Laos.png')} style={{marginRight: 5}}/>
              <Text style={styles.moneyTextStyle}>12,000{'\u20AD'}</Text>
            </View>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isSelected}
              onValueChange={() => this.setState({isSelected: !isSelected})}
              style={styles.checkbox}
            />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>I agree to the </Text>
            <Text style={[styles.label, {fontWeight: 'bold'}]}>terms</Text>
          </View>
          </View>
          <CustomBlueButton title='Buy a Session' onPress={this.onPress}/>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}>

            <View style={styles.modalContainer}>
              <View style={styles.purchaseListContainer}>
                <FlatList
                  data={this.state.productList}
                  extraData={this.state}
                  keyExtractor={this._keyExtractor}
                  renderItem={this.renderItem}
                />
              </View>

              <TouchableOpacity
                style={styles.modelCancelButton}
                activeOpacity={0.8}
                onPress={this.setModalVisible(!this.state.modalVisible)}>

                <Text style={styles.modalTextButton}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </ScrollView>
    );
  }
}

 const mapStatToProps = state => {
   return {
     user: state.auth.user
   }
 }

export default connect(mapStatToProps)(ZoomBuySession);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingHorizontal: 25
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    textAlignVertical: "center",
    fontSize: 16
  },
  textStyle: {
    fontSize: 22,
    color: '#000', 
    textAlign: 'center',
    fontFamily: 'notoserif',
    marginBottom: 25
  },
  bodyStyle: {
    fontSize: 22, 
    color: '#000',
    fontFamily: 'notoserif',
    textAlign: 'center',
    marginBottom: 25
  },  
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
  login: {
    letterSpacing: 1,
    fontSize: 17,
    color: '#FFF',
    fontWeight:'bold'
  },
  countryView: {
    flexDirection:'row'
  },
  moneyTextStyle: {
    textAlignVertical: 'center', 
    fontWeight:'bold'
  },
});
