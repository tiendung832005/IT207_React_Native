import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Form() {
  return (
    <View style={styles.overlay}>
      <View style={styles.form}>
        {/* Phần header */}
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>Thêm mới liên hệ</Text>
          <Button title="Đóng" />
        </View>
        {/* Phần thân của form */}
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Tên" />
          <TextInput style={styles.input} placeholder="Số điện thoại" />
          <TextInput
            style={styles.input}
            placeholder="Email (Không bắt buộc)"
          />
        </View>

        {/* Phân chân form */}
        <View>
          <Button title="Thêm" />
          <View>
            <Button title="Xóa" color={"red"} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    alignItems: "center",
    // justifyContent: "center",
  },

  form: {
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
  },

  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBlockColor: "#dadada",
    paddingBottom: 16,
  },

  formTitle: {
    fontSize: 18,
    fontWeight: 600,
  },
  inputContainer: {
    marginVertical: 16,
    flexDirection: "column",
    gap: 20,
  },
  input: {
    height: 42,
    borderWidth: 1,
    borderColor: "#dadada",
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});