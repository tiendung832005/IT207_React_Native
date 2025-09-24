import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: Platform.select({
    ios: {
      backgroundColor: "#fff",
      borderBottomWidth: 0,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
      paddingVertical: 14,
      paddingHorizontal: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    android: {
      backgroundColor: "#1976D2",
      elevation: 4,
      paddingVertical: 14,
      paddingHorizontal: 16,
      alignItems: "flex-start",
      justifyContent: "center",
    },
    default: {},
  }) as object,
  title: Platform.select({
    ios: {
      color: "#222",
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
    },
    android: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "left",
    },
    default: {},
  }) as object,
});

export default Header;
