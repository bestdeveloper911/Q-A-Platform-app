import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  CheckBox,
  ScrollView,
  Modal,
  FlatList
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {onSubscribe} from '../../redux/actions/QA'
import CustomBlueButton from '../../components/CustomBlueButton';
import AsyncStorage from '@react-native-community/async-storage';
import * as RNIap from "react-native-iap";
import {connect} from 'react-redux';

const itemSkus = Platform.select({
	ios: [
		"student1" //purchase
	],
	android: [
		"com.purchase.coin" // purchase
	]
});

const itemSubs = Platform.select({
	ios: [
		"com.autorenewingtest" //subscription
	],
	android: [
		"rn.sub.monthly" // subscription
	]
});

class Payment extends React.Component {
  constructor(props){
    super(props);
    this.state={
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
  // const [isSelected, setSelection] = useState(false);
  // const onPress = () => {
  //   props.onSubscribe(true, props.user.uid)
  //   props.navigation.goBack();
  // }

  async componentDidMount() {
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

  render(){
    const {isSelected} = this.state;
    return (
      <ScrollView style={{flex:1}}>
        <View style={styles.container}>
            <TouchableOpacity onPress={() => this.closePage()} style={{position:'absolute', right: 15, top:15}}>
              <Fontisto name='close-a' size={30} color='#000'/>
            </TouchableOpacity>
              <Image source={require('../../assets/images/headerlogo.png')} style={{marginTop: 50, marginBottom: 30}}/>
              <Text style={styles.textStyle}>
                15 question & answer sessions per month with our teachers.
              </Text>
              <Text style={styles.bodyStyle}>
                  3-Day free trial with 4 question & answer sessions.
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.bodyStyle, {fontSize: 26, fontWeight: 'bold'}]}>
                    $20.00/
                </Text>
                <Text style={[styles.bodyStyle, {fontSize: 18, textAlignVertical:'bottom'}]}>
                    month
                </Text>
              </View>
              <View>
                <View style={styles.countryView}>
                  <Image source={require('../../assets/images/Vietnam.png')} style={{marginRight: 5}}/>
                  <Text style={styles.moneyTextStyle}>468,000{'\u20AB'}</Text>
                </View>
                <View style={styles.countryView}>
                  <Image source={require('../../assets/images/Thailand.png')} style={{marginRight: 5}}/>
                  <Text style={styles.moneyTextStyle}>{'\u0E3F'}642,00</Text>
                </View>
                <View style={styles.countryView}>
                  <Image source={require('../../assets/images/Indonesia.png')} style={{marginRight: 5}}/>
                  <Text style={styles.moneyTextStyle}>Rp297,996</Text>
                </View>
                <View style={styles.countryView}>
                  <Image source={require('../../assets/images/Japan.png')} style={{marginRight: 5}}/>
                  <Text style={styles.moneyTextStyle}>{'\u00A5'}2,141</Text>
                </View>
                <View style={styles.countryView}>
                  <Image source={require('../../assets/images/South-Korea.png')} style={{marginRight: 5}}/>
                  <Text style={styles.moneyTextStyle}>{'\u20A9'}24,660</Text>
                </View>
                <View style={styles.countryView}>
                  <Image source={require('../../assets/images/Cambodia.png')} style={{marginRight: 5}}/>
                  <Text style={styles.moneyTextStyle}>81,582{'\u17DB'}</Text>
                </View>
                <View style={styles.countryView}>
                  <Image source={require('../../assets/images/Myanmar.png')} style={{marginRight: 5}}/>
                  <Text style={styles.moneyTextStyle}>K28,014</Text>
                </View>
                <View style={styles.countryView}>
                  <Image source={require('../../assets/images/Laos.png')} style={{marginRight: 5}}/>
                  <Text style={styles.moneyTextStyle}>180,100{'\u20AD'}</Text>
                </View>
              </View>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={isSelected}
                  onValueChange={() => this.setState({isSelected: !isSelected})}
                  style={styles.checkbox}
                />
                <Text style={styles.label}>I agree to the subscription terms</Text>
              </View>
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
          <CustomBlueButton title='Try it FREE for 3 days' onPress={this.getSubscriptions}/>
          <CustomBlueButton title='Subscribe' ButtonStyle={{marginVertical: 30}} onPress={this.getSubscriptions}/>
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  return{
    user: state.auth.user
  } 
}

const mapDispatchToProps = dispatch => {
  return {
    onSubscribe: (status, uid) => {dispatch(onSubscribe(status, uid))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

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
    marginBottom: 20
  },
  bodyStyle: {
    fontSize: 22, 
    color: '#000',
    fontFamily: 'notoserif',
    textAlign: 'center',
    marginBottom: 20
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
  modalContainer: {
    flex: 1,
    margin: 25,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 4
  },
  modelCancelButton: {
    height: 40,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "orange",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    bottom: 0,
    position: "absolute"
  },
  modalTextButton: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
  },
  purchaseListContainer: {
    flex: 1,
    marginBottom: 40,
    backgroundColor: "#FF8C00",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15
  },
  dividerContainer: {
    height: 1,
    width: "100%",
    backgroundColor: "white",
    marginTop: 10
  }
});
