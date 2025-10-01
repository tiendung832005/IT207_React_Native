import React, { createContext, useContext, useState, ReactNode } from "react";
import { View, Text, Button, StyleSheet, Switch } from "react-native";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeStyles = {
  light: {
    backgroundColor: "#fff",
    color: "#222",
  },
  dark: {
    backgroundColor: "#222",
    color: "#fff",
  },
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const NestedComponent3 = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) return null;
  const { theme } = ctx;
  return (
    <View
      style={[
        styles.box,
        { backgroundColor: themeStyles[theme].backgroundColor },
      ]}
    >
      <Text style={{ color: themeStyles[theme].color }}>
        Đây là component lồng thứ 3
      </Text>
    </View>
  );
};

const NestedComponent2 = () => (
  <View style={styles.box}>
    <NestedComponent3 />
  </View>
);

const NestedComponent1 = () => (
  <View style={styles.box}>
    <NestedComponent2 />
  </View>
);

const App = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) return null;
  const { theme, toggleTheme } = ctx;
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeStyles[theme].backgroundColor },
      ]}
    >
      <Text style={[styles.title, { color: themeStyles[theme].color }]}>
        Chuyển đổi Light/Dark Mode
      </Text>
      <View style={styles.switchRow}>
        <Text style={{ color: themeStyles[theme].color }}>Dark mode</Text>
        <Switch value={theme === "dark"} onValueChange={toggleTheme} />
      </View>
      <NestedComponent1 />
    </View>
  );
};

const Main = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },
  box: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
  },
});

export default Main;
