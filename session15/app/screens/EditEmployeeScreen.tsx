import React, { useEffect, useState } from "react";
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

export default function EditEmployeeScreen({ route, navigation }: any) {
  const { id } = route.params;
  const [fullName, setFullName] = useState("");
  const [code, setCode] = useState("");
  const [positionName, setPositionName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(`${EMPLOYEE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const emp = res.data.data;
      setFullName(emp.fullName);
      setCode(emp.code);
      setPositionName(emp.positionName);
    } catch (err: any) {
      Alert.alert(
        "Lỗi",
        err?.response?.data?.message || "Không lấy được thông tin nhân viên"
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const handleUpdate = async () => {
    if (!fullName.trim() || !code.trim() || !positionName.trim()) {
      Alert.alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.put(
        `${EMPLOYEE_URL}/${id}`,
        {
          fullName,
          code,
          positionName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Alert.alert("Thành công", "Cập nhật nhân viên thành công!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err: any) {
      Alert.alert(
        "Lỗi",
        err?.response?.data?.message || "Không cập nhật được nhân viên"
      );
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cập nhật nhân viên</Text>
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
        onPress={handleUpdate}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Cập nhật</Text>
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
