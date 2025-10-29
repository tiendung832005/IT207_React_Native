import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TaskStackParamList } from "./TaskNavigator";

const schema = yup.object().shape({
  name: yup.string().required("Tên công việc là bắt buộc"),
  priority: yup.string().required("Độ ưu tiên là bắt buộc"),
  description: yup.string(),
});

// Define props type for TaskEditScreen
export type TaskEditScreenProps = NativeStackScreenProps<
  TaskStackParamList,
  "TaskEdit"
>;

export default function TaskEditScreen({
  route,
  navigation,
}: TaskEditScreenProps) {
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      priority: "MEDIUM",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`/api/v1/tasks/${id}`);
        const { name, priority, description } = response.data;
        setValue("name", name);
        setValue("priority", priority);
        setValue("description", description);
      } catch (error) {
        Alert.alert("Lỗi", "Không thể tải dữ liệu công việc");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, setValue]);

  const onSubmit = async (data: {
    name: string;
    priority: string;
    description: string;
  }) => {
    try {
      await axios.put(`/api/v1/tasks/${id}`, data);
      Alert.alert("Thành công", "Công việc đã được cập nhật");
      navigation.goBack();
    } catch {
      Alert.alert("Lỗi", "Không thể cập nhật công việc");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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

      <Button title="Cập nhật" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
