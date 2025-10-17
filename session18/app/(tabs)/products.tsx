// import { Ionicons } from "@expo/vector-icons";
// import { Stack, useRouter } from "expo-router";
// import React from "react";
// import {
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// // Dữ liệu sản phẩm fix cứng
// const PRODUCTS = [
//   {
//     id: "1",
//     name: "Áo thun Premium Slim Fit",
//     price: 350000,
//     image:
//       "https://tourandtate.com/vi/cdn/shop/files/2_7489a4ea-74f4-4a95-8729-945b68c22d66.jpg?v=1759694762&width=600",
//   },
//   {
//     id: "2",
//     name: "Ổ cứng di động WD 2TB",
//     price: 1850000,
//     image:
//       "https://th.bing.com/th/id/OIP.uEw1U3NQMQqezXcFacmjVgHaEZ?o=7&cb=12rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
//   },
//   {
//     id: "3",
//     name: "Vòng tay rồng John Hardy",
//     price: 12500000,
//     image:
//       "https://bizweb.dktcdn.net/thumb/large/100/449/470/products/e02758d7-caf3-44f6-9a61-d3970f1228f7.jpg?v=1660542354000",
//   },
//   {
//     id: "4",
//     name: "Balo Fjallraven Foldsack",
//     price: 2150000,
//     image:
//       "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT-pYrso-MrNOKt5WyoHodjPTpKmm2yV4a2rZjp2UiW-BLzCIaDhs7fG44u2zzB-6J9y43U0IQSkVhuE_qY5oa_HGNDcTPzA9XKJyZAyJuwwuU4gXP_LgR2jWW_586No2qxhFB7D_o&usqp=CAc",
//   },
//   {
//     id: "5",
//     name: "Đồng hồ nữ Micropave",
//     price: 3700000,
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1sqR9keIrNvP3Ho-5AHX6t7jdf7JBN8Knlw&s",
//   },
//   {
//     id: "6",
//     name: "Áo khoác nam Cotton",
//     price: 950000,
//     image:
//       "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT54vw89eHXiTa6TAvTua_-9itPdfiEfIvgt0VEkN4t0wtNXSIipHu9Q5-HLwobzYyWzFvxxjeWutgUUSisxaF3Ps17Oppl9RIWLLQtBlhZOnOtlLthRydl5im9ukA2iqoOSWrSVw&usqp=CAc",
//   },
// ];

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
// }

// type ProductCardProps = {
//   item: Product;
// };

// const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
//   const router = useRouter();

//   return (
//     <View style={styles.card}>
//       <Image
//         source={{ uri: item.image }}
//         style={styles.image}
//         resizeMode="contain"
//       />
//       <Text
//         onPress={() =>
//           router.push({
//             pathname: "../product-detail",
//             params: { id: item.id },
//           })
//         }
//         style={styles.title}
//         numberOfLines={2}
//       >
//         {item.name}
//       </Text>
//       <Text style={styles.price}>{item.price.toLocaleString("vi-VN")} VNĐ</Text>
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => router.push("../cart")} // Chuyển hướng qua trang giỏ hàng khi nhấn
//       >
//         <Ionicons name="add" size={20} color="white" />
//         <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default function ProductsScreen() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Stack.Screen options={{ title: "Cửa hàng" }} />
//       <FlatList
//         data={PRODUCTS}
//         renderItem={({ item }) => <ProductCard item={item} />}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         contentContainerStyle={styles.listContainer}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f5f5f5" },
//   listContainer: { padding: 8 },
//   card: {
//     flex: 1,
//     backgroundColor: "white",
//     borderRadius: 10,
//     margin: 8,
//     padding: 12,
//     alignItems: "center",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   image: { width: "100%", height: 120, marginBottom: 10 },
//   title: { fontSize: 14, fontWeight: "600", textAlign: "center", height: 40 },
//   price: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#e53e3e",
//     marginVertical: 8,
//   },
//   addButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#007AFF",
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//   },
//   addButtonText: { color: "white", fontWeight: "bold", marginLeft: 4 },
// });