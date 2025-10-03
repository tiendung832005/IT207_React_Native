import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Contact } from "../constants/types";

type Props = {
  contact: Contact;
  onPress?: () => void;
  onDelete?: () => void;
};

export default function PhoneBookItem({ contact, onPress, onDelete }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{contact.name}</Text>
          <Text style={styles.phone}>{contact.phone}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() =>
            Alert.alert("Xác nhận", "Bạn có chắc muốn xóa liên hệ này?", [
              { text: "Hủy", style: "cancel" },
              { text: "Xóa", style: "destructive", onPress: onDelete },
            ])
          }
        >
          <Text style={{ color: "red", fontWeight: "bold" }}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: "#dadada",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: { fontWeight: "bold", fontSize: 16 },
  phone: { color: "#555" },
  deleteBtn: {
    marginLeft: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: "#fbeaea",
  },
});
