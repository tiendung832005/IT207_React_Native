import React from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";

const EMPLOYEES = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Samuel Johnson" },
  { id: "4", name: "Emily Davis" },
  { id: "5", name: "Michael Brown" },
  { id: "6", name: "Sarah Wilson" },
  { id: "7", name: "David Taylor" },
  { id: "8", name: "James Anderson" },
  { id: "9", name: "Mary Thomas" },
  { id: "10", name: "Robert Lee" },
];

type Employee = { id: string; name: string };

export default function Bai1() {
  const renderItem = ({ item }: { item: Employee }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>List Employee</Text>
      <FlatList
        data={EMPLOYEES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    paddingTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  item: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  name: {
    fontSize: 16,
  },
});
