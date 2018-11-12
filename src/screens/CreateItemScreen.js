import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import {Button} from "react-native-material-ui";
import TextEdit from "../components/TextEdit";
import {Containers, Items} from "../config/database";
import {toast} from "../constants/Methods";
import IconButton from "../components/IconButton";

@inject('authStore')
@observer
export default class CreateItemScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: `Add item to '${navigation.getParam("title")}'`,
        headerRight: <IconButton name="check"
                                 iconContainerSyle={{marginRight: 10}}
                                 onPress={navigation.getParam("create")}/>
    });
    @observable item = {
        name: "",
        users: {},
        container: ""
    };

    componentDidMount() {
        const {setParams, getParam} = this.props.navigation;
        setParams({create: this._create});
        const containerId = getParam('containerId');
        this.item.container = containerId;
        Containers.get(containerId, container => {
            this.item.users = container.users;
        });
    }

    _create = async () => {
        const {uid} = this.props.authStore.user.uid;
        const created = await Items.create(this.item);

        toast("item created");
        this.item.name = "";
        console.log('new item ->', created);

    };

    render() {
        const {name} = this.item;

        return <View>
            <TextEdit label={"Name"} value={name} onChangeText={val => this.item.name = val}/>
        </View>
    }
}

const styles = StyleSheet.create({});
    