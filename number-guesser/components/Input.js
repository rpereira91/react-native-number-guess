import React from 'react';

import { View, StyleSheet, TextInput } from 'react-native';

const Input = props => {
    // {... props} spreads out all the props passed into this component over all the text input
    //  This way we can pass specific traits to this text input while still keeping the component losely coupled
    return <TextInput {...props} style= {{...styles.input, ...props.style}} />;
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10
    }
});

export default Input;