import React, { useEffect, useState } from 'react';
import { Button, View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ingredients from '../data/ingredients.json';

export default function ingredientDetails() {
  
  const { itemId } = useLocalSearchParams(); 
  const [ingredient, setIngredient] = useState(null);

  useEffect(() => {
    numberItemId = Number(itemId);
    const foundIngredient = ingredients.find(ingredient => ingredient.id === numberItemId);
    if (foundIngredient) {
      setIngredient(foundIngredient);
    }
  }, [itemId]);

  

  if (!ingredient) {
    return <Text>Loading...{itemId}</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: "http://10.0.2.2:8000/"+ingredient.image }} style={styles.image} />
      <Text style={styles.title}>{ingredient.name}</Text>
      <FlatList style={styles.flatlist}
        data={ingredient.effects}
        renderItem={({ item }) => <Text style={styles.effect}>{item}</Text>}
        keyExtractor={(item) => item.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    objectFit: 'contain',
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  effect: {
    fontSize: 16,
    marginBottom: 5,
  },
  flatlist: {
    marginBottom: 25,
  },
});
