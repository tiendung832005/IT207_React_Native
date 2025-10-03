import React from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { useContacts } from "../hooks/useContacts";
import PhoneBookItem from "../components/PhoneBookItem";

export default function ContactListScreen({ navigation }: { navigation: any }) {
  const { contacts, deleteContact } = useContacts();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PhoneBookItem
            contact={item}
            onPress={() =>
              navigation.navigate("EditContact", { contact: item })
            }
            onDelete={() => deleteContact(item.id)}
          />
        )}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#007bff",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          marginTop: 16,
        }}
        onPress={() => navigation.navigate("AddContact")}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Thêm mới</Text>
      </TouchableOpacity>
    </View>
  );
}
