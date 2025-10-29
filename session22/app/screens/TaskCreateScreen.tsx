import React from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Tên công việc là bắt buộc"),
  priority: yup.string().required("Độ ưu tiên là bắt buộc"),
  description: yup.string(),
});

export default function TaskCreateScreen({ navigation: any }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      priority: "MEDIUM",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      await axios.post("/api/v1/tasks", data);
      Alert.alert("Thành công", "Công việc đã được thêm mới");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Lỗi", "Không thể thêm công việc");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên công việc</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.name && styles.errorInput]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Nhập tên công việc"
          />
        )}
      />
      {errors.name && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}

      <Text style={styles.label}>Độ ưu tiên</Text>
      <Controller
        control={control}
        name="priority"
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => onChange(itemValue)}
          >
            <Picker.Item label="Cao" value="HIGH" />
            <Picker.Item label="Trung bình" value="MEDIUM" />
            <Picker.Item label="Thấp" value="LOW" />
          </Picker>
        )}
      />
      {errors.priority && (
        <Text style={styles.errorText}>{errors.priority.message}</Text>
      )}

      <Text style={styles.label}>Mô tả</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textArea}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Nhập mô tả"
            multiline
            numberOfLines={4}
          />
        )}
      />

      <Button title="Lưu" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
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
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    textAlignVertical: "top",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  errorInput: {
    borderColor: "red",
  },
});
