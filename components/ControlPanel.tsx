import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';

interface ControlPanelProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onFirst?: () => void;
  onLast?: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onPrevious,
  onNext,
  onFirst,
  onLast
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <Button
          icon={{ name: 'fast-rewind', color: 'white' }}
          onPress={onFirst}
          type='clear'
        />
        <Button
          icon={{ name: 'chevron-left', color: 'white' }}
          onPress={onPrevious}
          type='clear'
        />
        <Button
          icon={{ name: 'chevron-right', color: 'white' }}
          onPress={onNext}
          type='clear'
        />
        <Button
          icon={{ name: 'fast-forward', color: 'white' }}
          onPress={onLast}
          type='clear'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c3e50',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#34495e'
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  }
});
