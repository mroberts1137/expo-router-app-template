import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomAlert = ({ visible, title, message, buttons, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType='fade'
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  index === buttons.length - 1 && styles.primaryButton
                ]}
                onPress={() => {
                  onClose();
                  button.onPress && button.onPress();
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    index === buttons.length - 1 && styles.primaryButtonText
                  ]}
                >
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  alertBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    maxWidth: 300,
    padding: 20,
    width: '80%'
  },
  button: {
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  buttonText: {
    color: '#1A73E8',
    fontSize: 16
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center'
  },
  message: {
    fontSize: 16,
    marginBottom: 20
  },
  primaryButton: {
    backgroundColor: '#1A73E8',
    borderRadius: 5
  },
  primaryButtonText: {
    color: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  }
});

export default CustomAlert;
