import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import {Button as MaterialUiButton} from 'react-native-material-ui';
import PropTypes from 'prop-types';

@observer
export default class Button extends Component {


    render() {
        return <MaterialUiButton {...this.props}/>
    }
}

const styles = StyleSheet.create({});

Button.propTypes = {
    text: PropTypes.string,
    style: PropTypes.object,
    onPress: PropTypes.func.isRequired
};

Button.defaultProps = {};
    