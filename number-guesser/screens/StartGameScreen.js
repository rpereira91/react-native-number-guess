import React, { useState } from 'react';

import { View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
// custom card component
import Card from '../components/Card';
//custom color file
import Colors from '../constants/colors';
//custom input component 
import Input from '../components/Input';

import NumberContainer from '../components/NumberContainer';
const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmStart, setConfirmStart] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const numberInputHandler = inputText => {
        // .replace(/[^0-9]/g,'') will drop any non numbered value
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmStart(false);
    };
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 1000) {
            Alert.alert('Invalid Number!', 'Please pick a number between 1-1000', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]);
            return;
        }
        Keyboard.dismiss();
        setConfirmStart(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');

    };
    let confirmedOutput;
    if (confirmStart) {
        confirmedOutput = (
        <Card style={styles.summaryContainer}>
            <Text>Chosen Number</Text>
        <NumberContainer> {selectedNumber}</NumberContainer>
        {/* onStartGame was passed to the start game screen as a reference to the start game handler in app.js */}
        <Button title="Start Game" onPress={() => props.onStartGame(selectedNumber)}/>
        </Card>
        );
    }
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a new Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <Input style={styles.input} blurOnSubmit autoCorrect={false} keyboardType="number-pad" maxLength={3} onChangeText={numberInputHandler} value={enteredValue} />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Reset" onPress={resetInputHandler} color={Colors.accent} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>


    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 30,
        alignItems: 'center'
    }

});

export default StartGameScreen;