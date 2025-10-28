import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

// Cấu hình cách hiển thị thông báo cho toàn bộ ứng dụng
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//     shouldShowBanner: true,
//     shouldShowList: true,
//   }),
// });

// Notifications.scheduleNotificationAsync({
//   content: {
//     title: "Thông báo",
//     body: "Tài khoản của bạn đã được +1000.000 VNĐ",
//   },
//   trigger: null,
// });

// Xin quyền của thiết bị
// const setupPermission = async () => {
//   const { status } = await Notifications.getPermissionsAsync();

//   if (status !== Notifications.PermissionStatus.GRANTED) {
//     Alert.alert("Lỗi", "Bạn đã từ chối quyền nhận thông báo!");
//     return false;
//   }
// };

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // useEffect(() => {
  //   setupPermission().then((granted) => {
  //     if (granted) {
  //       Alert.alert("Thông báo", "Đã được cấp quyền");
  //     } else {
  //       Alert.alert("Cảnh báo", "Đã từ chối cấp quyền");
  //     }
  //   });
  // }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}