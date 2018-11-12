import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, FlatList} from 'react-native';
import {inject, observer} from "mobx-react/native";
import {Containers, Items} from "../config/database";
import {autorun, observable} from "mobx";
import {ListItem, Icon, IconToggle, Button, ActionButton} from 'react-native-material-ui';
import Screens from "../constants/Screens";
import ContainerItem from "../components/ContainerItem";


@inject('containerStore')
@observer
export default class ShowContainerScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('title'),
        headerRight: <Button icon={'edit'} text={""} onPress={() => {
            const id = navigation.getParam('id');
            navigation.navigate(Screens.EditContainer, {id: id});
        }}/>
    });

    constructor() {
        super();
    }

    componentDidMount() {
        const {getParam, setParams} = this.props.navigation;
        const cid = this.props.navigation.getParam('id');
        this.props.containerStore.fetchContainer(cid);
    }

    componentWillUnmount() {
        this.props.containerStore.releaseCurrentContainer();
    }

    handleAdd = () => {
        const {navigate, getParam} = this.props.navigation;
        console.log('open add item screen with params ->', {
            containerId: getParam('id'),
            title: this.container.name
        });
        navigate(Screens.CreateItem, {
            containerId: getParam('id'),
            title: this.container.name
        });
    };

    renderListItem = ({item}) => {
        return <ContainerItem item={item} deletable/>
    };

    render() {
        const {currentItems} = this.props.containerStore;
        return <View style={styles.container}>
            <FlatList data={currentItems}
                      keyExtractor={item => item.id}
                      renderItem={this.renderListItem}/>
            {}
            <ActionButton onPress={this.handleAdd}/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
});