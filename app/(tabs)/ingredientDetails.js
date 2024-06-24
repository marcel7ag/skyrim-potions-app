import React, { useEffect, useState } from 'react';
import {View, Text, Image, FlatList, StyleSheet, Pressable} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import ingredients from '../data/ingredients.json';

export default function ingredientDetails() {
  
  const { itemId } = useLocalSearchParams(); 
  const [ingredient, setIngredient] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const numberItemId = Number(itemId);
    const foundIngredient = ingredients.find(ingredient => ingredient.id === numberItemId);
    if (foundIngredient) {
      setIngredient(foundIngredient);
    }
  }, [itemId]);

    useFocusEffect(
        React.useCallback(() => {
            // When the screen is focused, do nothing special
            return () => {
                // When the screen is unfocused, reset the ingredient state
                setIngredient(null);
            };
        }, [])
    );

  if (!ingredient) {
    return <View style={styles.container}><Text style={{color: 'white',}}>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: "http://10.0.2.2:8000/ingredients/"+ingredient.image }} style={styles.image} />
      <Text style={styles.title}>{ingredient.name}</Text>
      <FlatList style={styles.flatlist}
        data={ingredient.effects}
        renderItem={({ item }) => {
            //image setter
          let effectImg;
          if (item.toLowerCase().includes('damage') || item.toLowerCase().includes('ravage')) {
            effectImg = require('../images/effects/damage.png');
          } else if (item.toLowerCase().includes('restore') || item.toLowerCase().includes('regenerate')) {
            effectImg = require('../images/effects/restore.png');
          } else if (item.toLowerCase().includes('fortify')) {
            effectImg = require('../images/effects/fortify.png');
          } else if (item.toLowerCase().includes('weakness')) {
            effectImg = require('../images/effects/weakness.png');
          } else if (item.toLowerCase().includes('resist')) {
            effectImg = require('../images/effects/resist.png');
          } else {
            effectImg = require('../images/effects/misc.png');
          }
          return (
            <View style={styles.rowContainer}>
                <Pressable
                    style={[styles.rowContainer]}
                    onPress={() => router.push(`/effectDetails?effectName=${item}`)}
                >
                  <Image source={effectImg} style={styles.effectImage} resizeMode="contain"/>
                  <Text style={styles.effect}>{item}</Text>
                </Pressable>
            </View>
          );
        }}
        keyExtractor={(item) => item.toString()}
        numColumns={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06233d',
    color: 'white',
  },
  image: {
    objectFit: 'contain',
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  effectImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: 'white',
  },
  effect: {
    fontSize: 18,
    marginBottom: 5,
    color: 'white',
  },
  flatlist: {
    marginBottom: 25,
  },
});
