import {decorate, observable, computed, action, autorun} from 'mobx';
import {ShoppingLists} from "../config/database";
import {toast} from "../constants/Methods";

/*
created: 07-11-2018
created by: Runi
*/

export default class ShoppingStore {

    @observable myLists = [];
    @observable currentList = null;
    @observable itemOrder = 'title asc';

    @observable loading = {
        myLists: false,
        currentList: false
    };
    @observable errors = {
        create: null,
        read: null,
        update: null,
        delete: null
    };

    authStore = null;
    myListsHandler = null;
    currentListHandler = null;

    constructor(authStore) {
        this.authStore = authStore;
        autorun(() => {
            toast(`loading: ${this.loading.currentList}`);
        })
    }

    @computed get currentItems() {
        if (this.currentList) {
            const items = this.currentList.items;


            const sorted = items.sort((a,b) => {
                console.log(this.itemOrder);
                switch(this.itemOrder){
                    case 'title asc':
                        return a.title.localeCompare(b.title);
                    case 'title desc':
                        return b.title.localeCompare(a.title);
                    case 'checked first':
                        return !!a.checked ? -1 : 1;
                    case 'unchecked first':
                        return !a.checked ? -1 : 1;
                    default:
                        console.log('no matching sort')
                }
            });
            console.log('sorted->', sorted);
            return sorted;
        }
        return [];
    }


    @action fetchMyLists = () => {
        this.loading.myLists = true;
        this.releaseMyLists();
        this.myListsHandler = ShoppingLists.getMyLists(this.authStore.uid, this._myListsListener);
    };

    @action fetchList = (id) => {
        this.loading.currentList = true;
        this.releaseCurrentList();
        this.currentListHandler = ShoppingLists.getList(id, this._currentListListener);
    };

    @action _myListsListener = (lists) => {
        this.myLists = lists;
        this.loading.myLists = false;
    };

    @action _currentListListener = (list) => {
        this.currentList = list;
        this.loading.currentList = false;
    };

    @action create = (list) => {
        const uid = this.authStore.uid;
        list.owner = uid;
        console.log('creating shopping list', list);
        return ShoppingLists.create(uid, list);
    };

    @action deleteList = (list) => {
        return ShoppingLists.deleteList(this.authStore.uid ,list.id);
    }

    addToList = (item) => {
        return ShoppingLists.addToList(item.shoppingList, item);
    };

    checkItem = (item, checked) => {
        item.checked = checked;
        return ShoppingLists.checkItem(item.shoppingList, item);
    };

    deleteItem = (item) => {
        ShoppingLists.removeFromList(item.shoppingList, [item]);
    };

    deleteMultipleItems = (items) => {
        ShoppingLists.removeFromList(this.currentList.id, items);
    }

    @action update = (list) => {
        ShoppingLists.update(this.authStore.uid, list);
    };

    releaseMyLists = () => {
        if (this.myListsHandler) this.myListsHandler();
        this.myListsHandler = null;
    };

    releaseCurrentList = () => {
        if (this.currentListHandler) this.currentListHandler();
        this.currentListHandler = null;
    }
}