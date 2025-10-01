import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttonRow}>
        <Button title="Tăng" onPress={() => setCount(count + 1)} />
        <Button title="Giảm" onPress={() => setCount(count - 1)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    fontSize: 48,
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
  },
});

export default Counter;
