import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Accelerometer, LightSensor } from 'expo-sensors';

export default function Tab() {
  // Checkboxes
  const [AMisSelected, AMsetSelection] = useState(false);
  const [LisSelected, LsetSelection] = useState(false);

  // Accelerometer data
  const [{ x, y, z }, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });

  // licht sensor data
  const [ambientLightData, setAmbientLightData] = useState({ illuminance: 0 });
  const [ambientLightSubscription, setAmbientLightSubscription] = useState(null);

  // accelerosensor wenn checkbox ja
  useEffect(() => {
    let accelerometerSubscription;

      accelerometerSubscription = Accelerometer.addListener(accelerometerData => {
        setAccelerometerData(accelerometerData);
      });

    return () => {
      if (accelerometerSubscription) {
        accelerometerSubscription.remove();
      }
    };
  }, [AMisSelected]);

  // licht sensor
  const subscribeToAmbientLight = async () => {
    try {
      const { status } = await LightSensor.requestPermissionsAsync();
      if (status === 'granted') {
        const subscription = LightSensor.addListener(sensorData => {
          setAmbientLightData(sensorData);
        });
        setAmbientLightSubscription(subscription);
      } else {
        console.log('Permission to access ambient light sensor was denied');
      }
    } catch (error) {
      console.log('Error while requesting ambient light sensor permission:', error);
    }
  };

  const unsubscribeFromAmbientLight = () => {
    if (ambientLightSubscription) {
      ambientLightSubscription.remove();
      setAmbientLightSubscription(null);
    }
  };

  // licht sensor wenn checkbox ja
  useEffect(() => {
    if (LisSelected) {
      subscribeToAmbientLight();
    } else {
      unsubscribeFromAmbientLight();
    }

    return () => {
      unsubscribeFromAmbientLight();
    };
  }, [LisSelected]);

  // background color calc mit licht
  const getBackgroundColor = () => {
    const { illuminance } = ambientLightData;
    const maxIlluminance = 40000;
    const minBackgroundBrightness = 20;
    const maxBackgroundBrightness = 100;
    const brightness = (maxIlluminance - illuminance) / maxIlluminance;
    const backgroundBrightness = minBackgroundBrightness + brightness * (maxBackgroundBrightness - minBackgroundBrightness);
    return `rgba(6, 35, 61, ${backgroundBrightness / 100})`; // Adjust RGB values as needed
  };

  return (
      <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
        <View style={styles.checkboxContainer}>
          <CheckBox
              value={AMisSelected}
              onValueChange={AMsetSelection}
              style={styles.checkbox}
          />
          <Text style={styles.label}>Accelerometer sensor</Text>
          <CheckBox
              value={LisSelected}
              onValueChange={LsetSelection}
              style={styles.checkbox}
          />
          <Text style={styles.label}>Ambient Light sensor</Text>
        </View>
        <Text style={styles.label}>
          Accelerometer: {AMisSelected ? 'yes' : 'no'}
        </Text>
        <Text style={styles.label}>
          Light sensor: {LisSelected ? 'yes' : 'no'}
        </Text>
        <Text style={styles.label}>
          Illuminance: {Platform.OS === 'android' ? `${ambientLightData.illuminance} lx` : `Only available on Android`}
        </Text>
        <Text style={styles.label}>x: {x}</Text>
        <Text style={styles.label}>y: {y}</Text>
        <Text style={styles.label}>z: {z}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#06233d',
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
    color: 'white',
  },
});
