import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

const positions = [
  { id: "1", title: "Nhân viên bán hàng", location: "Hà Nội" },
  { id: "2", title: "Quản lý cửa hàng", location: "TP. Hồ Chí Minh" },
  { id: "3", title: "Nhân viên kho", location: "Đà Nẵng" },
];

type ScreenProps = { onNavigate: (screen: ScreenType) => void };
type ScreenType = "Home" | "Account" | "Positions";

const HomeScreen = ({ onNavigate }: ScreenProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>Trang chủ</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => onNavigate("Account")}
    >
      <Text style={styles.buttonText}>Tài khoản</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={() => onNavigate("Positions")}
    >
      <Text style={styles.buttonText}>Danh sách vị trí</Text>
    </TouchableOpacity>
  </View>
);

const AccountScreen = ({ onNavigate }: ScreenProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>Tài khoản</Text>
    <Text>Họ tên: Nguyễn Văn A</Text>
    <Text>Email: nguyenvana@example.com</Text>
    <TouchableOpacity style={styles.button} onPress={() => onNavigate("Home")}>
      <Text style={styles.buttonText}>Quay lại Trang chủ</Text>
    </TouchableOpacity>
  </View>
);

const PositionsScreen = ({ onNavigate }: ScreenProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>Danh sách vị trí công việc</Text>
    <FlatList
      data={positions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.positionItem}>
          <Text style={styles.positionTitle}>{item.title}</Text>
          <Text style={styles.positionLocation}>{item.location}</Text>
        </View>
      )}
    />
    <TouchableOpacity style={styles.button} onPress={() => onNavigate("Home")}>
      <Text style={styles.buttonText}>Quay lại Trang chủ</Text>
    </TouchableOpacity>
  </View>
);

export default function Bai1() {
  const [screen, setScreen] = useState<ScreenType>("Home");

  const handleNavigate = (nextScreen: ScreenType) => {
    setScreen(nextScreen);
  };

  let content;
  if (screen === "Home") content = <HomeScreen onNavigate={handleNavigate} />;
  else if (screen === "Account")
    content = <AccountScreen onNavigate={handleNavigate} />;
  else if (screen === "Positions")
    content = <PositionsScreen onNavigate={handleNavigate} />;

  return <View style={{ flex: 1 }}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  positionItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    width: 300,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  positionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  positionLocation: {
    fontSize: 14,
    color: "#666",
  },
});
