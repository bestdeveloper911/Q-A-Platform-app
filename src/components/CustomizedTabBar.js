import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback, TouchableOpacity
} from 'react-native'
// import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import {SCREEN} from '../common/Styles'
import {connect} from 'react-redux';

class CustomizedTabBar extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }
    render() {
        const { 
            navigation, 
            activeTintColor, 
            inactiveTintColor 
        } = this.props;
        const { routes } = navigation.state;
        return (
            <View style={styles.tabBar}>
                {routes.map((route, index) => {
                    if(this.props.user != null){
                        if (this.props.user.userrole == 0){
                            if(route.key == 'QUESTIONS')
                                return;
                        }else{
                            if(route.key == 'ANSWERS')
                                return;
                        }
                    }
                    const focused = index === navigation.state.index;
                    const label = this.props.getLabelText({ route });
                    const renderIcon = this.props.renderIcon({ 
                        route,
                        focused: true,
                        tintColor: focused ? activeTintColor : inactiveTintColor,
                    });
                    
                    return (
                        <View 
                            key={route.key}
                            style={styles.tabBarItem}
                        >
                            <View style={styles.tabBarItemBackground}>
                                <TouchableWithoutFeedback
                                    style={[styles.tabBarItemBackground, { width: SCREEN/(routes.length-1) }]}
                                    onPress={() => navigation.navigate(route.key)}>
                                    <View style={{alignItems: 'center', bottom: 5}}>
                                    {renderIcon}
                                    <Text style={[styles.routeName, {color: focused ? activeTintColor :  inactiveTintColor }]}>
                                        {label}
                                    </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(CustomizedTabBar)
// export default CustomizedTabBar;

const styles = StyleSheet.create({
    tabBar: {
        height: 70,
        flexDirection: 'row',
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#CDC4C3',
        // elevation: 10,
    },
    tabBarItem: {
        flex: 1,
        alignItems: 'center'
    },
    tabBarItemBackground: {
        flex: 0,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    routeName: {
        fontSize: 12,
        textAlign: 'center',
        justifyContent: 'center'
    }
})