import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  useWindowDimensions
} from 'react-native';
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

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  // const screenWidth = Dimensions.get('window').width;
  // const padding = 20;
  // const boardWidth = screenWidth - padding * 2;
  // const spacing = boardWidth / (size - 1);

  // Calculate visible area
  const startX = range?.startX ?? 0;
  const startY = range?.startY ?? 0;
  const endX = range?.endX ?? size - 1;
  const endY = range?.endY ?? size - 1;

  // Calculate number of intersections in visible area
  const visibleWidth = endX - startX;
  const visibleHeight = endY - startY;

  // Calculate the board size based on the smaller screen dimension
  const containerSize = Math.min(screenWidth, screenHeight) - 40; // 40 for padding

  // Calculate spacing based on visible area rather than full board
  const spacing = containerSize / Math.max(visibleWidth, visibleHeight);

  // Scale coordinates to container size
  const scaleCoordinate = (coord: number, isX: boolean): number => {
    const offset = isX ? startX : startY;
    return (coord - offset) * spacing;
  };

  const unscaleCoordinate = (pixel: number, isX: boolean): number => {
    const offset = isX ? startX : startY;
    return Math.round(pixel / spacing) + offset;
  };

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
    const x = unscaleCoordinate(touchX, true);
    const y = unscaleCoordinate(touchY, true);
    return {
      x: Math.max(startX, Math.min(endX, x)),
      y: Math.max(startY, Math.min(endY, y))
    };
  };

  const isValidIntersection = (x: number, y: number): boolean => {
    return boardState[y * size + x] === 0;
  };

  const handleTouchMove = (event: any) => {
    const touch = event.nativeEvent;
    const x = touch.locationX;
    const y = touch.locationY;

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

  const renderGrid = () => {
    const lines = [];

    // Vertical lines
    for (let x = startX; x <= endX; x++) {
      lines.push(
        <Line
          key={`v${x}`}
          x1={scaleCoordinate(x, true)}
          y1={0}
          x2={scaleCoordinate(x, true)}
          y2={containerSize}
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
          y1={scaleCoordinate(y, false)}
          x2={containerSize}
          y2={scaleCoordinate(y, false)}
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
              cx={scaleCoordinate(x, true)}
              cy={scaleCoordinate(y, false)}
              r={spacing * 0.48}
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
              cx={scaleCoordinate(x, true)}
              cy={scaleCoordinate(y, false)}
              r={3}
              fill='black'
            />
          );
        }
      }
    }

    return starPoints;
  };

  const renderHighlightLines = () => {
    if (!hoveredIntersection) return null;

    const { x, y } = hoveredIntersection;
    const color = isValidMove ? '#00ff00' : '#ff0000';

    return (
      <G>
        <Line
          x1={scaleCoordinate(x, true)}
          y1={0}
          x2={scaleCoordinate(x, true)}
          y2={containerSize}
          stroke={color}
          strokeWidth='2'
          opacity='0.5'
        />
        <Line
          x1={0}
          y1={scaleCoordinate(y, false)}
          x2={containerSize}
          y2={scaleCoordinate(y, false)}
          stroke={color}
          strokeWidth='2'
          opacity='0.5'
        />
      </G>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { width: containerSize, height: containerSize }
      ]}
    >
      <Svg
        width={containerSize}
        height={containerSize}
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
};
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
// };

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6BA7A'
  }
});
