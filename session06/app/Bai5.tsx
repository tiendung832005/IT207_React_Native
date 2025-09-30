import React from "react";
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const DATA = [
  {
    title: "Điện thoại",
    data: ["iPhone 15", "Samsung Galaxy S24", "Xiaomi 13T"],
  },
  {
    title: "Laptop",
    data: ["MacBook Pro", "Dell XPS 13", "HP Spectre x360"],
  },
  {
    title: "Máy tính bảng",
    data: ["iPad Pro", "Samsung Tab S9", "Lenovo Tab P12"],
  },
];

export default function Bai5() {
  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  const renderSectionHeader = ({ section }: { section: { title: string } }) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{section.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
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
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    backgroundColor: "#1976d2",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 16,
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  item: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  itemText: {
    fontSize: 15,
  },
});
