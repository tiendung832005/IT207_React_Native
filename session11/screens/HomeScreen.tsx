import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800",
      }}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Ionicons name="storefront" size={80} color="#fff" />
        <Text style={styles.title}>Apple Store</Text>
        <Text style={styles.subtitle}>Khám phá sản phẩm công nghệ cao cấp</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ProductList")}
        >
          <Text style={styles.buttonText}>Xem sản phẩm</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#ddd",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#3498db",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
