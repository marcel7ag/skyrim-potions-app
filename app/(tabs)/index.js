import { View, Text, Image, Pressable, FlatList, StyleSheet } from 'react-native';
import ingredients from '../data/ingredients.json'
import { useRouter } from 'expo-router';

export default function Tab() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={ingredients}
        renderItem={({ item }) => (
          <Pressable
            style={styles.itemContainer}
            onPress={() => router.push(`/ingredientDetails?itemId=${item.id}`)}
          >
            <Image source={{ uri: "http://10.0.2.2:8000/ingredients/"+item.image }} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
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
    width: '60',
    height: 30,
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
