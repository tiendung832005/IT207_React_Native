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
const INIT_PRODUCTS = [
  {
    id: "1",
    name: "iPhone 15",
    price: 25000000,
    shortDesc: "Điện thoại Apple mới nhất",
    detail: "Màn hình OLED 6.1 inch, chip A17, camera 48MP",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Samsung Galaxy S24",
    price: 21000000,
    shortDesc: "Flagship Android mạnh mẽ",
    detail: "Màn hình Dynamic AMOLED 2X, Exynos 2400, camera 50MP",
    rating: 4.6,
  },
  {
    id: "3",
    name: 'MacBook Pro 14"',
    price: 42000000,
    shortDesc: "Laptop Apple M3 Pro",
    detail: "Màn hình Liquid Retina XDR, chip M3 Pro, pin 18h",
    rating: 4.9,
  },
  {
    id: "4",
    name: "Sony WH-1000XM5",
    price: 9000000,
    shortDesc: "Tai nghe chống ồn cao cấp",
    detail: "Chống ồn chủ động, pin 30h, âm thanh Hi-Res",
    rating: 4.7,
  },
  {
    id: "5",
    name: "iPad Air 2024",
    price: 17000000,
    shortDesc: "Máy tính bảng Apple",
    detail: "Màn hình 10.9 inch, chip M2, hỗ trợ Apple Pencil",
    rating: 4.5,
  },
];

// Hàm giả lập tải thêm dữ liệu (có thể thay bằng fetch từ Google Sheet nếu cần)
function getMoreProducts(startId, count) {
  return Array.from({ length: count }, (_, i) => {
    const id = (startId + i).toString();
    return {
      id,
      name: `Sản phẩm ${id}`,
      price: 1000000 + (startId + i) * 100000,
      shortDesc: `Mô tả ngắn cho sản phẩm ${id}`,
      detail: `Thông tin chi tiết cho sản phẩm ${id}`,
      rating: (Math.random() * 2 + 3).toFixed(1),
    };
  });
}

export default function Bai7() {
  const [products, setProducts] = useState(INIT_PRODUCTS);
  const [loadingMore, setLoadingMore] = useState(false);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>Giá: {item.price.toLocaleString()}₫</Text>
      <Text style={styles.shortDesc}>{item.shortDesc}</Text>
      {item.detail && (
        <Text style={styles.detail}>Chi tiết: {item.detail}</Text>
      )}
      {item.rating && (
        <Text style={styles.rating}>Đánh giá: {item.rating} ★</Text>
      )}
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        Danh sách sản phẩm ({products.length})
      </Text>
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
      const nextId = products.length + 1;
      setProducts((prev) => [...prev, ...getMoreProducts(nextId, 3)]);
      setLoadingMore(false);
    }, 1200);
  }, [loadingMore, products.length]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
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
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    color: "#1976d2",
    fontWeight: "bold",
    marginBottom: 4,
  },
  shortDesc: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
  detail: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  rating: {
    fontSize: 13,
    color: "#e67e22",
  },
});
