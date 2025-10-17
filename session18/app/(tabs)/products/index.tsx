import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native";
import { useProductsList } from "../../../hooks/useProducts";
import { useAddToCart } from "../../../hooks/useCart";
import { router } from "expo-router";

export default function ProductsScreen() {
  const { data, isLoading, error } = useProductsList();
  const addMutation = useAddToCart();

  if (isLoading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (error)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Không thể tải sản phẩm</Text>
      </View>
    );

  const products = data?.data || [];

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={products}
        keyExtractor={(it) => it.id?.toString?.()}
        renderItem={({ item }) => (
          <View
            style={{ padding: 12, borderBottomWidth: 1, borderColor: "#eee" }}
          >
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "./products/[id]",
                  params: { id: item.id },
                })
              }
            >
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <Text>{item.description}</Text>
            </TouchableOpacity>
            <Button
              title="Thêm vào giỏ"
              onPress={() =>
                addMutation.mutate({ productId: item.id, quantity: 1 })
              }
              disabled={addMutation.isPending}
            />
          </View>
        )}
      />
    </View>
  );
}
