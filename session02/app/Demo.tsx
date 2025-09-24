import React from "react";
import { View, Text, Image, Button } from "react-native";
export default function Demo() {
  return (
    <View>
      <Text>Demo</Text>
      <Image
        height={500}
        source={{ uri: "https://cellphones.com.vn/sforum/wp-content/uploads/2024/05/anh-cho-1.jpg" }}
      />
      <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum eligendi rerum velit reprehenderit temporibus maxime quasi quos in error eaque. Quibusdam sequi vero non? Voluptatem sunt maxime omnis labore sit.</Text>
        <Button title="Click me"></Button>
    </View>
  );
}
