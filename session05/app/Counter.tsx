import React from 'react'
import { View, Button, Text, StyleSheet } from 'react-native';

const Counter: React.FC = () => {
  const [count, setCount] = React.useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttonRow}>
        <Button title='Tăng' onPress={() => setCount(count + 1)} />
        <View style={{ width: 16 }} />
        <Button title='Giảm' onPress={() => setCount(count - 1)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  count: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Counter;

