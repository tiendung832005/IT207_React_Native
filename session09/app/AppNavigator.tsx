import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ContactListScreen from "./index";
import AddContactScreen from "./AddContactScreen";
import EditContactScreen from "./EditContactScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ContactList" component={ContactListScreen} options={{ title: "Danh bạ" }} />
        <Stack.Screen name="AddContact" component={AddContactScreen} options={{ title: "Thêm liên hệ" }} />
        <Stack.Screen name="EditContact" component={EditContactScreen} options={{ title: "Sửa liên hệ" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}