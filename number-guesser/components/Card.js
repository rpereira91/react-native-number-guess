import React from 'react';

import { View, StyleSheet } from 'react-native';

const Card = props => {

    return (
        // Spread the styles into the object, this helps over ride any outside styling with the components 
        // This way we can assign our own styles from outside of the card component
        <View style={{...styles.card, ...props.style}}>{props.children}</View>
    );
};

const styles = StyleSheet.create({

    card: {
        // shadow is only for iOS devices
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        // elevation used for android
        elevation: 5,
        // 
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    }

});

export default Card;