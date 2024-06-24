import React, { useEffect, useState } from 'react';
import {View, Text, Image, FlatList, StyleSheet, Pressable} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import ingredients from '../data/ingredients.json';
import {useFocusEffect} from "@react-navigation/native";

export default function EffectDetails() {
  const { effectName } = useLocalSearchParams();
  const [effect, setEffect] = useState([]);
  let effectImg;
  const router = useRouter();

  useEffect(() => {
    const matchingIngredients = ingredients.filter(ingredient => 
      ingredient.effects.some(effect => effect.toLowerCase() === effectName.toLowerCase())
    );
    setEffect(matchingIngredients);
  }, [effectName]);  

  //image setter
  if (effectName.toLowerCase().includes('damage') || effectName.toLowerCase().includes('ravage')) {
    effectImg = require('../images/effects/damage.png');
  } else if (effectName.toLowerCase().includes('restore') || effectName.toLowerCase().includes('regenerate')) {
    effectImg = require('../images/effects/restore.png');
  } else if (effectName.toLowerCase().includes('fortify')) {
    effectImg = require('../images/effects/fortify.png');
  } else if (effectName.toLowerCase().includes('weakness')) {
    effectImg = require('../images/effects/weakness.png');
  } else if (effectName.toLowerCase().includes('resist')) {
    effectImg = require('../images/effects/resist.png');
  } else {
    effectImg = require('../images/effects/misc.png');
  }

  useFocusEffect(
      React.useCallback(() => {
        // When the screen is focused, do nothing special
        return () => {
          // When the screen is unfocused, reset the ingredient state
          setEffect('');
        };
      }, [])
  );

  if (!effect.length) {
    return <View style={styles.container}><Text style={{color: 'white',}}>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Image source={effectImg} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{effectName}</Text>
      <FlatList style={styles.flatlist}
        data={effect}
        renderItem={({ item }) => (
          <View style={styles.rowContainer}>
            <Pressable
                style={[styles.rowContainer]}
                onPress={() => router.push(`/ingredientDetails?itemId=${item.id}`)}
            >
              <Image source={{ uri: "http://10.0.2.2:8000/ingredients/low/" + item.image }} style={styles.ingredientImage} resizeMode="contain" />
              <Text style={styles.effect}>{item.name}</Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
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
  ingredientImage: {
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
    marginVertical: 5,
    color: 'white',
  },
  flatlist: {
    marginBottom: 25,
  },
});
