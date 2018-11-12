import React, {Component} from 'react';
import {ScrollView, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import {observable} from 'mobx';
import {Containers, ContainerTemplates} from "../config/database";
import Spinner from "../components/Spinner";
import {ListItem} from 'react-native-material-ui';
import uuid from 'uuid/v4';
import {toast} from "../constants/Methods";
import Screens from "../constants/Screens";

@inject('authStore')
@observer
export default class CreateContainerScreen extends Component {

    static navigationOptions = {
        title: 'Add new container'
    };
    @observable loading = true;
    @observable templates = [];

    componentDidMount() {

        ContainerTemplates.all(snapshot => {
            this.templates = snapshot.val() || [];
            this.loading = false;
        })
    }

    /**
     * on press is not working while attached to the debugger instead the onpress is mistaken for a long press
     * @param template
     */
    selectTemplateDebug = (template) => {
        if(__DEV__) this.selectTemplate(template);
    };
    selectTemplate = (template) => {
        console.log(`selected template`, template);
        const uid = this.props.authStore.user.uid;
        let users = {};
        users[uid] = true;
        const container = {
            name: template.name,
            itemCount: 0,
            owner: uid,
            users: users,
            template: template.id,
        };
        const key = Containers.create(uid, container);
        this.props.navigation.navigate(Screens.EditContainer, {id: key})
    };

    render() {
        return <ScrollView>
            {this.loading && <Spinner/>}
            {this.templates.map(t => <ListItem
                key={t.id}
                centerElement={{
                    primaryText: t.name,
                    secondaryText: `${t.compartments.length || 0} compartments`
                }}

                onPress={this.selectTemplate}
                onLongPress={this.selectTemplateDebug}
                onPressValue={t}

            />)}
        </ScrollView>
    }
}


const styles = StyleSheet.create({});
    