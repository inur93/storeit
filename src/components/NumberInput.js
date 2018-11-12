import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import PropTypes from 'prop-types';
import FormControl from "./FormControl";
import FormLabel from "./FormLabel";
import {withTheme} from "react-native-material-ui";
import FormInput from "./FormInput";

@observer
class NumberInput extends Component {

    onChangeText = text => {
        if (this.props.onChangeText)
            this.props.onChangeText(Number.parseFloat(text));
    };

    render() {
        const {theme, label, value, onChangeText, ...otherProps} = this.props;
        let formatted = (!value && value !== 0) ? '' : '' + value;

        return <FormControl>
            <FormLabel>{label}</FormLabel>
            <FormInput value={formatted}
                       onChangeText={this.onChangeText}
                       keyboardType={'numeric'}
                       {...otherProps}
            />
        </FormControl>
    }
}

export default withTheme(NumberInput)

NumberInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
    onChangeText: PropTypes.func
};
    