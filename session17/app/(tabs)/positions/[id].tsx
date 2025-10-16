import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { fetchPositionById } from "../../../api/positions";

export default function PositionDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["position", id],
    queryFn: () => fetchPositionById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.center}>
        <Text>Không thể tải thông tin vị trí.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin vị trí</Text>
      <Text>ID: {data.positionId}</Text>
      <Text>Tên vị trí: {data.positionName}</Text>
      {/* Hiển thị thêm các trường khác nếu có */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
