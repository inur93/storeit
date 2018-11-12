import React, {Component} from 'react';
import {View, Text, StyleSheet, Picker, TextInput} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import NumberInput from "./NumberInput";
import PropTypes from 'prop-types';
import {withTheme} from "react-native-material-ui";
import FormInput from "./FormInput";

@observer
class WeightInput extends Component {

    handleValueChanged = (value) => {
        this.props.onChange({
            value: value ? Number.parseFloat(value) : undefined,
            unit: this.props.unit
        });
    };

    handleUnitChanged = (unit) => {
        this.props.onChange({
            value: this.props.value,
            unit: unit
        })
    };

    onChangeText = text => {
        if (this.props.onChangeText)
            this.props.onChangeText(Number.parseFloat(text));
    };

    render() {
        const {theme, unit, value} = this.props;

        let formatted = value === undefined ? '' : '' + value;
        return <View style={styles.container}>
            <View style={styles.item}>
                <FormInput value={formatted}
                           onChangeText={this.handleValueChanged}
                           keyboardType={'numeric'}/>
            </View>
            <View style={styles.item}>
                <Picker
                    style={styles.picker}
                    selectedValue={unit}
                    onValueChange={this.handleUnitChanged}>
                    <Picker.Item label="kg" value="kg"/>
                    <Picker.Item label="g" value="g"/>
                </Picker>
            </View>
        </View>
    }
}

export default withTheme(WeightInput)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        marginLeft: 16,
        marginRight: 16
    },
    item: {
        flex: 1,
        alignSelf: 'auto',
    },
    picker: {
    }
});

WeightInput.propTypes = {
    value: PropTypes.number.isRequired,
    unit: PropTypes.oneOf(["kg", "g"]),
    onChange: PropTypes.func.isRequired
};