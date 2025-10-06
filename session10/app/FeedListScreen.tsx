import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function FeedListScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Feed List Screen</Text>
      <Button
        title="Go to Feed Detail"
        onPress={() => navigation.navigate("FeedDetailScreen", { id: "123" })}
      />
    </View>
  );
}
