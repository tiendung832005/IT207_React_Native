import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Camera } from "expo-camera";
import CameraView from "./CameraView";

type PermissionStatus = "granted" | "denied" | "undetermined";

export default function CameraPermissionScreen() {
  const [status, setStatus] = useState<PermissionStatus>("undetermined");

  useEffect(() => {
    // check existing permission on mount
    (async () => {
      try {
        const res = await Camera.getCameraPermissionsAsync?.();
        // some versions expose getCameraPermissionsAsync, others getPermissionsAsync
        const s = (
          res?.status ?? (res as any)?.granted ? "granted" : "denied"
        ) as PermissionStatus;
        if (res == null) {
          // fallback to generic permissions API
          const r2 = (await (Camera as any).getPermissionsAsync?.()) ?? null;
          if (r2) setStatus(r2.status === "granted" ? "granted" : "denied");
        } else {
          setStatus(s);
        }
      } catch (e) {
        // If checking fails, remain undetermined
        setStatus("undetermined");
      }
    })();
  }, []);

  async function requestPermission() {
    try {
      const result = await Camera.requestCameraPermissionsAsync?.();
      if (!result) {
        // fallback
        const r2 = await (Camera as any).requestPermissionsAsync?.();
        if (r2) setStatus(r2.status === "granted" ? "granted" : "denied");
        return;
      }
      setStatus(result.status === "granted" ? "granted" : "denied");
      Alert.alert("Quyền Camera", `Trạng thái: ${result.status}`);
    } catch (e) {
      Alert.alert("Lỗi", "Không thể yêu cầu quyền camera");
    }
  }

  if (status === "granted") {
    return <CameraView />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quyền Camera</Text>
      <Text style={styles.status}>Trạng thái: {status}</Text>

      <TouchableOpacity style={styles.button} onPress={requestPermission}>
        <Text style={styles.buttonText}>Yêu cầu quyền Camera</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#0f172a",
  },
  title: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 8,
    fontWeight: "600",
  },
  status: {
    color: "#93c5fd",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#06b6d4",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#05264b",
    fontWeight: "700",
  },
});
