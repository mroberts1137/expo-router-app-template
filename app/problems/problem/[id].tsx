import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { BoardRenderer } from '@/components/BoardRenderer';
import { BoardStateManager } from '@/utils/boardState';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stone } from '@/types/board';
import ErrorBoundary from 'react-native-error-boundary';
import {
  SafeAreaView,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import { ControlPanel } from '@/components/ControlPanel';

export default function ProblemScreen() {
  const [boardManager] = useState(() => new BoardStateManager(19));
  const [boardState, setBoardState] = useState(() => boardManager.getState());
  const [currentPlayer, setCurrentPlayer] = useState<Stone>(1); // 1 for black, 2 for white

  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Calculate the available height for the board
  const CONTROL_PANEL_HEIGHT = 70; // Adjust this value based on your control panel height
  const availableHeight =
    windowHeight - insets.top - insets.bottom - CONTROL_PANEL_HEIGHT;

  // const range = undefined;

  // Top-left corner (9x9)
  const range = { startX: 0, startY: 0, endX: 8, endY: 8 };

  // Middle section (5x5)
  // const range = { startX: 7, startY: 7, endX: 11, endY: 11 };

  // Bottom-right corner
  // const range = { startX: 14, startY: 14, endX: 18, endY: 18 };

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

  // Placeholder navigation handlers
  const handleFirst = () => {
    console.log('First move');
  };

  const handlePrevious = () => {
    console.log('Previous move');
  };

  const handleNext = () => {
    console.log('Next move');
  };

  const handleLast = () => {
    console.log('Last move');
  };

  return (
    <ErrorBoundary>
      {/* <GestureHandlerRootView style={styles.container}> */}
      <SafeAreaView style={styles.container}>
        <View style={[styles.boardContainer, { height: availableHeight }]}>
          <BoardRenderer
            boardState={boardState}
            size={19}
            range={range}
            currentPlayer={currentPlayer}
            onPlaceStone={handlePlaceStone}
          />
        </View>
        <ControlPanel
          onFirst={handleFirst}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onLast={handleLast}
        />
      </SafeAreaView>
      {/* </GestureHandlerRootView> */}
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  boardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6BA7A'
  }
});
