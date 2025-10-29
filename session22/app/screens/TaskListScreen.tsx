import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TaskListScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Task List Screen</Text>
      <Button
        title="Go to Detail"
        onPress={() => navigation.navigate("TaskDetail" as never)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
