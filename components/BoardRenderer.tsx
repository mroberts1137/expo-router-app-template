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

  // Add padding to accommodate full stones at edges
  const STONE_PADDING = 0.5; // Half a spacing unit for padding
  const LINE_EXTENSION = 0.3; // How far lines extend beyond the last intersection

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  // Calculate visible range
  const startX = range?.startX ?? 0;
  const startY = range?.startY ?? 0;
  const endX = range?.endX ?? size - 1;
  const endY = range?.endY ?? size - 1;
  const visibleWidth = endX - startX + 1;
  const visibleHeight = endY - startY + 1;

  // Calculate board size and spacing based on the visible range
  const availableSize = Math.min(screenWidth, screenHeight) - 40; // 40 for padding
  const boardSize = availableSize;

  // Calculate spacing based on visible range
  const spacingX = boardSize / (visibleWidth - 1 || 1);
  const spacingY = boardSize / (visibleHeight - 1 || 1);
  const spacing = Math.min(spacingX, spacingY);

  // Adjust board size to maintain square shape
  const actualBoardSize = spacing * (Math.max(visibleWidth, visibleHeight) - 1);

  const transformCoordinates = (x: number, y: number): [number, number] => {
    return [(x - startX) * spacing, (y - startY) * spacing];
  };

  const inverseTransformCoordinates = (
    x: number,
    y: number
  ): [number, number] => {
    return [Math.round(x / spacing) + startX, Math.round(y / spacing) + startY];
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
    const [x, y] = inverseTransformCoordinates(touchX, touchY);
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
    const intersection = getNearestIntersection(
      touch.locationX,
      touch.locationY
    );
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
      const [x1, y1] = transformCoordinates(x, startY);
      const [x2, y2] = transformCoordinates(x, endY);
      lines.push(
        <Line
          key={`v${x}`}
          x1={x1}
          y1={0}
          x2={x2}
          y2={actualBoardSize}
          stroke='black'
          strokeWidth='1'
        />
      );
    }

    // Horizontal lines
    for (let y = startY; y <= endY; y++) {
      const [x1, y1] = transformCoordinates(startX, y);
      const [x2, y2] = transformCoordinates(endX, y);
      lines.push(
        <Line
          key={`h${y}`}
          x1={0}
          y1={y1}
          x2={actualBoardSize}
          y2={y2}
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
          const [cx, cy] = transformCoordinates(x, y);
          stones.push(
            <Circle
              key={`${x}-${y}`}
              cx={cx}
              cy={cy}
              r={spacing * 0.47}
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
    const starPositions =
      size === 19 ? [3, 9, 15] : size === 13 ? [3, 6, 9] : [3, size - 4];

    for (const x of starPositions) {
      for (const y of starPositions) {
        if (x >= startX && x <= endX && y >= startY && y <= endY) {
          const [cx, cy] = transformCoordinates(x, y);
          starPoints.push(
            <Circle key={`star-${x}-${y}`} cx={cx} cy={cy} r={3} fill='black' />
          );
        }
      }
    }

    return starPoints;
  };

  const renderHighlightLines = () => {
    if (!hoveredIntersection) return null;

    const { x, y } = hoveredIntersection;
    const [hx, hy] = transformCoordinates(x, y);
    const color = isValidMove ? '#00ff00' : '#ff0000';

    return (
      <G>
        <Line
          x1={hx}
          y1={0}
          x2={hx}
          y2={actualBoardSize}
          stroke={color}
          strokeWidth='2'
          opacity='0.5'
        />
        <Line
          x1={0}
          y1={hy}
          x2={actualBoardSize}
          y2={hy}
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
        { width: actualBoardSize, height: actualBoardSize }
      ]}
    >
      <Svg
        width={actualBoardSize}
        height={actualBoardSize}
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
