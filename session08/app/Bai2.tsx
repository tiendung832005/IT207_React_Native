import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "nightMode";

const SettingsScreen = () => {
  const [nightMode, setNightMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNightMode = async () => {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        setNightMode(JSON.parse(value));
      }
      setLoading(false);
    };
    fetchNightMode();
  }, []);

  const handleToggle = async (value: boolean) => {
    setNightMode(value);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chế độ ban đêm</Text>
      <Switch
        value={nightMode}
        onValueChange={handleToggle}
        disabled={loading}
      />
      <Text style={styles.status}>
        {nightMode ? "Đang bật chế độ ban đêm" : "Đang tắt chế độ ban đêm"}
      </Text>
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
    marginBottom: 16,
  },
  status: {
    marginTop: 24,
    fontSize: 16,
    color: "#333",
  },
});

export default SettingsScreen;
