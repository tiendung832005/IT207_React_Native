import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { Contact } from "../constants/types";

type Props = {
  initial?: Contact;
  onSubmit: (contact: Contact) => void;
};

export default function ContactForm({ initial, onSubmit }: Props) {
  const [name, setName] = useState(initial?.name || "");
  const [phone, setPhone] = useState(initial?.phone || "");
  const [email, setEmail] = useState(initial?.email || "");

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Tên"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button
        title="Lưu"
        onPress={() =>
          onSubmit({
            id: initial?.id || Date.now().toString(),
            name,
            phone,
            email,
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#dadada",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
});
