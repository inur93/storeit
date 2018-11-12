import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, NativeModules, findNodeHandle} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import {observable, action, autorun, reaction} from 'mobx';
import ListItem from "../components/ListItem";
import CheckBox from "../components/CheckBox";
import {ActionButton} from 'react-native-material-ui';
import Screens from "../constants/Screens";
import IconButton from "../components/IconButton";
import ToolbarMenu from "../components/ToolbarMenu";
import {toast} from "../constants/Methods";
import Pointer from "../components/Pointer";
import ContainerItem from "../components/ContainerItem";
import Spinner from "../components/Spinner";

@inject("shoppingStore")
@observer
export default class ShowShoppingListScreen extends Component {

    static sortOptions = [
        'title asc',
        'title desc',
        'checked first',
        'unchecked first',
        'delete multiple'
    ];
    static navigationOptions = ({navigation}) => {
        const onMenuPressed = navigation.getParam('menu');
        const deleteMode = navigation.getParam('deleteMode');
        const finishDelete = navigation.getParam('finishDelete');
        const cancelDelete = navigation.getParam('cancelDelete');
        console.log('on menu pressed->', onMenuPressed);

        return {
            title: navigation.getParam('title'),
            headerLeft: deleteMode && <IconButton name={"arrow-back"}
                                                  onPress={cancelDelete}
                                                  iconContainerSyle={{marginLeft: 16}}/>,
            headerRight: deleteMode ? <IconButton name={'check'}
                                                  onPress={finishDelete}
                                                  iconContainerSyle={{marginRight: 16}}/> :
                <ToolbarMenu options={ShowShoppingListScreen.sortOptions}
                             onMenuPressed={onMenuPressed}/>
        }
    };

    @observable testIcon = false;
    @observable deleteMode = false;

    componentWillMount() {

    }

    componentDidMount() {
        const {shoppingStore, navigation} = this.props;
        const {getParam, setParams} = navigation;
        setParams({
            menu: this._menu,
            finishDelete: this._finishDelete,
            cancelDelete: this._cancelDelete
        });
        const id = getParam('id');
        shoppingStore.fetchList(id);
        reaction(() => this.deleteMode, deleteMode => {
            setParams({deleteMode: deleteMode});
        });
    }


    @action _menu = ({action, value}) => {
        if (value === 'delete multiple') {
            this.deleteMode = true;
        } else {
            this.props.shoppingStore.itemOrder = value;
        }
    };

    @action _finishDelete = () => {
        this.deleteMode = false;
        const items = this.props.shoppingStore.currentItems.filter(item => item.toBeDeleted);
        this.props.shoppingStore.deleteMultipleItems(items);
    };

    @action _cancelDelete = () => {
        this.deleteMode = false;
        this.props.shoppingStore.currentItems.forEach(item => item.toBeDeleted = false);
    };

    handleAddItem = () => {
        const {navigation} = this.props;
        const id = navigation.getParam('id');
        navigation.navigate(Screens.AddToCart, {
            id: id,
            title: navigation.getParam('title')
        });
    };

    @action checkItem = (item, checked) => {
        this.props.shoppingStore.checkItem(item, checked);
        item.checked = checked;
    };

    @action deleteItem = (item) => {
        item.toBeDeleted = !item.toBeDeleted;
    };

    render() {
        const {currentList, currentItems} = this.props.shoppingStore;
        const isLoading = this.props.shoppingStore.loading.currentList;
        const {deleteMode} = this;
        console.log(`is loading ${!currentItems.length && !isLoading}`);
        return <View style={styles.view}>
            <FlatList data={currentItems}
                      extraData={{
                          deleteMode
                      }}
                      renderItem={({item}) => <ContainerItem item={item}
                                                             deletable={deleteMode}
                                                             onDelete={this.deleteItem}
                                                             checkItem={this.checkItem}/>}
                      keyExtractor={item => item.id}/>
            {(!currentItems.length && !isLoading) && <Pointer msg={"Click here to add items"}/>}
            {isLoading && <Spinner/>}
            {!deleteMode && <ActionButton onPress={this.handleAddItem}/>}
        </View>

    }
}

const styles = StyleSheet.create({
    view: {
        height: '100%'
    }
});
    