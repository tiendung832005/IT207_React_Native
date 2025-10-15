import React, { useState, useEffect } from "react";
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
import { addPosition, resetAddPosition } from "../redux/addPositionSlice";

const Bai8 = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { success, loading, error } = useSelector(
    (state: RootState) => state.addPosition
  );

  const [positionName, setPositionName] = useState("Kế toán");
  const [positionStatus, setPositionStatus] = useState("ACTIVE");
  const [description, setDescription] = useState("Mô tả vị trí");

  useEffect(() => {
    if (success) {
      setPositionName("");
      setPositionStatus("ACTIVE");
      setDescription("");
      setTimeout(() => dispatch(resetAddPosition()), 2000);
    }
  }, [success, dispatch]);

  const handleAdd = () => {
    if (accessToken) {
      dispatch(
        addPosition({
          positionName,
          positionStatus,
          description,
          accessToken,
        }) as any
      );
    }
  };

  return (
    <View style={styles.container}>
      {!accessToken ? (
        <Text style={styles.error}>
          Vui lòng đăng nhập để thêm vị trí công việc.
        </Text>
      ) : (
        <View style={styles.formBox}>
          <Text style={styles.title}>Thêm mới vị trí công việc</Text>
          <TextInput
            style={styles.input}
            placeholder="Tên vị trí"
            value={positionName}
            onChangeText={setPositionName}
          />
          <TextInput
            style={styles.input}
            placeholder="Trạng thái (ACTIVE/INACTIVE)"
            value={positionStatus}
            onChangeText={setPositionStatus}
          />
          <TextInput
            style={styles.input}
            placeholder="Mô tả vị trí"
            value={description}
            onChangeText={setDescription}
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
          {success && (
            <Text style={styles.success}>Thêm vị trí thành công!</Text>
          )}
          {error && <Text style={styles.error}>{error}</Text>}
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
  formBox: {
    width: "100%",
    maxWidth: 350,
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
  success: {
    color: "green",
    marginTop: 8,
    textAlign: "center",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 8,
    textAlign: "center",
  },
});

export default Bai8;
