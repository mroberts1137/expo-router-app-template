import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BoardRenderer } from '@/components/BoardRenderer';
import { BoardStateManager } from '@/utils/boardState';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stone } from '@/types/board';
import ErrorBoundary from 'react-native-error-boundary';

export default function ProblemScreen() {
  const [boardManager] = useState(() => new BoardStateManager(19));
  const [boardState, setBoardState] = useState(() => boardManager.getState());
  const [currentPlayer, setCurrentPlayer] = useState<Stone>(1); // 1 for black, 2 for white
  const [range] = useState({
    startX: 0,
    startY: 0,
    endX: 8,
    endY: 8
  });

  // const handlePlaceStone = (x: number, y: number): boolean => {
  //   // Check if the move is valid (for now, just check if empty)
  //   if (boardManager.getStone(x, y) === 0) {
  //     boardManager.setStone(x, y, currentPlayer);
  //     setBoardState(boardManager.getState());
  //     setCurrentPlayer(currentPlayer === 1 ? 2 : 1); // Switch player
  //     return true;
  //   }
  //   return false;
  // };
  const handlePlaceStone = (x: number, y: number) => {
    boardManager.setStone(x, y, currentPlayer);
    setBoardState(boardManager.getState());
    // Switch players
    setCurrentPlayer((current) => (current === 1 ? 2 : 1));
  };

  return (
    <ErrorBoundary>
      {/* <GestureHandlerRootView style={styles.container}> */}
      <View style={styles.container}>
        <BoardRenderer
          boardState={boardState}
          size={19}
          range={range}
          currentPlayer={currentPlayer}
          onPlaceStone={handlePlaceStone}
        />
      </View>
      {/* </GestureHandlerRootView> */}
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
