import React, {Component} from 'react';
import {View, Text, StyleSheet, DatePickerAndroid, TextInput} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import PropTypes from 'prop-types';
import {toast} from "../constants/Methods";
import TextEdit from "./TextEdit";
import FormLabel from "./FormLabel";
import {withTheme} from "react-native-material-ui";
import FormControl from "./FormControl";
import FormInput from "./FormInput";
import IconButton from "./IconButton";

const months = [
    "Januar",
    "Februar",
    "Marts",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "December"
];

@observer
class DatePicker extends Component {

    formatDate = (val) => {
        if (!val) return '-';
        let date = new Date(val);
        return `${date.getDate()}. ${months[date.getMonth()]} ${date.getFullYear()}`
    };

    handleOnPress = async () => {

        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date(this.props.value || Date.now())
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.props.onChange(new Date(year, month, day));
                // Selected year, month (0-11), day
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }

    };

    clearValue = () => {
        this.props.onChange(null);
    };

    render() {
        const {label, theme, value} = this.props;
        const classes = styles(theme);
        return <FormControl>
            <FormLabel>{label}</FormLabel>
            <Text style={classes.value}
                  onPress={this.handleOnPress}>
                {this.formatDate(value)}
            </Text>
            {value && <IconButton name={'clear'}
                                  onPress={this.clearValue}
                                  iconContainerSyle={classes.iconContainer}
                                  iconStyle={classes.icon}/>}
        </FormControl>
    }
}

export default withTheme(DatePicker)


const styles = theme => ({
    value: {
        fontWeight: "normal",
        fontSize: 12,
        fontFamily: theme.fontFamily,
        borderBottomColor: theme.palette.primaryColor,
        paddingBottom: 8,
        marginTop: 16,
        borderBottomWidth: 1,
        color: '#AEAEAE'
    },
    iconContainer: {
        position: 'absolute',

        right: 0,
        bottom: 0
    },
    icon: {
        color: '#AEAEAE',
    }
});

DatePicker.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
};