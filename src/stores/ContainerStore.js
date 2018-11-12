import {decorate, observable, computed, action} from 'mobx';
import {Containers, Items} from "../config/database";


/*
created: 07-11-2018
created by: Runi
*/

export default class ContainerStore {

    @observable myContainers = [];
    @observable currentContainer = null;
    @observable currentItems = [];

    authStore = null;
    myContainersHandler = null;
    currentContainerHandler = null;
    currentItemsHandler = null;

    constructor(authStore) {
        this.authStore = authStore;
    }

    fetchMyContainers = () => {
        this.releaseMyContainers();
        this.myContainersHandler = Containers.myContainers(this.authStore.uid, this._myContainersListener);
    };

    fetchContainer = (id) => {
        this.releaseCurrentContainer();
        this.currentContainerHandler = Containers.get(id, this._currentContainerListener);
        this.currentItemsHandler = Items.byContainer(id, this._currentItemsListener);
    };

    deleteItem = (item) => {

    };

    @action _myContainersListener = (containers) => {
        this.myContainers = containers;
    };
    @action _currentContainerListener = container => {
        this.currentContainer = container;
    };
    @action _currentItemsListener = items => {
        this.currentItems = items;
    };

    releaseMyContainers() {
        if (this.myContainersHandler) this.myContainersHandler();
        this.myContainersHandler = null;
    }

    releaseCurrentContainer() {
        if (this.currentContainerHandler) this.currentContainerHandler();
        this.currentContainerHandler = null;
    }
}


