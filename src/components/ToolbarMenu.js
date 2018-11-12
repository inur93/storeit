import React, {Component} from 'react';
import {View, Text, StyleSheet, UIManager, findNodeHandle} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import IconButton from "./IconButton";
import PropTypes from 'prop-types';

@observer
export default class ToolbarMenu extends Component {

    menu = null;

    onMenuPressed = labels => {
        const {onRightElementPress} = this.props;
        UIManager.showPopupMenu(
            findNodeHandle(this.menu),
            this.props.options,
            err => console.log('error->', err),
            (result, index) => {
                if (result === "itemSelected" && this.props.onMenuPressed)
                    this.props.onMenuPressed({action: 'menu', value: this.props.options[index]});
            },
        );
    };

    render() {
        const {icon, options} = this.props;
        return <View style={styles.container}>
            <IconButton name={icon || 'more-vert'} ref={r => {
                this.menu = r
            }}
                        onPress={() => this.onMenuPressed(options)}/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        marginRight: 16,
    }
});

ToolbarMenu.propTypes = {
    options: PropTypes.array,
    onMenuPressed: PropTypes.func
};
    