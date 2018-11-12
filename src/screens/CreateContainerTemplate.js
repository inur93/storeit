import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-material-ui';
import Dimensions from "react-native/Libraries/Utilities/Dimensions";
import {observer} from "mobx-react/native";
import {action, observable} from "mobx";
import {auth, db} from '../config/database';


@observer
export default class EditContainerScreen extends Component {

    static navigationOptions = {
        title: 'Edit container'
    }
    @observable compartments = [];

    @observable currentCompartment = null;
    @observable showSplitOptions = false;
    @observable highlight = [];
    count = 2;

    @observable canMerge = false;

    componentWillMount() {
    }


    async componentDidMount(){
        console.log('init');
        const {user} = await auth.signInAnonymously();
        console.log(user);
        db.ref('containers/2').on('value', snapshot => {
            const value = snapshot.val();
            console.log(value);
            if(value){
                this.compartments = value.compartments;
            }else{
                this.compartments = [{
                    width: 100,
                    height: 400,
                    top: 0,
                    left: 0,
                    label: "1"
                }];
            }
        });
    }


    @action handleShowSplitOptions = (compartment) => {
        this.currentCompartment = compartment;
        this.showSplitOptions = true;
    };

    @action addLeft = () => {
        const {width, height, top, left} = this.currentCompartment;
        this.currentCompartment.width = width / 2;
        this.currentCompartment.left = left + width / 2;
        this.compartments.push({
            width: width / 2,
            height: height,
            top: top,
            left: left,
            label: `${this.count++}`
        });
        this.showSplitOptions = false;
    };

    @action addBelow = () => {
        const {width, height, top, left} = this.currentCompartment;
        this.currentCompartment.height = height / 2;
        this.compartments.push({
            width: width,
            height: height / 2,
            top: top + height / 2,
            left: left,
            label: `${this.count++}`
        });
        this.showSplitOptions = false;
    };

    saveContainer = () => {
        const container = {
            name: 'Freezer',
            compartments: this.compartments
        };
        db.ref('containers/2').set(container);
    };

    render() {
        const {width, height} = Dimensions.get('window');
        const {showSplitOptions} = this;
        const {width: w, height: h, top, left} = (this.currentCompartment || {});
        const absWidth = width * w / 100;
        const absLeft = width * left / 100;
        return (
            <View>
                <Text>Edit container - width: {width} height: {height} can merge: {this.canMerge ? 'yes' : 'no'}</Text>
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
                <Button text="save" onPress={this.saveContainer} />
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