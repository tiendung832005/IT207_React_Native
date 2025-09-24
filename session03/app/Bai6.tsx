import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';

const products = [
  { id: '1', name: 'Sản phẩm 1' },
  { id: '2', name: 'Sản phẩm 2' },
  { id: '3', name: 'Sản phẩm 3' },
  { id: '4', name: 'Sản phẩm 4' },
  { id: '5', name: 'Sản phẩm 5' },
  { id: '6', name: 'Sản phẩm 6' },
  { id: '7', name: 'Sản phẩm 7' },
  { id: '8', name: 'Sản phẩm 8' },
];

function getNumColumns(width: number, height: number): number {
  // Tablet: width >= 768
  if (width >= 768) return 4;
  // Landscape: width > height
  if (width > height) return 3;
  // Portrait: default
  return 2;
}

export default function Bai6() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const numColumns = getNumColumns(dimensions.width, dimensions.height);
  const itemWidth = (dimensions.width - 32 - (numColumns - 1) * 12) / numColumns;
  const itemHeight = itemWidth * 0.7;
  const fontSize = Math.round(itemWidth / 9);

  useEffect(() => {
  const onChange = ({ window }: { window: any }) => setDimensions(window);
    const subscription = Dimensions.addEventListener('change', onChange);
    return () => {
      if (typeof subscription?.remove === 'function') subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        key={numColumns}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <View style={[styles.item, { width: itemWidth, height: itemHeight }]}> 
            <Text style={{ fontSize, fontWeight: 'bold', color: '#333' }}>{item.name}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={numColumns > 1 ? { justifyContent: 'space-between' } : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  grid: {
    paddingBottom: 16,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
});
