import firebase from 'react-native-firebase';
import {AsyncStorage} from 'react-native';
import ShoppingList from "../models/ShoppingList";

export const db = firebase.database;
export const auth = firebase.auth;

export const storage = {
    save: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            return true;
        } catch (err) {
            console.error(err);
        }
        return false;
    },
    load: async (key) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (err) {
            console.error(err);
        }
        return false;
    }
};

const ref = path => {
    return path ? db().ref(path) : db().ref();
};

const update = (updates) => {
    return ref().update(updates, err => {
        console.log('error->', err);
    })
};

const set = (r, value) => {
    return ref(r).set(value, err => {
        console.log('erro->', err);
    })
};

const mapId = (s) => {
    if(!s) return null;
    let data = s.val();
    if(!data) return null;
    data.id = s.key;
    return data;
};

const mapShoppingList = (s) => {
    let list = mapId(s);
    if(!list) return null;
    let items = list.items || {};
    let itemList = [];
    Object.keys(items).forEach(key => {
        const item = items[key];
        item.id = key;
        itemList.push(item);
    });
    list.items = itemList;
    return new ShoppingList(list);
};

const Users = {
    get: (id, callback) => {
        ref(`storeitusers/${id}`).on('value', s => {
            const value = s.val();
            console.log('user ->', value);
            callback(value);
        }, error => {
            console.log('error reading user->', error);
        })
    }
};

const ContainerTemplates = {
    all: callback => db().ref('containerTemplates').once('value', callback)
};

const Containers = {
    myContainers: async (uid, callback) => {
        console.log('loading containers for user ->' + uid);

        const query = ref(`containers`)
            .orderByChild(`users/${uid}`)
            .equalTo(true);
        return query.on('value', snapshot => {
            let list = [];
            console.log('containers ->', snapshot);
            snapshot.forEach(child => {
                console.log('my containers child->', child);
                list.push(mapId(child))
            }, error => {
                console.log(error);
            });
            callback(list);
        }, err => {
            console.log('could not load errors ->', err);
        }).then(res => {
            console.log('res ->', res);
        });
    },
    create: (userId, container) => {
        const key = ref(`containers/`).push().key;
        const updates = {};
        updates[`containers/${key}`] = container;
        //updates[`users/${userId}/containers/${key}`] = true;
        console.log('key: ' + key);
        ref().update(updates);
        return key;
    },

    get: (id, callback) => {
        return ref(`containers/${id}`).on('value', snapshot => {
            console.log(`get container ${id}`, snapshot);
            let container = null;
            if (snapshot) container = mapId(snapshot);
            callback(container);
        });
    },
    save: (id, container) => {
        let updates = {};
        updates['name'] = container.name;
        return ref(`containers/${id}`).update(updates);
    }
};

const Items = {
    create: (item) => {
        return new Promise((resolve, reject) => {
            const id = ref(`items/`).push().key;
            item.id = id;
            ref(`items/${id}`).set(item, error => {
                if (error) {
                    reject(error);
                } else {
                    resolve(item);
                }
            });
            ref(`containers/${item.container}/itemCount`)
                .once('value', s => {
                    const val = s.val() || 0;
                    ref(`containers/${item.container}/itemCount`).set(val + 1);
                });

        });
    },
    update: (item) => {
        ref(`items/${item.id}`).set(item);
    },
    byContainer: (cid, callback) => {
        const query = ref(`items`).orderByChild('container').equalTo(cid);
        return query.on('value', snapshot => {
            let list = [];
            console.log(`by container ${cid} snapshot->`, snapshot);
            if (snapshot) {
                snapshot.forEach(child => {
                    if (child) list.push(mapId(child))
                });
            }
            callback(list);
        })
    },
    byUser: (uid, callback) => {
        Items.queryByUser(uid, null, callback)
    },

    queryByUser: (uid, query, callback) => {
        const q = ref(`items/${uid}`);
        q.once('value', s => {
            let list = [];
            s.forEach(child => {
                const val = child.val();
                if (!query || val.title.includes(query)) {
                    list.push(val);
                }
            });
            callback(list);
        })

    }
};

const ShoppingLists = {
    /*
    return new Promise((resolve, reject) => {
            const id = ref(`items/`).push().key;
            item.id = id;
            ref(`items/${id}`).set(item, error => {
                if (error) {
                    reject(error);
                } else {
                    resolve(item);
                }
            });
            ref(`containers/${item.container}/itemCount`)
                .once('value', s => {
                    const val = s.val() || 0;
                    ref(`containers/${item.container}/itemCount`).set(val + 1);
                });

        });
     */
    create: (uid, list) => {
        const key = ref(`users/${uid}/shoppinglists`).push().key;
        let updates = {};
        updates[`users/${uid}/shoppinglists/${key}`] = {
            name: list.name
        };
        updates[`shoppinglists/${key}`] = list;

        console.log('creating shopping list ->', {
           key, uid, list
        });
        ref().update(updates, error => {
            console.log('create error ->', error);
        });
        list.id = key;
        return list;
    },
    addToList: (lid, item) => {
        const key = ref(`shoppinglists/${lid}/items`).push().key;
        let updates = {};
        updates[`shoppinglists/${lid}/items/${key}`] = item;
        update(updates);
        item.id = key;
        return item;
    },
    checkItem: (lid, item) => {
        set(`shoppinglists/${lid}/items/${item.id}/checked`, item.checked);
    },
    removeFromList: (lid, items) => {
        if(!items || !items.length) return;
        let updates = {};
        items.forEach(item => {
            updates[`shoppinglists/${lid}/items/${item.id}`] = null;
        });
        update(updates);
    },
    update: (uid, list) => {
        let updates = {};
        updates[`users/${uid}/shoppinglists/${list.id}/name`] = list.name;
        updates[`shoppinglists/${list.id}.name`] = list.name;
        update(updates);
        //TODO handling errors
    },
    getMyLists: (uid, callback) => {
        const q = ref(`users/${uid}/shoppinglists`);
        return q.on('value', s => {
            let list = [];
            if(s) {
                s.forEach(child => {
                    list.push(mapId(child));
                });
            }
            callback(list);
        })
    },
    getList: (id, callback) => {
        const q = ref(`shoppinglists/${id}`);
        return q.on('value', s => {
            callback(mapShoppingList(s));
        })
    },
    deleteList: (uid, id) => {
        let updates = {};
        updates[`users/${uid}/shoppinglists/${id}`] = null;
        updates[`shoppinglists/${id}`] = null;
        update(updates);
    }
};

export {
    Users,
    ContainerTemplates,
    Containers,
    Items,
    ShoppingLists
}
