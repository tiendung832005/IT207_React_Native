import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EMPLOYEE_URL = "https://nest-api-public.ixe-agent.io.vn/api/v1/employees";

export default function DeleteEmployeeScreen({ route, navigation }: any) {
  const { id } = route.params;
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(`${EMPLOYEE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployee(res.data.data);
    } catch (err: any) {
      Alert.alert(
        "Lỗi",
        err?.response?.data?.message || "Không lấy được thông tin nhân viên"
      );
      navigation.goBack();
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.delete(`${EMPLOYEE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setModalVisible(false);
      Alert.alert("Thành công", "Xóa nhân viên thành công!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err: any) {
      setModalVisible(false);
      Alert.alert(
        "Lỗi",
        err?.response?.data?.message || "Không xóa được nhân viên"
      );
      navigation.goBack();
    }
    setLoading(false);
  };

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => navigation.goBack()}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Xác nhận xóa nhân viên</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <>
              <Text>Bạn có chắc chắn muốn xóa nhân viên này không?</Text>
              {employee && (
                <View style={styles.infoBox}>
                  <Text style={styles.name}>
                    {employee.fullName} ({employee.code})
                  </Text>
                  <Text style={styles.position}>{employee.positionName}</Text>
                </View>
              )}
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={{ color: "#007AFF" }}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#FF3B30" }]}
                  onPress={handleDelete}
                >
                  <Text style={{ color: "#fff" }}>Xóa</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  infoBox: {
    marginVertical: 12,
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  position: {
    fontSize: 14,
    color: "#666",
  },
  modalActions: {
    flexDirection: "row",
    marginTop: 18,
    gap: 16,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: "#eee",
  },
});
