import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  CONTAINER_STYLES,
} from "./styles/GlobalStyles";

export default function Bai4() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={CONTAINER_STYLES}>
      <Image
        source={{
          uri: "https://rikkei.edu.vn/wp-content/uploads/2023/07/logo-rikkei.png",
        }}
        style={styles.logo}
        resizeMode="contain"
      />
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 110,
    marginBottom: SPACING.lg,
  },
  input: {
    width: 280,
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm + 4,
    marginBottom: SPACING.md,
    fontSize: FONT_SIZES.medium,
    backgroundColor: COLORS.inputBg,
  },
  button: {
    width: 280,
    height: 44,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  buttonText: {
    color: COLORS.background,
    fontWeight: "bold",
    fontSize: FONT_SIZES.large,
  },
});
