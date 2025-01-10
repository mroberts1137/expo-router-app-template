import React from 'react';
import { View } from 'react-native';
import { Text, useTheme, makeStyles } from '@rneui/themed';
import ToggleTheme from '@/components/ToggleTheme';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  swatchContainer: {
    width: '30%',
    marginBottom: 10
  },
  swatch: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    marginBottom: 5
  }
}));

const defaultColors = [
  'white',
  'black',
  'grey0',
  'grey1',
  'grey2',
  'grey3',
  'grey4',
  'grey5',
  'greyOutline',
  'searchBg'
];

const ColorSwatch = ({ color, name }) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const colorValue = theme.colors[color];

  // Don't render if the color is not a valid string
  if (typeof colorValue !== 'string') return null;

  return (
    <View style={styles.swatchContainer}>
      <View style={[styles.swatch, { backgroundColor: colorValue }]} />
      <Text>
        {name}: {colorValue}
      </Text>
    </View>
  );
};

const ThemeDebugger = () => {
  const { theme } = useTheme();
  const styles = useStyles();
  const colorKeys = Object.keys(theme.colors).filter(
    (key) =>
      typeof theme.colors[key] === 'string' && !['platform'].includes(key)
  );
  const customColors = colorKeys.filter(
    (color) => !defaultColors.includes(color)
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text h2>Colors</Text>
        <ToggleTheme />
      </View>
      <View style={styles.colorGrid}>
        {customColors.map((color) => (
          <ColorSwatch key={color} color={color} name={color} />
        ))}
        {defaultColors.map((color) => (
          <ColorSwatch key={color} color={color} name={color} />
        ))}
      </View>
    </View>
  );
};

export default ThemeDebugger;
