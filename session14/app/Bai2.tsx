import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";

type Position = {
  id: number;
  positionName: string;
  description: string;
  positionStatus: string;
  createdAt: string;
};

export default function Bai2() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://nest-api-public.ixe-agent.io.vn/api/v1/positions")
      .then((response) => {
        setPositions(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Lỗi khi lấy dữ liệu");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách vị trí công việc</Text>
      <FlatList
        data={positions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.positionItem}>
            <Text style={styles.positionName}>{item.positionName}</Text>
            <Text style={styles.positionDesc}>{item.description}</Text>
            <Text style={styles.positionStatus}>
              Trạng thái: {item.positionStatus}
            </Text>
            <Text style={styles.positionDate}>
              Ngày tạo: {new Date(item.createdAt).toLocaleString("vi-VN")}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  positionItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  positionName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  positionDesc: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  positionStatus: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 4,
  },
  positionDate: {
    fontSize: 12,
    color: "#666",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
