import React, {Component} from 'react';
import {GoogleSigninButton} from "react-native-google-signin";
import {inject, observer} from "mobx-react/native";
import {action, observable} from "mobx";
import {StyleSheet, View} from "react-native";


@inject('authStore')
@observer
export default class LoginScreen extends Component {

    @observable isSigninInProgress = false;

    constructor() {
        super();
    }

    @action signIn = async () => {
        this.isSigninInProgress = true;
        await this.props.signIn();
        this.isSigninInProgress = false;
    };

    render() {
        return <View style={styles.container}>
            <GoogleSigninButton
                title={"Login with google"}
                style={{width: '90%', height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this.signIn}
                disabled={this.isSigninInProgress}/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        top: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});