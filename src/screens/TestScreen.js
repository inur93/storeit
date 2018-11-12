import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import FormLabel from "../components/FormLabel";
import TextEdit from "../components/TextEdit";
import DatePicker from "../components/DatePicker";
import NumberInput from "../components/NumberInput";

@observer
export default class TestScreen extends Component {


    render() {
        const container = {
            /*flex: 1,*/
            display: 'flex',
          /*  alignItems: 'flex-end',
            alignContent: 'stretch'*/
           /* alignContent: 'stretch'*/

           /* flexDirection: 'column',
            alignItems: 'flex-start'*/
        };
        const row = {
            //display: 'flex',
            flexDirection: 'row',
            //width: '100%'
/*
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            alignContent: 'stretch',
            flexWrap: 'wrap'
*/

          //  alignItems: 'stretch'
            //alignItems: 'flex-start'
           /* flex: 1,
            display: 'flex',

            alignItems: 'flex-start'*/
        };
        const item = {
            //display: 'flex',
            //flexDirection: 'row'
            /*display: 'flex'*/
            /*flex: 1,*/

        };

        return <View>
            <FormLabel>Form label test</FormLabel>
            <View style={container}>
                <View style={row}>
                    <View style={item}>
                        <TextEdit value={"7. November 2018"}
                                  placeholder={"test placeholder"}
                                  label={"text label label"}
                                  required={true}/>

                    </View><View style={item}>
                        <TextEdit value={"7. November 2018"}
                                  placeholder={"test placeholder"}
                                  label={"text label label"}
                                  required={true}/>

                    </View><View style={item}>
                        <TextEdit value={"7. November 2018"}
                                  placeholder={"test placeholder"}
                                  label={"text label label"}
                                  required={true}/>

                    </View>
                </View>
                <View style={row}>
                    <View style={item}>
                        <TextEdit value={"7. November 2018"}
                                  placeholder={"test placeholder"}
                                  label={"text label label"}
                                  required={true}/>

                    </View>
                    <View style={item}>
                        <DatePicker label={"Date picker"}
                                    value={new Date().getTime()}
                                    onChange={() => console.log('test')}
                        />
                    </View>
                </View>
                <View style={row}>
                    <View style={item}>
                        <TextEdit value={"7. November 2018"}
                                  placeholder={"test placeholder"}
                                  label={"text label label"}
                                  required={true}/>

                    </View>
                    <View style={item}>
                        <NumberInput label={"Date picker"}
                                     value={0}
                                     onChange={() => console.log('test')}
                        />
                    </View>
                </View>
            </View>

        </View>
    }
}

const styles = StyleSheet.create({});
    