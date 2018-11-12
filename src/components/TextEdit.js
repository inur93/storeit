import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, action, computed} from 'mobx';
import {Card, withTheme} from "react-native-material-ui";
import PropTypes from 'prop-types';
import FormLabel from "./FormLabel";
import FormInput from "./FormInput";
import FormControl from "./FormControl";

const getStyles = theme => ({
    container: {
        marginLeft: 16,
        marginRight: 16
    },
    formValidation: {
        fontFamily: theme.fontFamily,
        fontSize: 12,
        color: 'red',
    },
});


@observer
class TextEdit extends Component {

    render() {
        const {theme, label, required, keyboardType, ...otherProps} = this.props;
        const styles = getStyles(theme);
        return <FormControl>
            <FormLabel>{label}</FormLabel>
            <FormInput keyboardType={keyboardType}
                       placeholderTextColor={'#bebebe'}
                       {...otherProps}/>
            {required && (!otherProps.value) &&
            <Text style={styles.formValidation}>This field is required</Text>}
        </FormControl>
    }
}

export default withTheme(TextEdit)


TextEdit.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    required: PropTypes.bool,
    textContentType: PropTypes.oneOf([
        "none",
        "URL",
        "addressCity",
        "addressCityAndState",
        "addressState",
        "countryName",
        "creditCardNumber",
        "emailAddress",
        "familyName",
        "fullStreetAddress",
        "givenName",
        "jobTitle",
        "location",
        "middleName",
        "name",
        "namePrefix",
        "nameSuffix",
        "nickname",
        "organizationName",
        "postalCode",
        "streetAddressLine1",
        "streetAddressLine2",
        "sublocality",
        "telephoneNumber",
        "username",
        "password",
    ]),
    keyboardType: PropTypes.oneOf(["default",
        "number-pad",
        "decimal-pad",
        "numeric",
        "email-address",
        "phone-pad",
        "visible-password" // android only
    ])


};

TextEdit.defaultProps = {
    required: false
}