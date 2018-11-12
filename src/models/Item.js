import {observable} from "mobx";


export default class Item {

    id = null; //is not observable - will never change
    @observable title = "";
    @observable shoppingList = null;
    @observable measurement = {
        type: 0,
        unit: 'kg',
        value: 1
    };

    @observable toBeDeleted = false;
    @observable checked = false;

    constructor(json) {
        const {id, title, shoppingList, measurement} = json;
        const {type, unit, value} = measurement;
        this.id = id;
        this.title = title;
        this.shoppingList = shoppingList;
        this.measurement.type = type;
        this.measurement.unit = unit;
        this.measurement.value = value;
    }

    get json(){
        const {title, shoppingList, measurement} = this;
        return ({
            title, shoppingList, measurement
        });
    }

}