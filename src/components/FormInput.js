import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import {withTheme} from "react-native-material-ui";

const styles = theme => ({
    fontWeight: 'normal',
    fontSize: 12,
    fontFamily: theme.fontFamily,
    height: 50,
    color: '#AEAEAE',
});

@observer
class FormInput extends Component {


    render() {
        const {style, theme, ...otherProps} = this.props;
        return <TextInput style={[styles(theme), style]}
                          underlineColorAndroid={theme.palette.primaryColor}
                          {...otherProps}/>;
    }
}

export default withTheme(FormInput);