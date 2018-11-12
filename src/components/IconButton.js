import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback, Animated, Easing} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import {Button} from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

@observer
export default class IconButton extends Component {

    @observable maxOpacity = 0.12;
    @observable scaleValue = new Animated.Value(0.01);
    @observable opacityValue = new Animated.Value(0.12);

    constructor(props, context) {
        super(props, context);
    }

    onPressedIn = () => {
        Animated.timing(this.scaleValue, {
            toValue: 1,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
        }).start();
    };

    onPressedOut = () => {
        Animated.timing(this.opacityValue, {
            toValue: 0,
        }).start(() => {
            this.scaleValue.setValue(0.01);
            this.opacityValue.setValue(this.maxOpacity);
        });
    };

    renderRippleView = () => {
        const {size} = this.props;
        const {scaleValue, opacityValue} = this;

        const rippleSize = size;

        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: rippleSize,
                    height: rippleSize,
                    borderRadius: rippleSize / 2,
                    transform: [{scale: scaleValue}],
                    opacity: opacityValue,
                    backgroundColor: 'black',
                }}
            />
        );
    };

    render() {
        const {name, size, iconStyle, onPress, iconContainerSyle} = this.props;
        const containerSize = size;
        const iconContainer = {width: containerSize, height: containerSize};
        return <TouchableWithoutFeedback onPressIn={this.onPressedIn}
                                         onPressOut={this.onPressedOut}
                                         onPress={onPress}>
            <View style={[styles.iconContainer, iconContainer, iconContainerSyle]}>
                {this.renderRippleView()}
                <View>
                    <Icon  name={name} size={size} style={[styles.icon, iconStyle]}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    }
}

const styles = StyleSheet.create({
    iconContainer: {
        /*margin: 16,*/
        alignItems: 'center',
        justifyContent: 'center',
    },
});

IconButton.propTypes = {
    size: PropTypes.number,
    iconStyle: PropTypes.object,
    iconContainerSyle: PropTypes.object,
    name: PropTypes.string.isRequired,
    onPress: PropTypes.func
};

IconButton.defaultProps = {
    size: 24,
    iconStyle: {},
    onPress: () => console.warn('on press is not set')
};
    