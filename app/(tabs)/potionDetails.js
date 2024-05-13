import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ingredients from '../data/ingredients.json';

export default function PotionDetails() {
  const { effectName } = useLocalSearchParams();
  const [potion, setPotion] = useState([]);
  const potionImg = require('../images/defaultPotion.webp');

  useEffect(() => {
    const matchingIngredients = ingredients.filter(ingredient => 
      ingredient.effects.some(effect => effect.toLowerCase() === effectName.toLowerCase())
    );
    setPotion(matchingIngredients);
  }, [effectName]);  

  if (!potion.length) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={potionImg} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Potion Details</Text>
      <FlatList
        data={potion}
        renderItem={({ item }) => <Text style={styles.effect}>{item.name}</Text>}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  effect: {
    fontSize: 18,
    marginVertical: 5,
  },
});
