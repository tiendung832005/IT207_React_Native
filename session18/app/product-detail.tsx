import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Dữ liệu chi tiết sản phẩm fix cứng
const PRODUCT_DETAIL = {
  id: "2",
  name: "Ổ cứng di động WD 2TB Elements Portable - USB 3.0",
  price: 1850000,
  image:
    "https://th.bing.com/th/id/OIP.uEw1U3NQMQqezXcFacmjVgHaEZ?o=7&cb=12rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
  rating: { rate: 4.8, count: 2150 },
  description:
    "WD 2TB Elements Portable External Hard Drive - USB 3.0, tương thích với PC, Mac, PS4 & Xbox. Cung cấp dung lượng lưu trữ lớn, tốc độ truyền dữ liệu nhanh chóng và thiết kế nhỏ gọn, bền bỉ.",
  sizes: ["1TB", "2TB", "4TB"],
};

export default function ProductDetailScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header tùy chỉnh */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerButton}
        >
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết sản phẩm</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="share-social-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: PRODUCT_DETAIL.image }}
          style={styles.productImage}
        />

        <View style={styles.detailsContainer}>
          {/* Tên và Đánh giá */}
          <Text style={styles.productName}>{PRODUCT_DETAIL.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" color="#FFC700" size={20} />
            <Text style={styles.ratingText}>
              {PRODUCT_DETAIL.rating.rate} (
              {PRODUCT_DETAIL.rating.count.toLocaleString()} đánh giá)
            </Text>
          </View>

          {/* Mô tả */}
          <Text style={styles.description}>{PRODUCT_DETAIL.description}</Text>

          {/* Chọn Size */}
          <Text style={styles.sectionTitle}>Dung lượng</Text>
          <View style={styles.sizeContainer}>
            {PRODUCT_DETAIL.sizes.map((size) => (
              <TouchableOpacity key={size} style={styles.sizeOption}>
                <Text style={styles.sizeText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.priceLabel}>Giá tiền</Text>
          <Text style={styles.priceValue}>
            {PRODUCT_DETAIL.price.toLocaleString("vi-VN")} VNĐ
          </Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton}>
          <Ionicons name="cart-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  productImage: { width: "100%", height: 300, resizeMode: "contain" },
  detailsContainer: { padding: 20 },
  productName: { fontSize: 24, fontWeight: "bold", color: "#222" },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  ratingText: { marginLeft: 8, fontSize: 16, color: "#555" },
  description: {
    fontSize: 16,
    color: "#4A5568",
    lineHeight: 24,
    marginVertical: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  sizeContainer: { flexDirection: "row", marginTop: 10 },
  sizeOption: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  sizeText: { fontSize: 16 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  priceLabel: { fontSize: 16, color: "gray" },
  priceValue: { fontSize: 22, fontWeight: "bold", color: "#e53e3e" },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  addToCartText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
});