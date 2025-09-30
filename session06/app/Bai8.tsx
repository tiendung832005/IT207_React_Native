import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

// Dữ liệu giả lập ban đầu
const INIT_BLOGS = [
  {
    id: "1",
    title: "Giới thiệu React Native",
    author: "Nguyễn Văn A",
    date: "2025-09-01",
    summary: "Tìm hiểu tổng quan về React Native và các ứng dụng thực tế.",
  },
  {
    id: "2",
    title: "Hướng dẫn sử dụng FlatList",
    author: "Trần Thị B",
    date: "2025-09-10",
    summary: "Cách sử dụng FlatList để hiển thị danh sách hiệu quả.",
  },
  {
    id: "3",
    title: "Tối ưu hiệu năng trong React Native",
    author: "Lê Văn C",
    date: "2025-09-15",
    summary: "Các kỹ thuật tối ưu hiệu năng cho ứng dụng di động.",
  },
  {
    id: "4",
    title: "Sử dụng SectionList nâng cao",
    author: "Phạm Thị D",
    date: "2025-09-20",
    summary: "Phân loại dữ liệu với SectionList.",
  },
  {
    id: "5",
    title: "Quản lý trạng thái với Redux",
    author: "Ngô Văn E",
    date: "2025-09-25",
    summary: "Giới thiệu Redux và cách tích hợp vào React Native.",
  },
];

function getMoreBlogs(startId: number, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const id = (startId + i).toString();
    return {
      id,
      title: `Bài viết ${id}`,
      author: `Tác giả ${id}`,
      date: `2025-10-${(startId + i).toString().padStart(2, "0")}`,
      summary: `Tóm tắt nội dung cho bài viết ${id}.`,
    };
  });
}

export default function Bai8() {
  const [blogs, setBlogs] = useState(INIT_BLOGS);
  const [loadingMore, setLoadingMore] = useState(false);

  const renderItem = ({ item }: { item: (typeof INIT_BLOGS)[0] }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.meta}>
        Tác giả: {item.author} | Ngày: {item.date}
      </Text>
      <Text style={styles.summary}>{item.summary}</Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Danh sách bài viết ({blogs.length})</Text>
    </View>
  );

  const renderFooter = () =>
    loadingMore ? (
      <View style={{ padding: 16 }}>
        <ActivityIndicator size="small" color="#1976d2" />
        <Text style={{ textAlign: "center", color: "#1976d2", marginTop: 8 }}>
          Đang tải thêm...
        </Text>
      </View>
    ) : null;

  const onEndReached = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const nextId = blogs.length + 1;
      setBlogs((prev) => [...prev, ...getMoreBlogs(nextId, 3)]);
      setLoadingMore(false);
    }, 1200);
  }, [loadingMore, blogs.length]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={blogs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.list}
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
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    marginBottom: 16,
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
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
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  meta: {
    color: "#1976d2",
    fontSize: 13,
    marginBottom: 4,
  },
  summary: {
    fontSize: 14,
    color: "#444",
  },
});
