import React, { useState } from 'react';
import { Button, Modal, View, Text, StyleSheet, Alert } from 'react-native';
import { useTokens } from '@/contexts/TokensContext';
import CustomButton from '@/components/customComponents/CustomButton';
import { TOKENS_PER_REWARD } from '@/constants/tokens';
import ThemedText from '@/themes/themedComponents/ThemedText';
import TokensIcon from './TokensIcon';

export const TokenRewardModal = ({ visible, onClose, tokenAmount }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType='slide'
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Congratulations!</Text>
          <Text style={styles.modalText}>
            {`You've earned ${tokenAmount} new tokens!`}
          </Text>
          <Button title='Great!' onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const EarnTokensButton = () => {
  const { earnTokens, loading } = useTokens();
  const [rewardModalVisible, setRewardModalVisible] = useState(false);

  const handleEarnTokens = async () => {
    try {
      const result = await earnTokens();
      if (result) {
        setRewardModalVisible(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load ad. Please try again later.');
    }
  };

  return (
    <>
      <CustomButton
        width={320}
        height={50}
        onPress={handleEarnTokens}
        disabled={loading}
      >
        <View style={styles.buttonContainer}>
          <ThemedText variant='button'>Watch Ad for Tokens</ThemedText>
          <TokensIcon />
        </View>
      </CustomButton>
      <TokenRewardModal
        visible={rewardModalVisible}
        onClose={() => setRewardModalVisible(false)}
        tokenAmount={TOKENS_PER_REWARD}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18
  }
});

export default EarnTokensButton;
