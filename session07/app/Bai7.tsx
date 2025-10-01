import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useWindowDimensions } from "react-native";

const items = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`);

const ResponsiveScreen = () => {
  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;
  const numColumns = isPortrait ? 1 : 2;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Chế độ: {isPortrait ? "Dọc (Portrait)" : "Ngang (Landscape)"}
      </Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <View style={[styles.item, numColumns === 2 && styles.itemLandscape]}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  list: {
    alignItems: "center",
  },
  item: {
    backgroundColor: "#e0e0e0",
    padding: 24,
    margin: 8,
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
  },
  itemLandscape: {
    width: "44%",
  },
  itemText: {
    fontSize: 18,
  },
});

export default ResponsiveScreen;
