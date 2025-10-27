import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
} from "react-native";
import {
  CameraView as ExpoCameraView,
  CameraCapturedPicture,
  useCameraPermissions,
} from "expo-camera";

export default function CameraView() {
  const cameraRef = useRef<any>(null);
  const [capturedPhoto, setCapturedPhoto] =
    useState<CameraCapturedPicture | null>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
          skipProcessing: false,
        });
        setCapturedPhoto(photo);
      } catch (error) {
        Alert.alert("Lỗi", "Không thể chụp ảnh");
        console.error("Camera error:", error);
      }
    }
  };

  const retakePicture = () => {
    setCapturedPhoto(null);
  };

  const continuePicture = () => {
    // Placeholder for continue functionality
    Alert.alert("Tiếp tục", "Chức năng tiếp tục sẽ được triển khai sau");
  };

  // Show preview screen if photo was captured
  if (capturedPhoto) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: capturedPhoto.uri }} style={styles.preview} />

        <View style={styles.previewControls}>
          <TouchableOpacity
            style={styles.previewButton}
            onPress={retakePicture}
          >
            <Text style={styles.previewButtonText}>Chụp lại</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.previewButton, styles.continueButton]}
            onPress={continuePicture}
          >
            <Text style={[styles.previewButtonText, styles.continueButtonText]}>
              Tiếp tục
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Show camera view
  return (
    <View style={styles.container}>
      <ExpoCameraView ref={cameraRef} style={styles.camera}>
        <View style={styles.overlayTop} />

        <View style={styles.controlsContainer} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.captureButton}
            activeOpacity={0.8}
            onPress={takePicture}
          >
            <Text style={styles.captureText}>📸</Text>
          </TouchableOpacity>
        </View>
      </ExpoCameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  overlayTop: {
    height: Platform.OS === "ios" ? 44 : 24,
  },
  controlsContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 32,
  },
  captureButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "rgba(255,255,255,0.22)",
    borderWidth: 4,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  captureText: {
    fontSize: 28,
    color: "#fff",
  },
  preview: {
    flex: 1,
    width: "100%",
  },
  previewControls: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 40,
  },
  previewButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
  previewButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  continueButton: {
    backgroundColor: "#10b981",
  },
  continueButtonText: {
    color: "#fff",
  },
});
