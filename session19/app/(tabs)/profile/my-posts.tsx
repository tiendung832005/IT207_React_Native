import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useRouter } from "expo-router";
import { usePostsList } from "../../../hooks/usePosts";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Sử dụng API thay vì dữ liệu fix cứng

type Post = {
  id: string;
  title: string;
  status: "published" | "draft";
  image: string;
};

const PostRow = ({ item }: { item: Post }) => (
  <View style={styles.postRow}>
    <Image source={{ uri: item.image }} style={styles.postImage} />
    <View style={styles.postInfo}>
      <Text style={styles.postTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <View
        style={[
          styles.statusBadge,
          {
            backgroundColor:
              item.status === "published" ? "#4ade80" : "#facc15",
          },
        ]}
      >
        <Text style={styles.statusText}>
          {item.status === "published" ? "Đã xuất bản" : "Bản nháp"}
        </Text>
      </View>
    </View>
    <View style={styles.actions}>
      <TouchableOpacity
        onPress={() => router.push(`./profile/edit-post?postId=${item.id}`)}
      >
        <Ionicons name="pencil-outline" size={22} color="#3b82f6" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Alert.alert("Xóa", `Bạn có chắc muốn xóa: ${item.title}`)
        }
      >
        <Ionicons name="trash-outline" size={22} color="#ef4444" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function MyPostsScreen() {
  const router = useRouter();
  const { data, isLoading, error } = usePostsList();
  const posts = data?.data || [];
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("./profile/create-post")}
            >
              <Ionicons name="add-circle" size={32} color="#22c55e" />
            </TouchableOpacity>
          ),
        }}
      />
      {isLoading ? (
        <Text style={styles.emptyText}>Đang tải bài viết...</Text>
      ) : error ? (
        <Text style={[styles.emptyText, { color: "red" }]}>
          Không thể tải bài viết
        </Text>
      ) : (
        <FlatList<Post>
          data={posts}
          renderItem={({ item }: { item: Post }) => <PostRow item={item} />}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Bạn chưa có bài viết nào.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  postRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  postImage: { width: 80, height: 80, borderRadius: 10 },
  postInfo: { flex: 1, marginLeft: 15 },
  postTitle: { fontSize: 16, fontWeight: "600" },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 8,
  },
  statusText: { fontSize: 12, fontWeight: "bold", color: "white" },
  actions: { flexDirection: "row", gap: 15 },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
  },
});
