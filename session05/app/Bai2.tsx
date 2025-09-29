import React from "react";
import { View, ScrollView } from "react-native";
import BusinessCard from "./BusinessCard";

const App = () => {
  return (
    <ScrollView>
      <View>
        <BusinessCard
          avatarUrl="https://randomuser.me/api/portraits/men/32.jpg"
          name="Nguyễn Văn A"
          jobTitle="Lập trình viên React Native"
          contactInfo="Email: nguyenvana@example.com"
        />
        <BusinessCard
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name="Trần Thị B"
          jobTitle="Thiết kế UI/UX"
          contactInfo="SĐT: 0123 456 789"
        />
      </View>
    </ScrollView>
  );
};

export default App;
