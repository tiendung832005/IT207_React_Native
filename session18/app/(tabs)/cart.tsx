import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useCart,
  useUpdateCartItem,
  useDeleteCartItem,
  useClearCart,
} from "../../hooks/useCart";

type CartItemProps = { item: any };

const CartItem: React.FC<
  CartItemProps & {
    onUpdate: (id: any, qty: number) => void;
    onDelete: (id: any) => void;
    updating?: boolean;
  }
> = ({ item, onUpdate, onDelete, updating }) => (
  <View style={styles.itemContainer}>
    <Image
      source={{ uri: item.product?.thumbnail || item.product?.image }}
      style={styles.itemImage}
      resizeMode="contain"
    />
    <View style={styles.itemDetails}>
      <Text style={styles.itemName} numberOfLines={2}>
        {item.product?.name}
      </Text>
      <Text style={styles.itemPrice}>
        {(item.product?.price || 0).toLocaleString("vi-VN")} VNĐ
      </Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => onUpdate(item.id, Math.max(1, item.quantity - 1))}
          disabled={updating}
        >
          <Ionicons name="remove-circle-outline" size={28} color="#555" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => onUpdate(item.id, item.quantity + 1)}
          disabled={updating}
        >
          <Ionicons name="add-circle-outline" size={28} color="#555" />
        </TouchableOpacity>
      </View>
    </View>
    <TouchableOpacity onPress={() => onDelete(item.id)} disabled={updating}>
      <Ionicons name="trash-outline" size={24} color="#e53e3e" />
    </TouchableOpacity>
  </View>
);

const CartSummary = () => (
  <View style={styles.summaryContainer}>
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>Tạm tính</Text>
      <Text style={styles.summaryValue}>14.700.000 VNĐ</Text>
    </View>
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
      <TextInput keyboardType="numeric" style={styles.textInput} />
    </View>
    <View style={styles.separator} />
    <View style={styles.summaryRow}>
      <Text style={styles.totalLabel}>Tổng cộng</Text>
      <Text style={styles.totalValue}>14.700.000 VNĐ</Text>
    </View>
  </View>
);

export default function CartScreen() {
  const { data, isLoading } = useCart();
  const updateMutation = useUpdateCartItem();
  const deleteMutation = useDeleteCartItem();
  const clearMutation = useClearCart();

  const cartItems = data?.data?.items || [];

  const handleUpdate = (cartItemId: any, qty: number) => {
    updateMutation.mutate({ id: cartItemId, payload: { quantity: qty } });
  };

  const handleDelete = (cartItemId: any) => {
    Alert.alert("Xóa", "Bạn có chắc muốn xóa sản phẩm này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => deleteMutation.mutate(cartItemId),
      },
    ]);
  };

  const handleClear = () => {
    Alert.alert("Xóa tất cả", "Bạn có chắc muốn xóa toàn bộ giỏ hàng?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => clearMutation.mutate(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Giỏ hàng của bạn" }} />

      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              updating={updateMutation.isPending || deleteMutation.isPending}
            />
          )}
          keyExtractor={(item) => String(item.id)}
          ListFooterComponent={
            <>
              <CartSummary />
              <View style={{ padding: 16 }}>
                <Button
                  title="Xóa toàn bộ giỏ hàng"
                  onPress={handleClear}
                  color="#e53e3e"
                  disabled={clearMutation.isPending}
                />
              </View>
            </>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="cart-outline" size={80} color="#ccc" />
              <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  // CartItem styles
  itemContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemImage: { width: 80, height: 80, borderRadius: 8 },
  itemDetails: { flex: 1, marginLeft: 15, justifyContent: "space-between" },
  itemName: { fontSize: 16, fontWeight: "600" },
  itemPrice: { fontSize: 16, fontWeight: "bold", color: "#e53e3e" },
  quantityContainer: { flexDirection: "row", alignItems: "center" },
  quantityText: { fontSize: 18, fontWeight: "bold", marginHorizontal: 15 },
  // Summary styles
  summaryContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#fafafa",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryLabel: { fontSize: 16, color: "#666" },
  summaryValue: { fontSize: 16, fontWeight: "500" },
  separator: { height: 1, backgroundColor: "#e0e0e0", marginVertical: 10 },
  totalLabel: { fontSize: 18, fontWeight: "bold" },
  totalValue: { fontSize: 18, fontWeight: "bold", color: "#e53e3e" },
  // Empty state styles
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  emptyText: { marginTop: 10, fontSize: 16, color: "#888" },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: 150,
    height: 32,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: "#333",
  },
});
