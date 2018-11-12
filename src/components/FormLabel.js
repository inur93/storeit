import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import {withTheme} from "react-native-material-ui";


const getStyles = theme => ({
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize
});
@observer
class FormLabel extends Component {


    render() {
        const theme = getStyles(this.props.theme);
        return <Text style={[styles.label, theme]}>
            {(this.props.children || "").toUpperCase()}
        </Text>
    }
}

export default withTheme(FormLabel)

const styles = StyleSheet.create({
    label: {
        fontSize: 12,
        fontWeight: 'bold'
    }
});
    