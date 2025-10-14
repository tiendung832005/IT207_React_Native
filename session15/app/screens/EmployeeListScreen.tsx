import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EMPLOYEE_URL = "https://nest-api-public.ixe-agent.io.vn/api/v1/employees";

export default function EmployeeListScreen({ navigation }: any) {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(EMPLOYEE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(res.data.data);
    } catch (err: any) {
      Alert.alert(
        "Lỗi",
        err?.response?.data?.message || "Không lấy được danh sách nhân viên"
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách Nhân viên</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>
                {item.fullName} ({item.code})
              </Text>
              <Text style={styles.position}>{item.positionName}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("EditEmployee", { id: item.id })
                  }
                >
                  <Text style={styles.edit}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("DeleteEmployee", { id: item.id })
                  }
                >
                  <Text style={styles.delete}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddEmployee")}
      >
        <Text style={styles.addIcon}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  position: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
  },
  edit: {
    color: "#007AFF",
    fontSize: 20,
    marginRight: 16,
  },
  delete: {
    color: "#FF3B30",
    fontSize: 20,
  },
  addButton: {
    position: "absolute",
    top: 12,
    right: 16,
    backgroundColor: "#FF3B30",
    borderRadius: 24,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  addIcon: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
});
