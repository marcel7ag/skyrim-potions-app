import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function About() {
  return (
      <View style={styles.container}>
        <Text style={styles.text}>
          <Text style={styles.paragraph}>
            Alchemy is the art of brewing potions and poisons by combining ingredients with matching effects, using an Alchemy Lab.
          </Text>
          {'\n\n'}
          <Text style={styles.paragraph}>
            It is a skill in The Elder Scrolls V: Skyrim and also one of the three crafting skills in Skyrim, together with Smithing and Enchanting.
          </Text>
        </Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06233d',
    padding: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ffffff',
    lineHeight: 24,
  },
  paragraph: {
    marginBottom: 12,
  },
});
