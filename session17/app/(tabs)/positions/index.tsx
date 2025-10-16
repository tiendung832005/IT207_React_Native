import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import {
  usePositionsList,
  useDeletePosition,
} from "../../../hooks/usePositions";

export default function PositionsScreen() {
  const { data, isLoading, error } = usePositionsList();
  const mutation = useDeletePosition();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Không thể tải dữ liệu. Vui lòng thử lại.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {data?.data?.length === 0 || !data?.data ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Chưa có vị trí nào.</Text>
        </View>
      ) : (
        <FlatList
          data={data?.data ?? []}
          keyExtractor={(item) => item.positionId?.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 12,
                borderBottomWidth: 1,
                borderColor: "#eee",
              }}
            >
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() =>
                  router.push({
                    pathname: "/positions/[id]",
                    params: { id: item.positionId },
                  })
                }
              >
                <Text>{item.positionName}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 12,
                  backgroundColor: "#ff4444",
                  padding: 8,
                  borderRadius: 4,
                }}
                onPress={() => mutation.mutate(item.positionId)}
                disabled={mutation.isPending}
              >
                <Text style={{ color: "#fff" }}>Xóa</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
