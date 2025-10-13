import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import axios from "axios";

const LOGIN_URL = "https://nest-api-public.ixe-agent.io.vn/api/v1/auth/login";
const POSITION_DETAIL_URL =
  "https://nest-api-public.ixe-agent.io.vn/api/v1/positions";

export default function Bai6({ navigation }: any) {
  const [username, setUsername] = useState("testuser"); 
  const [password, setPassword] = useState("testpassword"); 
  const [token, setToken] = useState<string | null>(null);
  const [positionId, setPositionId] = useState("");
  const [position, setPosition] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(LOGIN_URL, {
        username,
        password,
      });
      if (res.data && res.data.access_token) {
        setToken(res.data.access_token);
        Alert.alert("Đăng nhập thành công");
      } else {
        Alert.alert("Lỗi", "Không lấy được token");
      }
    } catch (err: any) {
      Alert.alert(
        "Lỗi đăng nhập",
        err?.response?.data?.message || "Sai tài khoản hoặc mật khẩu"
      );
    }
    setLoading(false);
  };

  const handleGetPosition = async () => {
    if (!token) {
      Alert.alert("Bạn cần đăng nhập trước!");
      return;
    }
    if (!positionId.trim()) {
      Alert.alert("Vui lòng nhập ID vị trí");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`${POSITION_DETAIL_URL}/${positionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosition(res.data.data);
    } catch (err: any) {
      Alert.alert(
        "Lỗi lấy chi tiết",
        err?.response?.data?.message || "Không lấy được chi tiết vị trí"
      );
      setPosition(null);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${POSITION_DETAIL_URL}/${positionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setModalVisible(false);
      setPosition(null);
      Alert.alert("Thành công", "Xóa vị trí thành công!");
    } catch (err: any) {
      setModalVisible(false);
      Alert.alert(
        "Lỗi",
        err?.response?.data?.message || "Không xóa được vị trí"
      );
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập để lấy token</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Đăng nhập</Text>
        )}
      </TouchableOpacity>

      {token && (
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontWeight: "bold" }}>Token đã lấy:</Text>
          <Text style={styles.token}>{token}</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập ID vị trí"
            value={positionId}
            onChangeText={setPositionId}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleGetPosition}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Lấy thông tin vị trí</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {position && (
        <View style={styles.positionDetail}>
          <Text style={styles.positionTitle}>
            Tên vị trí: {position.positionName}
          </Text>
          <Text>Mô tả: {position.description}</Text>
          <Text>Trạng thái: {position.positionStatus}</Text>
          <Text>
            Ngày tạo: {new Date(position.createdAt).toLocaleString("vi-VN")}
          </Text>
          <TouchableOpacity
            style={styles.deleteIcon}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: "red", fontWeight: "bold" }}>
              🗑️ Xóa vị trí
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Xác nhận xóa vị trí</Text>
            <Text>Bạn có chắc chắn muốn xóa vị trí này không?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
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
          </View>
        </View>
      </Modal>
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
    marginTop: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  token: {
    fontSize: 12,
    color: "#333",
    marginVertical: 8,
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 6,
  },
  positionDetail: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  positionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  deleteIcon: {
    marginTop: 16,
    alignItems: "center",
  },
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
