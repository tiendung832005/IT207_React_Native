import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const INIT_DATA = [
  { id: "1", name: "HTML, CSS, JavaScript" },
  { id: "2", name: "Python" },
  { id: "3", name: "React.js" },
];

function getMoreData(startId: number, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: (startId + i).toString(),
    name: `Item ${startId + i}`,
  }));
}

export default function Bai4() {
  const [data, setData] = useState<{ id: string; name: string }[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleAddData = () => {
    setData(INIT_DATA);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setData(INIT_DATA);
      setRefreshing(false);
    }, 1200);
  }, []);

  const onEndReached = () => {
    if (loadingMore || data.length === 0) return;
    setLoadingMore(true);
    setTimeout(() => {
      const nextId = data.length + 1;
      setData((prev) => [...prev, ...getMoreData(nextId, 3)]);
      setLoadingMore(false);
    }, 1200);
  };

  const renderItem = ({ item }: { item: { id: string; name: string } }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Không có dữ liệu</Text>
    </View>
  );

  const renderFooter = () =>
    loadingMore ? (
      <View style={{ padding: 16 }}>
        <ActivityIndicator size="small" color="#1976d2" />
      </View>
    ) : null;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleAddData}>
        <Text style={styles.buttonText}>THÊM DỮ LIỆU</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          data.length === 0 ? styles.emptyList : styles.list
        }
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
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
  button: {
    backgroundColor: "#1976d2",
    paddingVertical: 12,
    borderRadius: 4,
    marginHorizontal: 16,
    marginBottom: 24,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 120,
  },
  emptyText: {
    color: "#888",
    fontSize: 16,
  },
});
