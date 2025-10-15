import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { login, logout } from "../redux/authSlice";
import { fetchPositions } from "../redux/positionsSlice";

const Bai6 = () => {
  const dispatch = useDispatch();
  const { accessToken, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const {
    positions,
    loading: loadingPositions,
    error: errorPositions,
  } = useSelector((state: RootState) => state.positions);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(login({ username, password }) as any).then((res: any) => {
      if (res.payload) {
        dispatch(fetchPositions(res.payload) as any);
      }
    });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      {!accessToken ? (
        <View style={styles.loginBox}>
          <Text style={styles.title}>Đăng nhập để xem vị trí công việc</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
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
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      ) : (
        <View style={styles.positionsBox}>
          <Text style={styles.title}>Danh sách vị trí công việc</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
          {loadingPositions ? (
            <ActivityIndicator />
          ) : errorPositions ? (
            <Text style={styles.error}>{errorPositions}</Text>
          ) : positions.length === 0 ? (
            <Text>Không có dữ liệu vị trí.</Text>
          ) : (
            positions.map((pos: any) => (
              <View key={pos.id} style={styles.positionItem}>
                <Text style={styles.positionName}>{pos.name}</Text>
                {/* Hiển thị thêm thông tin nếu cần */}
              </View>
            ))
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  loginBox: {
    width: "100%",
    maxWidth: 350,
    padding: 24,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
  },
  positionsBox: {
    width: "100%",
    maxWidth: 400,
    padding: 24,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 8,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#d6336c",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
  positionItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  positionName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Bai6;
