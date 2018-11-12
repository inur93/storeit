import React, {Component} from 'react';
import {View, Text, StyleSheet, ProgressBarAndroid} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import {Button} from 'react-native-material-ui';
import PropTypes from 'prop-types';



@observer
export default class Spinner extends Component {

    @observable showButton = false;
    timeoutHandler = null;
    componentDidMount(){
        const {timeout, onPress} = this.props;
        if(onPress && timeout){
            this.timeoutHandler = setTimeout(() => {
                this.showButton = true;
            }, timeout);
        }
    }

    componentWillUnmount(){
        if(this.timeoutHandler){
            clearTimeout(this.timeoutHandler);
        }
    }

    render() {
        const {btnLabel, onPress, showSpinner} = this.props;
        //TODO check platform IOS/Android
        return <View>
            {showSpinner && <ProgressBarAndroid {...this.props} />}
            {this.showButton && <Button text={btnLabel || ""} onPress={onPress}/>}
        </View>;
    }
}

Spinner.propTypes = {
    timeout: PropTypes.number,
    btnLabel: PropTypes.string,
    onPress: PropTypes.func,
    showSpinner: PropTypes.bool
};

Spinner.defaultProps = {
    timeout: 5000,
    btnLabel: 'Retry',
    showSpinner: true
};

const styles = StyleSheet.create({});
    