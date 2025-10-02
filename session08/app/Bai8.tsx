import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OLD_KEY = "userInfo_v1";
const NEW_KEY = "userInfo_v2";

// Hàm tách tên thành firstName và lastName
function splitName(name: string) {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: parts[parts.length - 1],
  };
}

const MigrationScreen = () => {
  const [user, setUser] = useState<any>(null);
  const [migrated, setMigrated] = useState(false);

  useEffect(() => {
    const migrate = async () => {
      // Kiểm tra dữ liệu mới
      const newData = await AsyncStorage.getItem(NEW_KEY);
      if (newData) {
        setUser(JSON.parse(newData));
        setMigrated(true);
        return;
      }
      // Kiểm tra dữ liệu cũ
      const oldData = await AsyncStorage.getItem(OLD_KEY);
      if (oldData) {
        try {
          const oldObj = JSON.parse(oldData);
          if (oldObj.name) {
            const { firstName, lastName } = splitName(oldObj.name);
            const newObj = {
              user: { firstName, lastName },
              version: 2,
            };
            await AsyncStorage.setItem(NEW_KEY, JSON.stringify(newObj));
            await AsyncStorage.removeItem(OLD_KEY);
            setUser(newObj);
            setMigrated(true);
            return;
          }
        } catch {}
      }
      // Không có dữ liệu
      setUser(null);
    };
    migrate();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Migration Demo</Text>
      {user ? (
        <>
          <Text style={styles.info}>
            Tên: {user.user.firstName} {user.user.lastName}
          </Text>
          <Text style={styles.info}>Version: {user.version}</Text>
          {migrated && (
            <Text style={styles.migrated}>
              Đã chuyển dữ liệu sang cấu trúc mới!
            </Text>
          )}
        </>
      ) : (
        <Text style={styles.info}>Chưa có dữ liệu người dùng.</Text>
      )}
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  info: {
    fontSize: 18,
    marginBottom: 8,
  },
  migrated: {
    color: "green",
    fontWeight: "bold",
    marginTop: 12,
  },
});

export default MigrationScreen;
