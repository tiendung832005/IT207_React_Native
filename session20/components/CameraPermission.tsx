import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
} from "react-native";
import { Camera, CameraPermissionResponse } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

type PermissionStatus = "undetermined" | "granted" | "denied";

export default function CameraPermissionScreen() {
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus>("undetermined");
  const [isLoading, setIsLoading] = useState(false);
  const scaleAnim = new Animated.Value(1);

  const requestCameraPermission = async () => {
    setIsLoading(true);

    // Animation khi nhấn nút
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    try {
      const permission: CameraPermissionResponse =
        await Camera.requestCameraPermissionsAsync();

      if (permission.granted) {
        setPermissionStatus("granted");
        Alert.alert("✅ Thành công!", "Quyền truy cập camera đã được cấp.", [
          { text: "OK", style: "default" },
        ]);
      } else {
        setPermissionStatus("denied");
        Alert.alert(
          "❌ Bị từ chối",
          "Quyền truy cập camera đã bị từ chối. Vui lòng vào Cài đặt để cấp quyền.",
          [{ text: "OK", style: "cancel" }]
        );
      }
    } catch (error) {
      console.error("Lỗi khi yêu cầu quyền camera:", error);
      Alert.alert("⚠️ Lỗi", "Đã xảy ra lỗi khi yêu cầu quyền camera.", [
        { text: "OK", style: "destructive" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusInfo = () => {
    switch (permissionStatus) {
      case "granted":
        return {
          icon: "checkmark-circle" as const,
          color: "#4CAF50",
          text: "Đã cấp quyền",
          bgColor: "#E8F5E9",
        };
      case "denied":
        return {
          icon: "close-circle" as const,
          color: "#F44336",
          text: "Đã từ chối",
          bgColor: "#FFEBEE",
        };
      case "undetermined":
      default:
        return {
          icon: "help-circle" as const,
          color: "#FF9800",
          text: "Chưa xác định",
          bgColor: "#FFF3E0",
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="camera" size={80} color="#2196F3" />
        <Text style={styles.title}>Quyền Truy Cập Camera</Text>
        <Text style={styles.subtitle}>
          Ứng dụng cần quyền truy cập camera để chụp ảnh và quay video
        </Text>
      </View>

      <View style={styles.content}>
        <View
          style={[styles.statusCard, { backgroundColor: statusInfo.bgColor }]}
        >
          <Ionicons name={statusInfo.icon} size={48} color={statusInfo.color} />
          <Text style={styles.statusLabel}>Trạng thái quyền:</Text>
          <Text style={[styles.statusText, { color: statusInfo.color }]}>
            {statusInfo.text}
          </Text>
        </View>

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={requestCameraPermission}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <Ionicons name="camera-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>
              {isLoading ? "Đang xử lý..." : "Yêu cầu quyền Camera"}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#757575"
          />
          <Text style={styles.infoText}>
            Nhấn nút trên để yêu cầu quyền truy cập camera. Bạn sẽ thấy một hộp
            thoại hệ thống yêu cầu cấp quyền.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💡 Mẹo: Nếu bạn từ chối quyền, bạn có thể cấp lại trong phần Cài đặt
          của thiết bị.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#212121",
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
    lineHeight: 20,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  statusCard: {
    alignItems: "center",
    padding: 30,
    borderRadius: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusLabel: {
    fontSize: 16,
    color: "#616161",
    marginTop: 15,
    marginBottom: 5,
  },
  statusText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196F3",
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 15,
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: "#BDBDBD",
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: "#616161",
    marginLeft: 10,
    lineHeight: 18,
  },
  footer: {
    padding: 20,
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 12,
    color: "#9E9E9E",
    textAlign: "center",
    lineHeight: 18,
  },
});
