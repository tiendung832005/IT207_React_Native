import React from "react";
import { StyleSheet, View } from "react-native";
import PhoneBookItem from "./PhoneBookItem";

export default function ListPhoneBook() {
  return (
    <View style={styles.list}>
      <PhoneBookItem />
      <PhoneBookItem />
      <PhoneBookItem />
      <PhoneBookItem />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
});