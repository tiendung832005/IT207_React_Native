import React from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useProductDetails } from "../../../hooks/useProducts";
import { useAddToCart } from "../../../hooks/useCart";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, error } = useProductDetails(id as string);
  const addMutation = useAddToCart();

  if (isLoading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (error || !data)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Không thể tải sản phẩm</Text>
      </View>
    );

  const product = data;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>Giá: {product.price}</Text>
      <Button
        title="Thêm vào giỏ"
        onPress={() =>
          addMutation.mutate({ productId: product.id, quantity: 1 })
        }
        disabled={addMutation.isPending}
      />
    </View>
  );
}
