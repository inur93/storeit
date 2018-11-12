import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, PermissionsAndroid, Modal} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import TextEdit from "../components/TextEdit";
import Contacts from 'react-native-contacts';
import IconButton from "../components/IconButton";
import {toast} from "../constants/Methods";
import {Card, Header, List, ListItem, Text} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Button from "../components/Button";
import {ShoppingLists} from "../config/database";

@inject("shoppingStore")
@observer
export default class CreateShoppingListScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: 'New shopping list',
        headerRight: <IconButton iconContainerSyle={{marginRight: 10}}
                                 name={"check"}
                                 onPress={navigation.getParam('create')}/>
    });

    @observable list = {
        name: "",
        users: [],
        owner: null,
    };


    @observable contacts = [];
    @observable showAddUserModal = false;
    @observable emailToAdd = "";

    componentDidMount() {
        const {setParams} = this.props.navigation;
        setParams({create: this._create});
       /* const granted = PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                'title': 'Store It',
                'message': 'Store It needs permissions to your contacts' +
                    ' so you can easily share your shopping lists'
            });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('fetching contacts');
            Contacts.getAll((err, contacts) => {
                console.log('contacts->', contacts.filter(c => c.emailAddresses.length > 0));
            });
            /!* Contacts.getContactsMatchingString("frederikke", (err, contacts) => {
                 console.log('contacts error->', err);
                 console.log('contacts->', contacts);
             });*!/
            console.log('fetching in progress...');
        }*/
    }

    _create = () => {
        toast('created new shopping list');
        let list = this.props.shoppingStore.create(this.list);
        this.props.navigation.goBack();
    };

    @action removeContact = (contact) => {
        this.list.users.splice(this.list.users.indexOf(contact), 1);
    };

    @action shareListWithEmail = () => {
        const {emailToAdd} = this;
        if (!this.list.users.find(u => u.email === emailToAdd)) {
            this.list.users.push({
                email: emailToAdd
            })
        } else {
            toast(`${emailToAdd} is already on the list`);
        }
        this.closeModal();
    };

    @action closeModal = () => {
        this.showAddUserModal = false;
        this.emailToAdd = "";
    };

    render() {
        const {name} = this.list;
        return <View>
            <TextEdit placeholder={"groceries"}
                      label={"Name"}
                      required
                      value={name}
                      onChangeText={value => this.list.name = value}/>
            <Card>
                <ListItem containerStyle={styles.share}
                          title={"Share with"}
                          rightIcon={<IconButton name={'add'} onPress={() => this.showAddUserModal = true}/>}/>
                <ScrollView>
                    <List containerStyle={styles.list}>
                        {!this.list.users.length &&
                        <Text>No one</Text>
                        }
                        {this.list.users.map(u =>
                            <ListItem title={u.email}
                                      rightIcon={<IconButton name={"delete"}
                                                             iconStyle={styles.itemIcon}
                                                             onPress={() => this.removeContact(u)}/>}
                            />)}
                    </List>
                </ScrollView>
            </Card>
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.showAddUserModal}
                onRequestClose={this.closeModal}>
                <View style={styles.modalOverlay}>
                </View>
                <View style={styles.modal}>
                    <Card title={"Share list"} titleStyle={{textAlign: 'left'}}>
                        <Text>Enter an email address to share your shopping list</Text>
                        <TextEdit
                            value={this.emailToAdd}
                            onChangeText={email => this.emailToAdd = email}
                            required
                            label={"Email"}
                            autoCapitalize={'none'}
                            keyboardType={"email-address"}
                            textContentType={"emailAddress"}
                            placeholder={'myfriendsemail@gmail.com'}/>
                        <View style={styles.buttonGroup}>
                            <Button raised
                                    primary
                                    style={styles.button}
                                    text={"Add"}
                                    onPress={this.shareListWithEmail}/>
                            <Button text={"Cancel"}
                                    style={styles.button}
                                    onPress={this.closeModal}/>
                        </View>
                    </Card>
                </View>

            </Modal>
        </View>
    }
}

const styles = StyleSheet.create({
    share: {
        paddingBottom: 0,
        paddingTop: 0,
        borderBottomWidth: 0
    },
    list: {
        marginTop: 10
    },
    itemIcon: {
        color: "#bdc6cf"
    },
    modal: {
        marginTop: 100,
    },
    buttonGroup: {
        marginTop: 10,
        display: 'flex',
        justifyContent: 'space-around'
    },
    button: {
        flex: 1,
        marginTop: 10,
    },
    modalOverlay: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: '#000',
        opacity: 0.3
    }
});
    