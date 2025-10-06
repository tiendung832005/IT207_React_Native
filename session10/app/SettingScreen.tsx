import React from "react";
import { View, Text, Button } from "react-native";

export default function SettingScreen({ navigation }: { navigation: any }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Setting Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("HomeScreen")}
      />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("ProfileScreen")}
      />
    </View>
  );
}
