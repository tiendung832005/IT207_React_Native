import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import FeedListScreen from "./FeedListScreen";
import FeedDetailScreen from "./FeedDetailScreen";
import MessagesScreen from "./MessagesScreen";

const Tab = createBottomTabNavigator();
const FeedStack = createStackNavigator();

function FeedStackScreen() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="FeedListScreen"
        component={FeedListScreen}
        options={{ title: "Feed" }}
      />
      <FeedStack.Screen
        name="FeedDetailScreen"
        component={FeedDetailScreen}
        options={{ title: "Feed Detail" }}
      />
    </FeedStack.Navigator>
  );
}

export default function AppLayout() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Feed" component={FeedStackScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
