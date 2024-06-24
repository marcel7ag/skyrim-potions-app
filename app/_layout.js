import { Drawer } from "expo-router/drawer";
import { FontAwesome } from '@expo/vector-icons';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet, View } from 'react-native';

/*
.color1 {color: #000000;}
.color2 {color: #06233d;}
.color3 {color: #1e5a8f;}
.color4 {color: #3999eb;}
.color5 {color: #55deff;}
 */

export default function AppLayout() {

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Drawer
                screenOptions={{
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: '#06233d' },
                    drawerBackgroundColor: 'red',
                    drawerStyle: {backgroundColor: '#06233d'},
                    drawerLabelStyle: styles.drawerLabel,
                }}
            >
                <Drawer.Screen
                    name="(tabs)"
                    options={{
                        drawerLabel: 'Skyrim Alchemy',
                        title: 'Skyrim Alchemy',
                        drawerIcon: ({color}) => (
                            <View style={styles.iconContainer}>
                                <FontAwesome size={28} name="home" color={color} />
                            </View>
                        ),
                        drawerInactiveBackgroundColor: 'rgba(255,255,255,0.2)',
                        drawerActiveBackgroundColor: 'rgba(57,153,235,0.5)',
                        overlayColor: 'rgba(0, 0, 0, 0.5)',
                        drawerActiveTintColor: 'white',
                        drawerInactiveTintColor: 'lightgray',
                    }}
                />
                <Drawer.Screen
                    name="configuration"
                    options={{
                        drawerLabel: 'Sensors',
                        title: 'Sensors',
                        drawerIcon: ({color}) => (
                            <View style={styles.iconContainer}>
                                <FontAwesome size={28} name="cog" color={color} />
                            </View>
                        ),
                        drawerInactiveBackgroundColor: 'rgba(255,255,255,0.2)',
                        drawerActiveBackgroundColor: 'rgba(57,153,235,0.5)',
                        overlayColor: 'rgba(0, 0, 0, 0.5)',
                        drawerActiveTintColor: 'white',
                        drawerInactiveTintColor: 'lightgray',
                    }}
                />
                <Drawer.Screen
                    name="About"
                    options={{
                        drawerLabel: 'About',
                        title: 'About Skyrim Alchemy',
                        drawerIcon: ({color}) => (
                            <View style={styles.iconContainer}>
                                <FontAwesome size={28} name="question" color={color} />
                            </View>
                        ),
                        drawerInactiveBackgroundColor: 'rgba(255,255,255,0.2)',
                        drawerActiveBackgroundColor: 'rgba(57,153,235,0.5)',
                        overlayColor: 'rgba(0, 0, 0, 0.5)',
                        drawerActiveTintColor: 'white',
                        drawerInactiveTintColor: 'lightgray',
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    drawerLabel: {
        paddingLeft: 16,
        color: 'white',
        fontSize: 16,
    },
    iconContainer: {
        width: 40,
        alignItems: 'center',
    },
});
