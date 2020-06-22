import React from 'react';
import { View, Modal, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingModal = ({ visible }) => {
  return <Modal
    visible={visible}
    transparent={true}
    style={styles.modal}
    onRequestClose={() => { }}
  >
    <View style={styles.container} >
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  </Modal>
}

export { LoadingModal };

const styles = StyleSheet.create({
    modal: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center'
    },
})
