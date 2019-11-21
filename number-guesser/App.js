import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  });
};

export default function App() {

  const [userNumer, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return <AppLoading 
      startAsync={fetchFonts} 
      onFinish={() => setDataLoaded(true)} 
      onError={(err) => console.log(err)}
      />;
  }

  const newGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  }
  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumer && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumer} onGameOver={gameOverHandler} />;
  } else if (guessRounds > 0) {
    content = <GameOverScreen newGame={newGameHandler} rounds={guessRounds} userNumber={userNumer} />;
  }
  return (
    <View style={styles.screen}>
      <Header title="Put in a number for me to guess..." />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
