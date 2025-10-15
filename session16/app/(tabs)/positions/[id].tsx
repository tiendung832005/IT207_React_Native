import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { usePositions } from "../../../hooks/usePositions";

export default function PositionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // Chuyển đổi id từ string sang number
  const positionId = Number(id);
  const { getPositionById, loading } = usePositions();

  const position = getPositionById(positionId);

  if (loading) return <ActivityIndicator size="large" />;
  if (!position)
    return <Text style={styles.errorText}>Không tìm thấy vị trí.</Text>;

  const isActive = position.positionStatus === "ACTIVE";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Tên vị trí</Text>
        <Text style={styles.valueName}>{position.positionName}</Text>

        <Text style={styles.label}>Mô tả</Text>
        <Text style={styles.valueDescription}>{position.description}</Text>

        <Text style={styles.label}>Trạng thái</Text>
        <Text
          style={[
            styles.valueStatus,
            { color: isActive ? "#2F855A" : "#C53030" },
          ]}
        >
          {isActive ? "Đang hoạt động" : "Không hoạt động"}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
  card: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 15,
    elevation: 3,
  },
  label: { fontSize: 16, color: "gray", marginTop: 20 },
  valueName: { fontSize: 28, fontWeight: "bold", color: "#2D3748" },
  valueDescription: { fontSize: 16, color: "#4A5568", lineHeight: 24 },
  valueStatus: { fontSize: 20, fontWeight: "bold" },
  valueDate: { fontSize: 16, fontStyle: "italic", color: "#718096" },
  errorText: { textAlign: "center", marginTop: 50, fontSize: 18, color: "red" },
});