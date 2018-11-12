import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import ListItem from "./ListItem";
import CheckBox from "./CheckBox";
import PropTypes from 'prop-types';
import IconButton from "./IconButton";

@observer
export default class ContainerItem extends Component {

    render() {
        const {deletable, item, onDelete, checkItem} = this.props;
        const {measurement, title, checked, toBeDeleted} = item;
        let leftElement = "";
        if (measurement) {
            const {type, unit, value} = measurement;
            switch (type) {
                case 0:
                    leftElement = `${value} ${unit}`;
                    break;
                case 1:
                    leftElement = `${value}`;
                    break;
            }
        }
        let rightElement = null;
        if (deletable) {
            if (toBeDeleted) {
                rightElement = <IconButton name={'close'}
                                           iconContainerSyle={{marginRight: 16}}
                                           onPress={() => item.toBeDeleted = false}/>
            } else {
                rightElement = <IconButton name={'delete'}
                                           iconContainerSyle={{marginRight: 16}}
                                           onPress={() => this.props.onDelete(item)}/>
            }
        } else {
            rightElement = <CheckBox
                style={{marginRight: 16}}
                checked={!!checked}
                onPress={() => this.props.checkItem(this.props.item, !checked)}
            />
        }
        console.log('deletable: ' + deletable);
        return (<ListItem
            leftElement={<Text>{leftElement}</Text>}
            centerElement={title}
            rightElement={rightElement}
        />);
    }
}

const styles = StyleSheet.create({});

ContainerItem.propTypes = {
    item: PropTypes.object.isRequired,
    checkItem: PropTypes.func,
    deletable: PropTypes.bool,
    onDelete: PropTypes.func
};

ContainerItem.defaultProps = {
    deletable: false
}
    