import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';

import GameScreen from './screens/GameScreen';
export default function App() {

  const [userNumer, setUserNumber] = useState();

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };
  let content = <StartGameScreen onStartGame={startGameHandler}/>;
  if (userNumer) {
    content = <GameScreen userChoice={userNumer}/>;
  }
  return (
    <View style={styles.screen}>
      <Header title="Put in a number for me to guess..."/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex: 1
  }
});
