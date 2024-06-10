import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CheckBox from 'expo-checkbox';

export default function Tab() {
  const [isSelected, setSelection] = useState(false);
  
  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text style={styles.label}>checkbox 1</Text>
      </View>
      <Text>Enable shake to toggle dark mode?: {isSelected ? 'yes' : 'no'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});
