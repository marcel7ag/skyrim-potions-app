import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'lightgrey',
                tabBarStyle: {
                    backgroundColor: '#06233d',
                    borderTopWidth: 1,
                    borderTopColor: '#06233d',
                },
                tabBarLabelStyle: { textAlign: 'center' },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'All Ingredients',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="leaf" color={color} />,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="allEffects"
                options={{
                    title: 'All Effects',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="flask" color={color} />,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="effectDetails"
                options={{
                    title: 'Effect Details',
                    href: null,
                    headerShown: false,

                }}
            />
            <Tabs.Screen
                name="ingredientDetails"
                options={{
                    title: 'Ingredient Details',
                    href: null,
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}
