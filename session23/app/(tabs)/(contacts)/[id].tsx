import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContactData } from "../../../hooks/useContactData";

export default function BlacklistScreen() {
  // Sử dụng hook chung
  const { contacts, toggleBlockStatus } = useContactData();

  // Lọc danh sách bị chặn
  const blockedContacts = contacts.filter((c:any) => c.isBlocked);

  // Giả lập refresh khi quay lại tab
  const [refresh, setRefresh] = React.useState(0);
  useFocusEffect(
    React.useCallback(() => {
      setRefresh((r) => r + 1); // Cập nhật lại state để re-render
    }, [])
  );

  const handleUnblock = (id: string) => {
    // Đây là UI-only, ta chỉ gọi hàm từ hook
    toggleBlockStatus(id);
    console.log(`Bỏ chặn (UI-only) cho ID: ${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {blockedContacts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="shield-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>Danh sách đen trống</Text>
        </View>
      ) : (
        <FlatList
          data={blockedContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.phoneText}>{item.phone}</Text>
              </View>
              <TouchableOpacity
                style={styles.unblockButton}
                onPress={() => handleUnblock(item.id)}
              >
                <Text style={styles.unblockButtonText}>Bỏ chặn</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "#aaa", marginTop: 10 },
  itemContainer: {
    backgroundColor: "white",
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
  },
  nameText: { fontSize: 16, fontWeight: "600" },
  phoneText: { fontSize: 14, color: "#555", marginTop: 2 },
  unblockButton: {
    backgroundColor: "#34C759",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  unblockButtonText: { color: "white", fontWeight: "bold" },
});