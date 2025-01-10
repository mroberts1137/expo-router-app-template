import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';

interface GoBoardProps {
  boardState: number[][]; // 0: empty, 1: black, -1: white
  range?: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  };
  boardSize: number;
}

const GoBoard: React.FC<GoBoardProps> = ({
  boardState,
  range,
  boardSize = 19
}) => {
  const screenWidth = Dimensions.get('window').width;
  const boardWidth = screenWidth - 40; // Leaving some margin
  const cellSize = boardWidth / (boardSize - 1);

  // Calculate visible range
  const startX = range ? range.startX : 0;
  const startY = range ? range.startY : 0;
  const endX = range ? range.endX : boardSize - 1;
  const endY = range ? range.endY : boardSize - 1;
  const visibleBoardSize = Math.max(endX - startX, endY - startY) + 1;
  const visibleBoardWidth = cellSize * (visibleBoardSize - 1);

  const drawGridLines = () => {
    const lines = [];
    for (let i = 0; i < visibleBoardSize; i++) {
      // Horizontal lines
      lines.push(
        <Line
          key={`h${i}`}
          x1={0}
          y1={i * cellSize}
          x2={visibleBoardWidth}
          y2={i * cellSize}
          stroke='black'
          strokeWidth='1'
        />
      );
      // Vertical lines
      lines.push(
        <Line
          key={`v${i}`}
          x1={i * cellSize}
          y1={0}
          x2={i * cellSize}
          y2={visibleBoardWidth}
          stroke='black'
          strokeWidth='1'
        />
      );
    }
    return lines;
  };

  const drawStones = () => {
    const stones = [];
    for (let y = startY; y <= endY; y++) {
      for (let x = startX; x <= endX; x++) {
        const stone = boardState[y][x];
        if (stone !== 0) {
          stones.push(
            <Circle
              key={`${x},${y}`}
              cx={(x - startX) * cellSize}
              cy={(y - startY) * cellSize}
              r={cellSize / 2 - 1}
              fill={stone === 1 ? 'black' : 'white'}
              stroke='black'
              strokeWidth={stone === -1 ? 1 : 0}
            />
          );
        }
      }
    }
    return stones;
  };

  // Draw star points (hoshi)
  const drawStarPoints = () => {
    const starPoints = [];
    const starPointPositions = [3, boardSize === 19 ? 9 : 6, boardSize - 4];

    for (const x of starPointPositions) {
      for (const y of starPointPositions) {
        if (x >= startX && x <= endX && y >= startY && y <= endY) {
          starPoints.push(
            <Circle
              key={`star${x},${y}`}
              cx={(x - startX) * cellSize}
              cy={(y - startY) * cellSize}
              r={3}
              fill='black'
            />
          );
        }
      }
    }
    return starPoints;
  };

  return (
    <View style={styles.container}>
      <Svg width={visibleBoardWidth} height={visibleBoardWidth}>
        {drawGridLines()}
        {drawStarPoints()}
        {drawStones()}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0cfa0' // Traditional Go board color
  }
});

export default GoBoard;
