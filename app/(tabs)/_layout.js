import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen name="index"
        options={{
          title: 'All Ingredients',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="leaf" color={color} />,
          tabBarLabelStyle: {textAlign: 'center'},
        }}
      />
      <Tabs.Screen name="allpotions"
        options={{
          title: 'All Potions',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="flask" color={color} />,
          tabBarLabelStyle: {textAlign: 'center'},
        }}
      />
      <Tabs.Screen name="configuration"
        options={{
          title: 'Configuration',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="star" color={color} />,
          tabBarLabelStyle: {textAlign: 'center'},
        }}
      />
      <Tabs.Screen name="potionDetails"
        options={{
          title: 'Potion Details',
          href: null,
        }}
      />
      <Tabs.Screen name="ingredientDetails"
        options={{
          title: 'Ingredient Details',
          href: null,
        }}
      />
    </Tabs>
  );
}
