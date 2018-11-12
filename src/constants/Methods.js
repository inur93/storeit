
import {ToastAndroid} from 'react-native';

export const toast = (msg, long = false) => {
    ToastAndroid.show(msg, long ? ToastAndroid.LONG : ToastAndroid.SHORT);
};
