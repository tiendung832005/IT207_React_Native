import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Giả lập API tìm kiếm
const fakeSearchApi = (query: string): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query) resolve([]);
      else resolve([`${query} 1`, `${query} 2`, `${query} 3`]);
    }, 600);
  });
};

const SearchScreen = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fakeSearchApi(debouncedSearch).then((res) => {
      setResults(res);
      setLoading(false);
    });
  }, [debouncedSearch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tìm kiếm với debounce</Text>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        placeholder="Nhập từ khóa..."
      />
      {loading ? (
        <ActivityIndicator
          size="small"
          color="#333"
          style={{ marginTop: 16 }}
        />
      ) : (
        <View style={styles.results}>
          {results.length === 0 ? (
            <Text style={styles.empty}>Không có kết quả</Text>
          ) : (
            results.map((item, idx) => (
              <Text key={idx} style={styles.resultItem}>
                {item}
              </Text>
            ))
          )}
        </View>
      )}
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 6,
    paddingHorizontal: 8,
    height: 40,
    marginBottom: 16,
  },
  results: {
    marginTop: 8,
  },
  resultItem: {
    fontSize: 18,
    paddingVertical: 4,
  },
  empty: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 16,
  },
});

export default SearchScreen;
