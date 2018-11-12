import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, action} from 'mobx';

@observer
export default class FormControl extends Component {


    render() {
        return <View style={styles.formControl}>
            {this.props.children}
        </View>
    }
}

const styles = StyleSheet.create({
    formControl: {
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16
    }
});
    