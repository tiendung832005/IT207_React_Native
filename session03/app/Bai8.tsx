import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const bannerUrl =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";
const avatarUrl = "https://i.pravatar.cc/150?u=a042581f4e29026704d";
const author = "Nguyen Van Bao";
const title = "Khám phá vẻ đẹp thiên nhiên Việt Nam";
const content = `Việt Nam là một đất nước với nhiều cảnh quan tuyệt đẹp, từ núi rừng Tây Bắc đến biển xanh miền Trung. Những địa điểm nổi tiếng như Vịnh Hạ Long, Sa Pa, Hội An luôn thu hút du khách bởi vẻ đẹp hoang sơ và văn hóa đặc sắc.`;

const { width } = Dimensions.get("window");
const titleFontSize = Math.max(22, Math.round(width / 16));
const contentFontSize = Math.max(15, Math.round(width / 24));

export default function Bai8() {
  return (
    <View style={styles.container}>
      {/* Banner */}
      <Image
        source={{ uri: bannerUrl }}
        style={styles.banner}
        resizeMode="cover"
      />

      {/* Title */}
      <Text style={[styles.title, { fontSize: titleFontSize }]}> {title} </Text>

      {/* Author Info */}
      <View style={styles.authorRow}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <Text style={styles.authorName}>{author}</Text>
      </View>

      {/* Content */}
      <Text style={[styles.content, { fontSize: contentFontSize }]}>
        {" "}
        {content}{" "}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  banner: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 18,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 12,
    fontFamily: "RobotoSlab-Bold", // Custom font, cần add vào project
    color: "#222",
    textAlign: "center",
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  authorName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#444",
  },
  content: {
    fontFamily: "RobotoSlab-Regular", // Custom font, cần add vào project
    color: "#333",
    lineHeight: 24,
    textAlign: "justify",
  },
});
