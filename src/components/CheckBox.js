import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

@observer
export default class CheckBox extends Component {


    render() {
        const {checked, size, onPress, style} = this.props;
        return <FAIcon
            color={checked ? 'green' : '#bfbfbf'}
            name={checked ? 'check-square-o' : 'square-o'}
            size={size || 24}
            style={[{ minWidth: size || 24 }, style]}
            onPress={onPress}
        />
    }
}

const styles = StyleSheet.create({});

CheckBox.propTypes = {
    checked: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    size: PropTypes.number,
    style: PropTypes.object
};

CheckBox.defaultProps = {
    size: 24
};
    