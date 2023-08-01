import React from 'react'
import { View, ImageBackground, Image, Animated, Text } from 'react-native';

function SettingsView({styles }) {
  return (
      <View style={styles.settingsContainer}>
        <Text style={styles.h1Text}> Settings Page</Text>
        <Text style={styles.h2Text}>Parental Control</Text>
        <Text style={styles.h2Text}>Shop</Text>
        <Text style={styles.h2Text}>Youtube Channel</Text>
        <Text style={styles.h2Text}>About Us</Text>
        </View>
  )
}

export default SettingsView