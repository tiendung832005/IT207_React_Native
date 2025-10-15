import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { toggleLanguage } from "../redux/languageSlice";

const translations = {
  en: {
    title: "Current Language",
    button: "Switch to Vietnamese",
    content: "Hello! This is English.",
  },
  vi: {
    title: "Ngôn ngữ hiện tại",
    button: "Chuyển sang tiếng Anh",
    content: "Xin chào! Đây là tiếng Việt.",
  },
};

const Bai5 = () => {
  const lang = useSelector((state: RootState) => state.language.lang);
  const dispatch = useDispatch();
  const t = translations[lang];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t.title}: <Text style={styles.lang}>{lang.toUpperCase()}</Text>
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch(toggleLanguage())}
      >
        <Text style={styles.buttonText}>{t.button}</Text>
      </TouchableOpacity>
      <Text style={styles.content}>{t.content}</Text>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  lang: {
    color: "#007bff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    fontSize: 16,
    color: "#333",
  },
});

export default Bai5;
