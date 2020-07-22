import React from 'react';
import CustomizedTabBar from '../components/CustomizedTabBar'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// SCREENS
import LoadingScreen from '../screens/loading';
import LoginScreen from '../screens/auth/login';
import LoginInfoScreen from '../screens/auth/login/login';
import GetStartScreen from '../screens/auth/getStart';
import SubSelectScreen from '../screens/auth/subSelect';
import ThanksScreen from '../screens/auth/register/teacherRegister/thanks';
import EmailScreen from '../screens/auth/register/teacherRegister/addEmail';
import CountryScreen from '../screens/auth/register/teacherRegister/country';
import RegisterScreen from '../screens/auth/register';
import PrivacyScreen from '../screens/auth/privacy';
import RegisterInfoScreen from '../screens/auth/register/register';
import PaymentScreen from '../screens/Payment';
import NotificationScreen from '../screens/Notification';
import LearnerCreateScreen from '../screens/auth/register/learnerRegister/learnerCreate';
import TeacherCreateScreen from '../screens/auth/register/teacherRegister/teacherCreate';
import ReadPageScreen from '../screens/auth/readPage';
import Answers from '../screens/Answers';
import Tuition from '../screens/Tuition';
import ZoomCalendarScreen from '../screens/Tuition/ZoomCalendar';
import ZoomClockScreen from '../screens/Tuition/ZoomClock';
import ZoomTimeZoneScreen from '../screens/Tuition/ZoomTimeZone';
import ZoomEmailScreen from '../screens/Tuition/ZoomEmail';
import ZoomBuySessionScreen from '../screens/Tuition/ZoomBuySession';
import ZoomThanksScreen from '../screens/Tuition/ZoomThanks';
import TeacherZoomDetailScreen from '../screens/Tuition/TeacherZoomDetail';
import LearnerQAScreen from '../screens/Answers/LearnerQA';
import TeacherQuestionScreen from '../screens/Answers/TeacherQuestion';
import TeacherQAScreen from '../screens/Answers/TeacherQA';
import History from '../screens/History';
import HistoryQAScreen from '../screens/History/HistoryQA';
import Account from '../screens/Account';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

// TAB NAVIGATOR INSIDE DRAWER


const AppNav = ({ user }) => {
  const TabRouteConfigs = { 
    ANSWERS: {
      screen:Answers,
      navigationOptions: {
        tabbarLabel: 'ANSWERS',
        tabBarIcon: ({ tintColor }) => {
          return <MaterialCommunityIcons name='comment-question-outline' color={tintColor} size={30} style={{ flex: 1 }} />;
        }
      }
    },
    QUESTIONS: {
      screen:TeacherQuestionScreen,
      navigationOptions: {
        tabBarLabel: 'QUESTIONS',
        tabBarIcon: ({ tintColor }) => {
          return <MaterialCommunityIcons name='comment-question-outline' color={tintColor} size={30} style={{ flex: 1 }} />;
        }
      }
    },
    TUITION: {
      screen: Tuition,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'TUITION',
        tabBarIcon: ({tintColor}) => {
          return  <Feather name='video' color={tintColor} size={30} style={{ flex: 1 }} />
        }
      })
    },
    HISTORY : {
      screen: History,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: 'HISTORY',
        tabBarIcon: ({tintColor}) => {
          return  <Feather name='search' color={tintColor} size={30} style={{ flex: 1 }} />
        }
      })
    },
    ACCOUNT : {
      screen: Account,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: 'ACCOUNT',
        tabBarIcon: ({tintColor}) => {
          return  <FontAwesome  name='user-o' color={tintColor} size={30} style={{ flex: 1 }} />
        }
      })
    }
  }  
    
  const TabNavigatorConfig = {
    initialRouteName: 'ANSWERS',
    tabBarComponent: props => (
      <CustomizedTabBar {...props} />
    ),
    tabBarOptions: {
      activeTintColor: '#F29CA4',
      inactiveTintColor: '#F6323E',
      labelStyle: {
        fontSize: 12,
        marginBottom: 7
      },
      style: {
        height: 70,
        paddingTop: 5,
        paddingBottom: 5
      }
    },
  }
    
  const TabNavigator = createBottomTabNavigator(TabRouteConfigs, TabNavigatorConfig);
  
  const MainStackNavigator = createStackNavigator({
    TabNavigator,
    Payment: PaymentScreen,
    Notification: NotificationScreen,
    ZoomCalendar: ZoomCalendarScreen,
    ZoomClock: ZoomClockScreen,
    ZoomTimeZone: ZoomTimeZoneScreen,
    ZoomEmail: ZoomEmailScreen,
    ZoomBuySession: ZoomBuySessionScreen,
    ZoomThanks: ZoomThanksScreen,
    TeacherZoomDetail: TeacherZoomDetailScreen,
    LearnerQA: LearnerQAScreen,
    TeacherQA: TeacherQAScreen,
    HistoryQA: HistoryQAScreen,
  }, {
    initialRouteName: 'TabNavigator',
    headerMode: 'none'
  })
  // AUTH STACK NAVIGATOR
  const AuthStackNavigator = createStackNavigator({
    GetStart: GetStartScreen,
    ReadPage: ReadPageScreen,
    SubSelect: SubSelectScreen,
    Country: CountryScreen,
    Email: EmailScreen,
    LearnerCreate: LearnerCreateScreen,
    Thanks: ThanksScreen,
    Login: LoginScreen,
    LoginInfo: LoginInfoScreen,
    Register: RegisterScreen,
    RegisterInfo: RegisterInfoScreen,
    TeacherCreate: TeacherCreateScreen,
    Privacy: PrivacyScreen
  }, {
    headerMode: 'none',
    initialRouteName: 'GetStart'
  });
  // SWITCH FOR LOADING, AUTH AND MAIN SCREENS
  const switchNavigator = createSwitchNavigator(
    {
      Loading: LoadingScreen,
      Auth: AuthStackNavigator,
      App: MainStackNavigator,
    },
    {
      headerMode: 'none',
      initialRouteName: 'Loading'
    }
  );
  
  const Container = createAppContainer(switchNavigator);
  return <Container />;
};


export default AppNav;
// export default createAppContainer(switchNavigator);