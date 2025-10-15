import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { toggleLike } from "../redux/accountsSlice";

const Bai4 = () => {
  const accounts = useSelector((state: RootState) => state.accounts.accounts);
  const dispatch = useDispatch();

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.likesRow}>
        <TouchableOpacity
          style={[styles.likeButton, item.liked && styles.liked]}
          onPress={() => dispatch(toggleLike(item.id))}
        >
          <Text style={styles.likeText}>{item.liked ? "💖" : "🤍"} Thích</Text>
        </TouchableOpacity>
        <Text style={styles.likesCount}>{item.likes} lượt thích</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách tài khoản</Text>
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  list: {
    gap: 8,
  },
  item: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  likesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  likeButton: {
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 8,
  },
  liked: {
    backgroundColor: "#ffb6c1",
  },
  likeText: {
    fontWeight: "bold",
    color: "#d6336c",
  },
  likesCount: {
    fontSize: 14,
    color: "#333",
  },
});

export default Bai4;
