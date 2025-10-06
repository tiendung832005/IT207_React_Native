import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function FeedDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: string };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Feed Detail Screen</Text>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>ID: {id}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
