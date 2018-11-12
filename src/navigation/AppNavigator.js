import React from 'react';
import {createStackNavigator, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';
import ShowContainerScreen from '../screens/ShowContainerScreen';
import ListContainerScreen from "../screens/ListContainerScreen";
import LoginScreen from "../screens/LoginScreen";
import CreateContainerTemplate from "../screens/CreateContainerTemplate";
import CreateContainerScreen from "../screens/CreateContainerScreen";
import EditContainerScreen from "../screens/EditContainerScreen";
import CreateItemScreen from "../screens/CreateItemScreen";
import ShowItemScreen from "../screens/ShowItemScreen";
import EditItemScreen from "../screens/EditItemScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/FontAwesome5';
import CreateShoppingItemScreen from "../screens/CreateShoppingItemScreen";
import CreateShoppingListScreen from "../screens/CreateShoppingListScreen";
import ShowShoppingListScreen from "../screens/ShowShoppingListScreen";


/**
 * including any other export in this file will cause an error
 */



const ContainerNavigator = createStackNavigator({
    Main: ListContainerScreen,
    CreateContainer: {
        screen: CreateContainerScreen
    },
    Container: {
        screen: ShowContainerScreen,
        path: 'container/:id'
    },
    EditContainer: {
        screen: EditContainerScreen,
        path: 'editContainer/:id'
    },
    CreateItem: {
        screen: CreateItemScreen
    },
    Item: {
        screen: ShowItemScreen,
        path: 'item/:id'
    },
    EditItem: {
        screen: EditItemScreen,
        path: 'editItem/:id'
    },
    CreateTemplate: {
        screen: CreateContainerTemplate
    },
}, {
    initialRouteName: 'Main'
});

const ShoppingNavigator = createStackNavigator({
    ShoppingList: ShoppingListScreen,
    CreateShoppingList: CreateShoppingListScreen,
    AddToCart: CreateShoppingItemScreen,
    ShowShoppingList: ShowShoppingListScreen
});

const MainNavigator = createBottomTabNavigator({
        Containers: ContainerNavigator,
        Shopping: ShoppingNavigator
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'Containers') {
                    iconName = `boxes`;
                } else if (routeName === 'Shopping') {
                    iconName = `shopping-cart`;
                }
                return <Icon name={iconName} size={horizontal  ? 20: 25} color={tintColor} />;
            }
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    });

export default MainNavigator;


/*export default createSwitchNavigator({
    Main: mainStack
});*/

