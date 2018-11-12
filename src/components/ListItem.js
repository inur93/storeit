import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import {ListItem as MUIListItem} from 'react-native-material-ui';
import PropTypes from 'prop-types';

@observer
export default class ListItem extends Component {


    render() {
        return <MUIListItem {...this.props} />
    }
}

const styles = StyleSheet.create({});

ListItem.propTypes = {
    onPress: PropTypes.func,
    onRightElementPress: PropTypes.func,
    leftElement: PropTypes.any,
    centerElement: PropTypes.any,
    rightElement: PropTypes.any,
    dense: PropTypes.bool,
    divider: PropTypes.bool

};

ListItem.defaultProps = {

};

    