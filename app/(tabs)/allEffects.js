import React, { useState } from 'react';
import { View, Text, Image, Pressable, FlatList, StyleSheet, TextInput } from 'react-native';
import ingredients from '../data/ingredients.json';
import { useRouter } from 'expo-router';

export default function Tab() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const getUniqueEffects = () => {
    let uniqueEffects = [];
    ingredients.forEach(ingredient => {
      ingredient.effects.forEach(effect => {
        if (!uniqueEffects.includes(effect)) {
          uniqueEffects.push(effect);
        }
      });
    });
    return uniqueEffects.sort();
  };

  const uniqueEffectsList = getUniqueEffects();

  const filteredEffectsList = uniqueEffectsList.filter(effect => 
    effect.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#06233d'}}>
      <TextInput placeholderTextColor={'lightgray'}
        style={styles.searchBar}
        placeholder="Search effects..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredEffectsList}
        renderItem={({ item }) => {
          // Determine the effectImg based on the item name here
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
            <Pressable
              style={styles.itemContainer}
              onPress={() => router.push(`/effectDetails?effectName=${encodeURIComponent(item)}`)}
            >
              <Image source={effectImg} style={styles.image} resizeMode="contain" />

              <Text style={styles.title}>{item}</Text>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.toString()}
        numColumns={3}
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
    flex: 1,
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
    height: 50,
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
