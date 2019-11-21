import React, { useState, useRef } from 'react';

import { View, Text, StyleSheet, Button , Alert} from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNumber = Math.floor(Math.random() * (max - min)) + min;
    if (rndNumber === exclude) {
        return generateRandomBetween(min, max, exclude)
    }
    else {
        return rndNumber;
    }
};

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 1000, props.userChoice));
    // These variables are stored detatched from the current rendering, that way these numbers aren't re-created each time the state is refreshed
    const currentLow = useRef(1);
    const currentHigh = useRef(1000);
    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)){
            Alert.alert("Liar!",'You know that this is incorrect...',[{text:"Sorry!", style:"cancel"}]);
            return;
        }
        if (direction === 'lower'){
            currentHigh.current = currentGuess;
        }
        
    };
    return (
        <View style={styles.screen}>
            <Text>
                Guess:
            </Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
                <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} />
            </Card>
        </View>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer:{ 
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }

});

export default GameScreen;