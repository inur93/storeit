import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import PropTypes from 'prop-types';

@observer
export default class Pointer extends Component {


    render() {
        return <View>
            <Text style={styles.text}>
                {this.props.msg}
            </Text>
            <Image
                resizeMode={'cover'}
                resizeMethod={'auto'}
                style={styles.arrow}
                source={require('../../assets/images/pointer.png')}/>
        </View>
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 28,
        position: 'absolute',
        bottom: 150,
        left: 16
    },
    arrow: {
        position: 'absolute',
        width: '80%',
        height: 150,
        right: 50,
        bottom: 0
    }
});

Pointer.propTypes = {
    msg: PropTypes.string
};

Pointer.defaultProps = {
    msg: 'Click here to add'
};