import React, {Component} from 'react';
import {View, Text, StyleSheet, Picker} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import TextEdit from "../components/TextEdit";
import {Button} from 'react-native-vector-icons/Ionicons';
import IconButton from "../components/IconButton";
import {toast} from "../constants/Methods";
import {ButtonGroup,} from 'react-native-elements';
import {Snackbar} from 'react-native-material-ui';
import NumberInput from "../components/NumberInput";
import WeightInput from "../components/WeightInput";
import DatePicker from "../components/DatePicker";

@inject("shoppingStore")
@observer
export default class CreateShoppingItemScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: `Add to '${navigation.getParam('title')}'`,
            headerRight: <IconButton name={'check'}
                                     iconContainerSyle={{marginRight: 16}}
                                     onPress={navigation.getParam('save')}/>
        }
    };

    @observable item = {
        title: "",
        shoppingList: null,
        expDate: null,
        measurement: {
            type: 1,
            value: 1,
            unit: 'kg'
        }
    };

    @observable selectedMeasurementType = 1;

    componentDidMount() {
        const {setParams, getParam} = this.props.navigation;
        setParams({save: this._save});
        this.item.shoppingList = getParam('id');
    }

    @action _save = () => {
        console.log('creating item->', this.item);
        this.props.shoppingStore.addToList(this.item);
        toast(`'${this.item.title}' added to '${this.props.navigation.getParam('title')}'`);
        this.item.title = "";
        this.item.expDate = null;
        this.item.measurement.value = 1;
    };

    @action handleWeightChange = (data) => {
        this.item.measurement.unit = data.unit;
        this.item.measurement.value = data.value;
    };

    @action handleQuantityChanged = value => {
        this.item.measurement.value = value;
    };

    @action handleMeasurementTypeChange = (index) => {
        this.item.measurement.type = index;
    };

    @action handleDateChange = (date) => {
        this.item.expDate = date;
    };

    render() {
        const {selectedMeasurementType} = this;
        const {expDate} = this.item;
        const {value, unit, type} = this.item.measurement;
        return <View>
            <TextEdit label={"Title"} onChangeText={value => this.item.title = value}/>
            <DatePicker label={"Expiration date"} value={expDate} onChange={this.handleDateChange}/>
            <ButtonGroup
                containerStyle={styles.buttonGroup}
                selectedIndex={type}
                onPress={this.handleMeasurementTypeChange}
                buttons={['Weight', 'Quantity']}/>
            {type === 0 && <WeightInput value={value} unit={unit} onChange={this.handleWeightChange}/>}
            {type === 1 && <NumberInput value={value} onChangeText={this.handleQuantityChanged}/>}
        </View>
    }
}

const styles = StyleSheet.create({
    buttonGroup: {
        marginTop: 8,
        marginLeft: 16,
        marginRight: 16,
    }
});
    