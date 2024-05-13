import { View, Text, Image, Pressable, FlatList, StyleSheet } from 'react-native';
import ingredients from '../data/ingredients.json'
import { useRouter } from 'expo-router';

const potionImg = require('../images/defaultPotion.webp');

export default function Tab() {
  const router = useRouter();

  const getUniqueEffects = () => {
    let uniqueEffects = [];
    ingredients.forEach(ingredient => {
      ingredient.effects.forEach(effect => {
        if (!uniqueEffects.includes(effect)) {
          uniqueEffects.push(effect);
        }
      });
    });
    return uniqueEffects;
  };

  const uniqueEffectsList = getUniqueEffects();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={uniqueEffectsList}
        renderItem={({ item }) => (
          <Pressable
            style={styles.itemContainer}
            onPress={() => router.push(`/potionDetails?effectName=${item}`)}
          >
            <Image source={potionImg} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{item}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.toString()}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
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
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
