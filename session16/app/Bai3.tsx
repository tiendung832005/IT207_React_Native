import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { toggleMode } from "../redux/displaySlice";

const data = Array.from({ length: 12 }, (_, i) => ({
  id: i + "",
  name: `Item ${i + 1}`,
}));

const Bai3 = () => {
  const mode = useSelector((state: RootState) => state.display.mode);
  const dispatch = useDispatch();

  const renderItem = ({ item }: { item: (typeof data)[0] }) => (
    <View style={[styles.item, mode === "grid" && styles.gridItem]}>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch(toggleMode())}
      >
        <Text style={styles.buttonText}>
          Chuyển sang chế độ {mode === "list" ? "Lưới" : "Danh sách"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        key={mode}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={mode === "grid" ? 3 : 1}
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
  button: {
    marginBottom: 16,
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  list: {
    gap: 8,
  },
  item: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
  },
  gridItem: {
    margin: 4,
    minWidth: 0,
  },
});

export default Bai3;
