import React from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";

const products = [
  { id: "1", name: "Sản phẩm A" },
  { id: "2", name: "Sản phẩm B" },
  { id: "3", name: "Sản phẩm C" },
];

type NavigationProps = {
  navigate: (screen: string, params?: { id: string }) => void;
  dispatch: (action: any) => void;
};

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProps>();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Home Screen</Text>
      <Button
        title="Open Drawer"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <Text style={{ fontSize: 18, marginVertical: 16 }}>
        Danh sách sản phẩm:
      </Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 12,
              backgroundColor: "#f2f2f2",
              borderRadius: 8,
              marginBottom: 10,
              width: 200,
              alignItems: "center",
            }}
            onPress={() =>
              navigation.navigate("DetailsScreen", { id: item.id })
            }
          >
            <Text style={{ fontSize: 16 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
