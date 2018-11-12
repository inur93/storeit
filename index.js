/** @format */
import React, {Component} from 'react';
import {Provider} from "mobx-react/native";


import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import AuthStore from "./src/stores/AuthStore";
import ItemStore from "./src/stores/ItemStore";
import ContainerStore from "./src/stores/ContainerStore";
import ShoppingStore from "./src/stores/ShoppingStore";
import {COLOR, getTheme, ThemeContext} from "react-native-material-ui";

console.disableYellowBox = true;

const authStore = new AuthStore();
const stores = {
    authStore: authStore,
    itemStore: new ItemStore(authStore),
    containerStore: new ContainerStore(authStore),
    shoppingStore: new ShoppingStore(authStore)
};

const uiTheme = {
    fontFamily: 'Roboto',
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

class ProviderApp extends Component {
    render() {
        return <Provider {...stores}>
            <ThemeContext.Provider value={getTheme(uiTheme)}>
                <App/>
            </ThemeContext.Provider>
        </Provider>
    }
}

AppRegistry.registerComponent(appName, () => ProviderApp);

