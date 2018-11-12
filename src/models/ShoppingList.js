import {observable} from "mobx";
import Item from "./Item";


export default class ShoppingList {

    id = null;
    @observable name = "";
    @observable owner = null;
    @observable items = [];

    constructor(json) {
        const {id, name, owner, items} = json;
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.items = items.map(item => new Item(item));
    }

    get json(){
        return({

        });
    }

}