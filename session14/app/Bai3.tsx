import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

export default function Bai3({ navigation }: any) {
  const [positionName, setPositionName] = useState("");
  const [positionStatus, setPositionStatus] = useState("ACTIVE");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    positionName?: string;
    positionStatus?: string;
  }>({});

  const validate = () => {
    const newErrors: { positionName?: string; positionStatus?: string } = {};
    if (!positionName.trim())
      newErrors.positionName = "Tên vị trí không được để trống";
    if (!positionStatus.trim())
      newErrors.positionStatus = "Trạng thái không được để trống";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await axios.post(
        "https://nest-api-public.ixe-agent.io.vn/api/v1/positions",
        {
          positionName,
          positionStatus,
          description,
        }
      );
      setLoading(false);
      Alert.alert("Thành công", "Thêm mới vị trí thành công!", [
        {
          text: "OK",
          onPress: () => {
            if (navigation && navigation.navigate) {
              navigation.navigate("Bai2");
            }
          },
        },
      ]);
    } catch (err: any) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        Alert.alert("Lỗi", err.response.data.message);
      } else {
        Alert.alert("Lỗi", "Đã xảy ra lỗi, vui lòng thử lại!");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm mới vị trí công việc</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên vị trí"
        value={positionName}
        onChangeText={setPositionName}
      />
      {errors.positionName && (
        <Text style={styles.error}>{errors.positionName}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Trạng thái (ACTIVE)"
        value={positionStatus}
        onChangeText={setPositionStatus}
      />
      {errors.positionStatus && (
        <Text style={styles.error}>{errors.positionStatus}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Mô tả vị trí"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
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
  error: {
    color: "red",
    marginBottom: 8,
    marginLeft: 4,
  },
});
