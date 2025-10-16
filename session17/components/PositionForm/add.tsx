import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPosition } from "../../../api/positions";

export default function AddPositionScreen() {
  const [positionName, setPositionName] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
      Alert.alert("Thành công", "Đã thêm vị trí mới!");
      setPositionName("");
    },
    onError: () => {
      Alert.alert("Lỗi", "Không thể thêm vị trí. Vui lòng thử lại.");
    },
  });

  const handleAdd = () => {
    if (!positionName.trim()) {
      Alert.alert("Lỗi", "Tên vị trí không được để trống.");
      return;
    }
    mutation.mutate({ positionName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên vị trí mới:</Text>
      <TextInput
        style={styles.input}
        value={positionName}
        onChangeText={setPositionName}
        placeholder="Nhập tên vị trí"
      />
      <Button
        title="Thêm vị trí"
        onPress={handleAdd}
        disabled={mutation.isLoading}
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
