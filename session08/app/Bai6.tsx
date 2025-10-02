import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Switch, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "settings";

type Settings = {
  username: string;
  email: string;
  notificationsEnabled: boolean;
};

const defaultSettings: Settings = {
  username: "Guest",
  email: "",
  notificationsEnabled: true,
};

const SettingsScreen = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value) {
        try {
          setSettings({ ...defaultSettings, ...JSON.parse(value) });
        } catch {}
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings, loading]);

  const handleChange = (key: keyof Settings, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cài đặt người dùng</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Tên hiển thị:</Text>
        <TextInput
          style={styles.input}
          value={settings.username}
          onChangeText={(v) => handleChange("username", v)}
          editable={!loading}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={settings.email}
          onChangeText={(v) => handleChange("email", v)}
          editable={!loading}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Nhận thông báo:</Text>
        <Switch
          value={settings.notificationsEnabled}
          onValueChange={(v) => handleChange("notificationsEnabled", v)}
          disabled={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    width: 120,
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 6,
    paddingHorizontal: 8,
    height: 40,
  },
});

export default SettingsScreen;
