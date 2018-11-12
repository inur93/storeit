import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList, Image} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import {ActionButton} from 'react-native-material-ui';
import Screens from "../constants/Screens";
import {List} from "react-native-elements";
import ListItem from "../components/ListItem";
import Pointer from "../components/Pointer";
import Spinner from "../components/Spinner";

@inject('shoppingStore')
@observer
export default class ShoppingListScreen extends Component {
    static navigationOptions = {
        title: 'Shopping lists'
    };

    componentDidMount() {
        this.props.shoppingStore.fetchMyLists();
    }

    componentWillUnmount() {
        this.props.shoppingStore.releaseMyLists();
    }

    handleAction = () => {
        this.props.navigation.navigate(Screens.CreateShoppingList);
    };


    selectList = list => {
        this.props.navigation.navigate(Screens.ShoppingList, {
            id: list.id,
            title: list.name
        });
    };

    deleteList = list => {
        this.props.shoppingStore.deleteList(list);
    };

    renderListItem = ({item}) => {
        return <ListItem
            onPress={() => this.selectList(item)}
            centerElement={item.name}
            onRightElementPress={() => this.deleteList(item)}
            rightElement={'delete'}/>
    };

    render() {
        const {myLists, loading} = this.props.shoppingStore;
        return <View style={styles.container}>
            <FlatList data={myLists}
                      refreshing={loading.currentList}
                      keyExtractor={item => item.id}
                      renderItem={this.renderListItem}/>
            {!myLists.length && !loading.myLists &&
                <Pointer msg={"Click here to add your first shopping list"}/>
            }
            {loading.myLists && <Spinner/>}
            <ActionButton onPress={this.handleAction}/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
});
    