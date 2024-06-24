import React, { useState } from 'react';
import { View, Text, Image, Pressable, FlatList, StyleSheet, TextInput, useWindowDimensions } from 'react-native';
import ingredients from '../data/ingredients.json';
import { useRouter } from 'expo-router';

export default function Tab() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowDimensions();
  const numColumns = 3;

  const sortedIngredients = ingredients.sort((a, b) => a.name.localeCompare(b.name));

  const filteredIngredients = sortedIngredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const itemWidth = (width - 20 - (10 * (numColumns + 1))) / numColumns; // 20 for margins, 10 for gap between items

  return (
      <View style={{ flex: 1, backgroundColor: '#06233d'}}>
        <TextInput placeholderTextColor={'lightgray'}
            style={styles.searchBar}
            placeholder="Search ingredients..."
            value={searchQuery}
            onChangeText={setSearchQuery}
        />
        <FlatList
            data={filteredIngredients}
            renderItem={({ item }) => (
                <Pressable
                    style={[styles.itemContainer, { width: itemWidth }]}
                    onPress={() => router.push(`/ingredientDetails?itemId=${item.id}`)}
                >
                  <Image source={{ uri: "http://10.0.2.2:8000/ingredients/low/" + item.image }} style={styles.image} />
                  <Text style={styles.title}>{item.name}</Text>
                </Pressable>
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={numColumns}
            columnWrapperStyle={styles.columnWrapper}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderColor: '#06233d',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingLeft: 8,
    color: 'white',
  },
  itemContainer: {
    margin: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  title: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 6,
    color: 'white',
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    backgroundColor: '#06233d',
  },
});
