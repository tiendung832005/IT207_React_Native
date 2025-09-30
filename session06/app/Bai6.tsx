import React, { useState } from "react";
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from "react-native";

const DATA = [
  {
    title: "Thực phẩm",
    data: ["Gạo", "Thịt bò", "Sữa", "Trứng", "Rau xanh"],
  },
  {
    title: "Điện tử",
    data: ["iPhone 15", "Samsung TV", "MacBook Pro", "Tai nghe Sony"],
  },
  {
    title: "Đồ gia dụng",
    data: ["Máy giặt", "Tủ lạnh", "Nồi cơm điện", "Bàn ủi"],
  },
];

export default function Bai6() {
  const [search, setSearch] = useState("");

  const getFilteredSections = () => {
    if (!search.trim()) return DATA;
    const lower = search.toLowerCase();
    return DATA.map((section) => {
      const filtered = section.data.filter((item) =>
        item.toLowerCase().includes(lower)
      );
      return { ...section, data: filtered };
    }).filter((section) => section.data.length > 0);
  };

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
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm..."
        value={search}
        onChangeText={setSearch}
        clearButtonMode="while-editing"
      />
      <SectionList
        sections={getFilteredSections()}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không tìm thấy kết quả</Text>
        }
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
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
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
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 32,
  },
});
