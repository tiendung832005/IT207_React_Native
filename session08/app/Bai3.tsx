import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "counterValue";

const CounterScreen = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        setCount(Number(value));
      }
      setLoading(false);
    };
    fetchCount();
  }, []);

  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(STORAGE_KEY, String(count));
    }
  }, [count, loading]);

  const handleIncrease = () => setCount((c) => c + 1);
  const handleDecrease = () => setCount((c) => c - 1);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Giá trị bộ đếm:</Text>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttonRow}>
        <Button title="Tăng" onPress={handleIncrease} />
        <Button title="Giảm" onPress={handleDecrease} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 20,
    marginBottom: 8,
  },
  count: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
  },
});

export default CounterScreen;
