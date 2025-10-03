import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Danh bạ</Text>
      <Button title="Thêm" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#dadada",
  },

  title: {
    fontSize: 24,
    fontWeight: 600,
  },
});