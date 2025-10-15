import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { fetchPositionDetail, clearDetail } from "../redux/positionDetailSlice";

const Bai7 = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { detail, loading, error } = useSelector(
    (state: RootState) => state.positionDetail
  );
  const [id, setId] = useState("1");

  const handleFetch = () => {
    if (accessToken && id) {
      dispatch(fetchPositionDetail({ id, accessToken }) as any);
    }
  };

  const handleClear = () => {
    dispatch(clearDetail());
  };

  return (
    <View style={styles.container}>
      {!accessToken ? (
        <Text style={styles.error}>
          Vui lòng đăng nhập để xem chi tiết vị trí công việc.
        </Text>
      ) : (
        <View style={styles.detailBox}>
          <Text style={styles.title}>Chi tiết vị trí công việc</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Nhập ID vị trí"
              value={id}
              onChangeText={setId}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleFetch}
              disabled={loading || !id}
            >
              <Text style={styles.buttonText}>Xem chi tiết</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearText}>Xóa</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator />
          ) : error ? (
            <Text style={styles.error}>{error}</Text>
          ) : detail ? (
            <ScrollView style={styles.detailScroll}>
              <Text style={styles.detailTitle}>{detail.name}</Text>
              {Object.entries(detail).map(([key, value]) =>
                key !== "name" ? (
                  <View key={key} style={styles.detailItem}>
                    <Text style={styles.detailKey}>{key}:</Text>
                    <Text style={styles.detailValue}>{String(value)}</Text>
                  </View>
                ) : null
              )}
            </ScrollView>
          ) : (
            <Text>
              Nhập ID và nhấn &quot;Xem chi tiết&quot; để xem thông tin vị trí.
            </Text>
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
  detailBox: {
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
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    minWidth: 80,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: "#d6336c",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  clearText: {
    color: "#fff",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 8,
    textAlign: "center",
  },
  detailScroll: {
    width: "100%",
    marginTop: 8,
    maxHeight: 250,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#007bff",
  },
  detailItem: {
    flexDirection: "row",
    marginBottom: 6,
  },
  detailKey: {
    fontWeight: "bold",
    marginRight: 8,
    color: "#333",
  },
  detailValue: {
    color: "#333",
  },
});

export default Bai7;
