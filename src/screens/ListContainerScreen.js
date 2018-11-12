import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ActionButton, Button} from 'react-native-material-ui';
import {Containers, Items} from "../config/database";
import {action, autorun, observable} from "mobx";
import {inject, observer} from "mobx-react/native";
import Spinner from "../components/Spinner";
import Screens from "../constants/Screens";
import {GoogleSignin} from "react-native-google-signin";
import ListItem from "../components/ListItem";
import IconButton from "../components/IconButton";
import Icon from 'react-native-vector-icons/FontAwesome5';

@inject('authStore')
@observer
export default class ListContainerScreen extends Component {

    static navigationOptions = {
        title: 'Select container',
        headerRight: <Button icon={"settings"} text={""} onPress={() => GoogleSignin.signOut()}/>
    };
    @observable containers = [];
    @observable loading = true;

    myContainerHandler = null;
    constructor() {
        super();
    }

    async componentDidMount() {
        console.log('select container screen mounted');
       this.reloadContainers();
    }


    @action reloadContainers = () => {
        const {uid} = this.props.authStore.user;
        console.log(`reload container screen with userid: ${uid}`);
        this.myContainerHandler = Containers.myContainers(uid, containers => {
            console.log('containers ->', containers);
            this.containers = containers;
            this.loading = false;
        });
    };

    componentWillUnmount() {
        try {
            this.myContainerHandler();
        }catch(e){}
    }

    handleAction = (name) => {
        console.log(`action ${name}`);
        switch (name) {
            case 'add-container':
                this.props.navigation.navigate(Screens.CreateContainer);
                break;
            default:
                console.log(`unknown action ${name}`);
                return true;
        }
    };

    handleSelectDebug = container => {
        if(__DEV__) this.handleSelect(container);
    };
    handleSelect = container => {
        console.log('selected container ->', container);
        this.props.navigation.navigate(Screens.Container, {id: container.id});
    };

    render() {
        if (this.loading) {
            return <Spinner onPress={this.reloadContainers}/>;
        }

        return (<View style={styles.container}>
            <ScrollView>
                <ListItem dense style={styles.listHeader} centerElement={"My containers"}/>
                {this.containers.map(c => <ListItem
                    key={c.id}
                    leftElement={<Icon size={28} name={'box'}/>}
                    centerElement={{
                        primaryText: c.name,
                        secondaryText: `${c.itemCount || 0} items`
                    }}
                    onPressValue={c}
                    onPress={this.handleSelect}
                    onLongPress={this.handleSelectDebug}
                />)}
            </ScrollView>
            <ActionButton actions={[
                {name: 'add-container', icon: 'person', label: 'new container'},
                {name: 'add-item', icon: 'add', label: 'add items'}
            ]}
                          onPress={this.handleAction}
                          transition={"speedDial"}
            />
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    listHeader: {
        marginLeft: 10,
        color: 'gray'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});