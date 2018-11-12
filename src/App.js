/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {inject, observer} from "mobx-react/native";
import {action, observable, runInAction} from "mobx";
import {auth, storage, Users} from './config/database';
import {Button, COLOR} from 'react-native-material-ui';
import MainNavigator from "./navigation/AppNavigator";
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import LoginScreen from "./screens/LoginScreen";
import Spinner from "./components/Spinner";
import TestScreen from "./screens/TestScreen";

GoogleSignin.configure();

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});



type Props = {};

@inject('authStore')
@observer
export default class App extends Component<Props> {

    @observable isLoading = true;

    authStateHandler = null;

    async componentDidMount() {
        await this.authenticate();
        this.authStateHandler = auth().onAuthStateChanged(user => {
            runInAction(async () => {
                console.log("auth state changed - user ->", user);
                if (user) {
                    this.props.authStore.user = user;
                    this.isLoading = false;
                    this.authStateHandler();
                }
            });
        }, error => {
            console.log('error->', error);
        }, complete => {
            console.log('completed->', complete);
        });
    }

    componentWillUnmount() {
        if (this.authStateHandler) this.authStateHandler();
        this.authStateHandler = null;
    }

    @action authenticate = async () => {
        this.isLoading = true;
        console.log('authentication...');

        let credential = null;

        const isSignedIn = await GoogleSignin.isSignedIn();
        if(!isSignedIn){
            console.log('user not signed in to google account');
            this.isLoading = false;
            return;
        }
        try {
            console.log('sign in silently...');
            const tokenData = await GoogleSignin.signInSilently();
            console.log('retrieved token data...');
            credential = auth.GoogleAuthProvider.credential(tokenData.idToken, tokenData.accessToken);
            console.log('got credentials...', credential);
        } catch (error) {
            console.log("error->", error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
            this.isLoading = false;
            return;
        }
        console.log('signing in...');
        auth().signInWithCredential(credential)
            .then(res => {
                console.log("signed in", res);
            });
    };

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.props.authStore.user = userInfo;
        } catch (error) {
            console.log(error.code);
            console.log(error);
             if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                 // user cancelled the login flow
             } else if (error.code === statusCodes.IN_PROGRESS) {
                 // operation (f.e. sign in) is in progress already
             } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                 // play services not available or outdated
             } else {
                 // some other error happened
             }
        }
    };

    render() {
        const {isLoading} = this;
        if (isLoading) {
            return <View>
                <Spinner btnLabel={"Cancel"} onPress={() => this.isLoading = false}/>
            </View>
        }

        /* return <ThemeContext.Provider value={getTheme(uiTheme)}>
             <AppNavigator/>

         </ThemeContext.Provider> */
        if(this.props.authStore.user){
            return <MainNavigator/>;
        }else{
            return <LoginScreen signIn={this.signIn}/>
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
