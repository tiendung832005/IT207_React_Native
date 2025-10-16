import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPositions, updatePosition } from "../../../api/positions";

export default function EditPositionScreen({ route }) {
  const { id } = route.params;
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["position", id],
    queryFn: async () => {
      // Giả sử API trả về chi tiết vị trí qua fetchPositions, lọc theo id
      const all = await fetchPositions();
      return all.data.find((item) => item.positionId == id);
    },
  });

  const [positionName, setPositionName] = useState("");

  useEffect(() => {
    if (data) setPositionName(data.positionName);
  }, [data]);

  const mutation = useMutation({
    mutationFn: (newData) => updatePosition(id, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
      Alert.alert("Thành công", "Đã cập nhật vị trí!");
    },
    onError: () => {
      Alert.alert("Lỗi", "Không thể cập nhật vị trí. Vui lòng thử lại.");
    },
  });

  const handleUpdate = () => {
    if (!positionName.trim()) {
      Alert.alert("Lỗi", "Tên vị trí không được để trống.");
      return;
    }
    mutation.mutate({ positionName });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Không thể tải thông tin vị trí.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên vị trí:</Text>
      <TextInput
        style={styles.input}
        value={positionName}
        onChangeText={setPositionName}
        placeholder="Nhập tên vị trí"
      />
      <Button
        title="Cập nhật vị trí"
        onPress={handleUpdate}
        disabled={mutation.isPending}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});
