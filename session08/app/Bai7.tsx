import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "cartItems";

const products = [
  { productId: "a1", name: "Laptop" },
  { productId: "b2", name: "Điện thoại" },
  { productId: "c3", name: "Tai nghe" },
];

type CartItem = {
  productId: string;
  name: string;
  quantity: number;
};

const ProductScreen = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      const value = await AsyncStorage.getItem(CART_KEY);
      if (value) {
        try {
          setCart(JSON.parse(value));
        } catch {}
      }
    };
    fetchCart();
  }, []);

  const handleAddToCart = async (product: {
    productId: string;
    name: string;
  }) => {
    let newCart = [...cart];
    const idx = newCart.findIndex(
      (item) => item.productId === product.productId
    );
    if (idx !== -1) {
      newCart[idx].quantity += 1;
    } else {
      newCart.push({ ...product, quantity: 1 });
    }
    setCart(newCart);
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(newCart));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách sản phẩm</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <View style={styles.productRow}>
            <Text style={styles.productName}>{item.name}</Text>
            <Button
              title="Thêm vào giỏ"
              onPress={() => handleAddToCart(item)}
            />
          </View>
        )}
      />
      <Text style={styles.cartTitle}>Giỏ hàng</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <View style={styles.cartRow}>
            <Text style={styles.cartName}>{item.name}</Text>
            <Text style={styles.cartQty}>Số lượng: {item.quantity}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Giỏ hàng trống</Text>}
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  productName: {
    fontSize: 18,
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 8,
  },
  cartRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cartName: {
    fontSize: 16,
  },
  cartQty: {
    fontSize: 16,
    color: "#333",
  },
  empty: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 16,
  },
});

export default ProductScreen;
