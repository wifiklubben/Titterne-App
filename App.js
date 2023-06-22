import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

 function Empty() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!😍 </Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default function myTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Empty} />
        <Tab.Screen name="Settings" component={Empty} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hotpink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
