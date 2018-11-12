import {decorate, observable, computed, autorun} from 'mobx';

/*
created: 29-10-2018
created by: Runi
*/

export default class AuthStore {

    @observable user = null;
    constructor() {
        autorun(() => {
            console.log('user update ->', this.user);
        })
    }

    @computed get uid(){
        return this.user && this.user.uid;
    }


    /*get user(){
        return this._user;
    }

    set user(user){
        this._user = user;
    }*/
}

