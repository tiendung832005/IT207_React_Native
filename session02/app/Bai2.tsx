import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Bai2() {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttonRow}>
        <Button title="Tăng" onPress={() => setCount(count + 1)} />
        <View style={{ width: 20 }} />
        <Button title="Giảm" onPress={() => setCount(count - 1)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  count: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
