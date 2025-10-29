import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskListScreen from "./TaskListScreen";
import TaskDetailScreen from "./TaskDetailScreen";
import TaskCreateScreen from "./TaskCreateScreen";
import TaskEditScreen from "./TaskEditScreen";

// Update TaskStackParamList to include 'id' for TaskEdit
export type TaskStackParamList = {
  TaskList: undefined;
  TaskDetail: { id: number };
  TaskCreate: undefined;
  TaskEdit: { id: number };
};

const Stack = createNativeStackNavigator<TaskStackParamList>();

export default function TaskNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TaskList"
        component={TaskListScreen}
        options={{ title: "Danh sách Công việc" }}
      />
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetailScreen}
        options={{ title: "Chi tiết Công việc" }}
      />
      <Stack.Screen
        name="TaskCreate"
        component={TaskCreateScreen}
        options={{ title: "Thêm Công việc", presentation: "modal" }}
      />
      <Stack.Screen
        name="TaskEdit"
        component={TaskEditScreen}
        options={{ title: "Chỉnh sửa Công việc", presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}
