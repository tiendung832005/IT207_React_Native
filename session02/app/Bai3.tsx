import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Bai3() {
  const [name, setName] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Họ và tên:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên của bạn..."
        value={name}
        onChangeText={setName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  label: {
    fontSize: 20,
    color: '#333',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  input: {
    width: 280,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    backgroundColor: '#fff',
  },
});
