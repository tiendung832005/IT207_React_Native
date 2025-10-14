import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EMPLOYEE_URL = "https://nest-api-public.ixe-agent.io.vn/api/v1/employees";

export default function AddEmployeeScreen({ navigation }: any) {
  const [fullName, setFullName] = useState("");
  const [code, setCode] = useState("");
  const [positionName, setPositionName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!fullName.trim() || !code.trim() || !positionName.trim()) {
      Alert.alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        EMPLOYEE_URL,
        {
          fullName,
          code,
          positionName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Alert.alert("Thành công", "Thêm mới nhân viên thành công!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err: any) {
      Alert.alert(
        "Lỗi",
        err?.response?.data?.message || "Không thêm được nhân viên"
      );
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm mới nhân viên</Text>
      <TextInput
        style={styles.input}
        placeholder="Họ tên"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mã nhân viên"
        value={code}
        onChangeText={setCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Chức vụ"
        value={positionName}
        onChangeText={setPositionName}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleAdd}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Thêm mới</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 18,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
