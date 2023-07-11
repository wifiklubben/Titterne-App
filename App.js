import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
// import * as ScreenOrientation from 'expo-screen-orientation';

const Tab = createBottomTabNavigator();


  


 function Empty1() {
  return (
    <View style={styles.container}>
      <Image source={
        {uri: "/assets/"}
      }
      style={{
        height: 200,
        width: 200,
        marginBottom: 24,
      }}
      ></Image>

      <Text>I'm a kyoot wittle kitty😍 </Text>
      <StatusBar style="auto" />
    </View>
  );
}
 function Empty2() {
  return (
    <View style={styles.container}>
      <Image source={
        {uri: "https://media.tenor.com/pZoEd_5z0rMAAAAM/being-silly-hey.gif"}
      }
      style={{
        height: 300,
        width: 300,
        marginBottom: 24,
      }}
      ></Image>

      <Text>I'm also a kyoot wittle kitty😍 </Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default function myTabs() {  
 
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Page 1" component={Empty1} />
        <Tab.Screen name="Page 2" component={Empty2} />
        <Tab.Screen name="Page 3" component={Empty1} />
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
