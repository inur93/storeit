import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Button} from 'react-native-material-ui';
import Dimensions from "react-native/Libraries/Utilities/Dimensions";
import {observer} from "mobx-react/native";
import {action, observable} from "mobx";
import {auth, Containers, db} from '../config/database';
import Spinner from "../components/Spinner";
import {Card} from 'react-native-material-ui';
import TextEdit from "../components/TextEdit";
import {toast} from "../constants/Methods";
import IconButton from "../components/IconButton";


@observer
export default class EditContainerScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: 'Edit container',
        headerRight: <IconButton name="check" onPress={navigation.getParam("save")}/>
    });

    @observable container = null;

    componentDidMount() {
        this.props.navigation.setParams({save: this._save});
        const id = this.props.navigation.getParam('id');
        Containers.get(id, container => {
            this.container = container;
        });
    }

    _save = () => {
       Containers.save(this.container.id, this.container);
       toast('saved changes');
       this.props.navigation.goBack();
    };

    render() {
        const {width, height} = Dimensions.get('window');
        const {showSplitOptions} = this;
        const {width: w, height: h, top, left} = (this.currentCompartment || {});
        const absWidth = width * w / 100;
        const absLeft = width * left / 100;
        if (!this.container) return <Spinner/>;
        const {name} = this.container;
        return (
            <View style={{height: height}}>
                <Card style={{height: height}}>
                    <TextEdit label={"name"} value={name} onChangeText={(text) => this.container.name = text}/>
                </Card>
                {/*<Text>Edit container - width: {width} height: {height} can merge: {this.canMerge ? 'yes' : 'no'}</Text>
                <View style={{height: 400, width: width, backgroundColor: 'red'}}>
                    {this.compartments.map(c =>
                        <Text key={c.label} style={{
                            backgroundColor: this.highlight.includes(c) ? 'yellow' : 'blue',
                            position: 'absolute',
                            borderWidth: 1,
                            height: c.height,
                            width: `${c.width}%`,
                            top: c.top,
                            left: width * c.left / 100,
                            textAlign: 'center'
                        }} onPress={() => this.handleShowSplitOptions(c)}>
                            {c.label}
                        </Text>)}
                    {showSplitOptions &&
                    <SplitBar top={top} left={absLeft} height={20} width={absWidth} label={"add above"}/>}
                    {showSplitOptions &&
                    <SplitBar top={top + h - 20} left={absLeft} height={20} width={absWidth} label={"add below"}
                              onPress={this.addBelow}/>}
                    {showSplitOptions &&
                    <SplitBar top={top} left={absLeft} height={h} width={20} label={"add left"} onPress={this.addLeft}/>}
                    {showSplitOptions &&
                    <SplitBar top={top} left={absLeft + (absWidth) - 20} height={h} width={20} label={"add right"}/>}
                </View>
                <Button text="save" onPress={this.saveContainer} />*/}
            </View>)
    }
}

const SplitBar = ({top, left, width, height, label, onPress}) => {
    return <Text
        onPress={onPress}
        style={{
            backgroundColor: 'red',
            top: top,
            left: left,
            width: width,
            height: height,
            position: 'absolute',
            textAlign: 'center'
        }}>{label}</Text>
}