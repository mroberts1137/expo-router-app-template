import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Circle, G } from 'react-native-svg';
import { BoardState, BoardRange, Stone, Coordinate } from '@/types/board';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

interface BoardRendererProps {
  boardState: BoardState;
  size: number;
  range?: BoardRange;
  currentPlayer: Stone;
  onPlaceStone?: (x: number, y: number) => void;
}

export const BoardRenderer: React.FC<BoardRendererProps> = ({
  boardState,
  size = 19,
  range,
  currentPlayer = 1,
  onPlaceStone
}) => {
  const [hoveredIntersection, setHoveredIntersection] =
    useState<Coordinate | null>(null);
  const [isValidMove, setIsValidMove] = useState<boolean>(false);

  const screenWidth = Dimensions.get('window').width;
  const padding = 20;
  const boardWidth = screenWidth - padding * 2;
  const spacing = boardWidth / (size - 1);

  // Calculate visible area
  const startX = range?.startX ?? 0;
  const startY = range?.startY ?? 0;
  const endX = range?.endX ?? size - 1;
  const endY = range?.endY ?? size - 1;
  const visibleWidth = (endX - startX + 1) * spacing;
  const visibleHeight = (endY - startY + 1) * spacing;

  // MODEL A
  // State for intersection highlight
  // const [highlightIntersection, setHighlightIntersection] = useState<{
  //   x: number;
  //   y: number;
  //   isValid: boolean;
  // } | null>(null);

  // // Find nearest intersection
  // const findNearestIntersection = (touchX: number, touchY: number) => {
  //   if (spacing === 0) return null;
  //   const x = Math.round(touchX / spacing);
  //   const y = Math.round(touchY / spacing);

  //   // Check if within bounds
  //   if (x >= startX && x <= endX && y >= startY && y <= endY) {
  //     // Check if intersection is valid
  //     const index = y * size + x;
  //     const isValid = boardState[index] === 0; // For now, just check if empty
  //     return { x, y, isValid };
  //   }
  //   return null;
  // };

  // // Gesture handler
  // const gesture = Gesture.Pan()
  //   .onBegin((event) => {
  //     const { x, y } = event;
  //     const intersection = findNearestIntersection(x - padding, y - padding);
  //     setHighlightIntersection(intersection);
  //   })
  //   .onUpdate((event) => {
  //     const { x, y } = event;
  //     const intersection = findNearestIntersection(x - padding, y - padding);
  //     setHighlightIntersection(intersection);
  //   })
  //   .onEnd(() => {
  //     if (
  //       highlightIntersection &&
  //       highlightIntersection.isValid &&
  //       onPlaceStone
  //     ) {
  //       const success = onPlaceStone(
  //         highlightIntersection.x,
  //         highlightIntersection.y
  //       );
  //       if (!success) {
  //         // Handle invalid move (e.g., ko rule violation)
  //       }
  //     }
  //     setHighlightIntersection(null);
  //   })
  //   .onFinalize(() => {
  //     setHighlightIntersection(null);
  //   });

  //MODEL B
  const getNearestIntersection = (
    touchX: number,
    touchY: number
  ): Coordinate => {
    const x = Math.round(touchX / spacing);
    const y = Math.round(touchY / spacing);
    return {
      x: Math.max(startX, Math.min(endX, x)),
      y: Math.max(startY, Math.min(endY, y))
    };
  };

  const isValidIntersection = (x: number, y: number): boolean => {
    // For now, just check if the intersection is empty
    return boardState[y * size + x] === 0;
  };

  const handleTouchMove = (event: any) => {
    const touch = event.nativeEvent;
    // const rect = event.currentTarget.getBoundingClientRect();
    const x = touch.locationX - padding;
    const y = touch.locationY - padding;

    const intersection = getNearestIntersection(x, y);
    setHoveredIntersection(intersection);
    setIsValidMove(isValidIntersection(intersection.x, intersection.y));
  };

  const handleTouchEnd = () => {
    if (hoveredIntersection && isValidMove && onPlaceStone) {
      onPlaceStone(hoveredIntersection.x, hoveredIntersection.y);
    }
    setHoveredIntersection(null);
  };
  //////////

  const renderGrid = () => {
    const lines = [];

    // Vertical lines
    for (let x = startX; x <= endX; x++) {
      lines.push(
        <Line
          key={`v${x}`}
          x1={x * spacing}
          y1={0}
          x2={x * spacing}
          y2={visibleHeight}
          stroke='black'
          strokeWidth='1'
        />
      );
    }

    // Horizontal lines
    for (let y = startY; y <= endY; y++) {
      lines.push(
        <Line
          key={`h${y}`}
          x1={0}
          y1={y * spacing}
          x2={visibleWidth}
          y2={y * spacing}
          stroke='black'
          strokeWidth='1'
        />
      );
    }

    return lines;
  };

  const renderStones = () => {
    const stones = [];

    for (let y = startY; y <= endY; y++) {
      for (let x = startX; x <= endX; x++) {
        const stone = boardState[y * size + x];
        if (stone !== 0) {
          stones.push(
            <Circle
              key={`${x}-${y}`}
              cx={x * spacing}
              cy={y * spacing}
              r={spacing * 0.4}
              fill={stone === 1 ? 'black' : 'white'}
              stroke='black'
              strokeWidth={stone === 2 ? 1 : 0}
            />
          );
        }
      }
    }

    return stones;
  };

  const renderStarPoints = () => {
    const starPoints = [];
    const starPositions = size === 19 ? [3, 9, 15] : [3, size - 4];

    for (const x of starPositions) {
      for (const y of starPositions) {
        if (x >= startX && x <= endX && y >= startY && y <= endY) {
          starPoints.push(
            <Circle
              key={`star-${x}-${y}`}
              cx={x * spacing}
              cy={y * spacing}
              r={3}
              fill='black'
            />
          );
        }
      }
    }

    return starPoints;
  };

  // Render highlight lines
  const renderHighlightLines = () => {
    if (!hoveredIntersection) return null;

    const { x, y } = hoveredIntersection;
    const color = isValidMove ? '#00ff00' : '#ff0000';

    return (
      <G>
        {/* Vertical highlight line */}
        <Line
          x1={x * spacing}
          y1={0}
          x2={x * spacing}
          y2={visibleHeight}
          stroke={color}
          strokeWidth='2'
          opacity='0.5'
        />
        {/* Horizontal highlight line */}
        <Line
          x1={0}
          y1={y * spacing}
          x2={visibleWidth}
          y2={y * spacing}
          stroke={color}
          strokeWidth='2'
          opacity='0.5'
        />
      </G>
    );
  };
  // const renderHighlight = () => {
  //   if (!highlightIntersection) return null;

  //   const { x, y, isValid } = highlightIntersection;
  //   const color = isValid ? 'green' : 'red';

  //   return (
  //     <G>
  //       <Line
  //         x1={(x - startX) * spacing}
  //         y1={0}
  //         x2={(x - startX) * spacing}
  //         y2={visibleHeight}
  //         stroke={color}
  //         strokeWidth={2}
  //       />
  //       <Line
  //         x1={0}
  //         y1={(y - startY) * spacing}
  //         x2={visibleWidth}
  //         y2={(y - startY) * spacing}
  //         stroke={color}
  //         strokeWidth={2}
  //       />
  //     </G>
  //   );
  // };

  return (
    <View style={styles.container}>
      <Svg
        width={visibleWidth}
        height={visibleHeight}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {renderGrid()}
        {renderStarPoints()}
        {renderHighlightLines()}
        {renderStones()}
      </Svg>
    </View>
  );
  // return (
  //   <GestureDetector gesture={gesture}>
  //     <View style={styles.container}>
  //       <Svg width={visibleWidth} height={visibleHeight}>
  //         {renderGrid()}
  //         {renderStarPoints()}
  //         {renderHighlight()}
  //         {renderStones()}
  //       </Svg>
  //     </View>
  //   </GestureDetector>
  // );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6BA7A'
  }
});
