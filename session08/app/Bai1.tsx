import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WelcomeScreen = () => {
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState<string | null>(null);

  useEffect(() => {
    const fetchName = async () => {
      const value = await AsyncStorage.getItem("userName");
      if (value) setSavedName(value);
    };
    fetchName();
  }, []);

  const handleSave = async () => {
    await AsyncStorage.setItem("userName", name);
    setSavedName(name);
  };

  return (
    <View style={styles.container}>
      {savedName ? (
        <Text style={styles.welcome}>Chào mừng trở lại, {savedName}!</Text>
      ) : (
        <>
          <Text style={styles.label}>Nhập tên của bạn:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Tên của bạn"
          />
          <Button title="Lưu" onPress={handleSave} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 6,
    paddingHorizontal: 8,
    height: 40,
    width: "80%",
    marginBottom: 16,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
});

export default WelcomeScreen;
