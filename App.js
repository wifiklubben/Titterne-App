import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Pressable } from 'react-native';
import {  useFonts  } from 'expo-font';
import * as ScreenOrientation from 'expo-screen-orientation';


// import { BottomTabBarHeightCallbackContext, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';

import HomeIcon from './assets/graphics/homeIcon.svg';
import MuteIcon from './assets/graphics/muteIcon.svg';
import SettingsIcon from './assets/graphics/settingsIcon';


// Lock screen to landscape
ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);



export default () => {

    // ********* VARIABLES *******************

// define screen width
  const fullWidth = Dimensions.get('window').width;


    // ********* STATES ************

  // set page being viewed, default 1
  const [activeView, setActiveView] = useState(1);
  
  const handleViewChange = (viewNumber) => {
    setActiveView(viewNumber);
  };

  //load Bubblegum font
  const [fontLoaded] = useFonts({
    Bubblegum: require('./assets/fonts/BubblegumSans-Regular.ttf'),
  });

     // ********* EFFECTS ************
  useEffect(() => {
    // Load the custom font on app start
    if (!fontLoaded) {
      return;
    }
  }, [fontLoaded]); 

  if (!fontLoaded) {
    return null;
  }


  // ********* GLOBAL STYLES ***********************

  const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#8AC1DF',
      alignItems: 'center',
      justifyContent: 'center',
      width: fullWidth,
    },

    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    buttonContainer: {
      position: 'absolute',
      bottom: 50,
      right: 50,
      height: 100,
      flexDirection: 'row',
      gap: 10,
    },
  
    roundButton: {
      backgroundColor : 'white',
      width: 100,
      height: 100,
      borderRadius: 100,
      borderWidth: 3,
      borderColor: 'black',
      justifyContent:'center',
      alignItems: 'center',
    },
  
    h1Text: {
      fontSize: 60, 
      zIndex: 99,
      fontFamily: 'Bubblegum',
      color: 'white',
    },
  
    h2Text: {
      fontFamily: 'Bubblegum',
      fontSize: 50, 
    },
  
  
    pText: {
      fontFamily: 'Bubblegum',
      fontSize: 30, 
    },
  
  
  });


  return (

    <View style={styles.container}>

      {activeView === 1 && (
        <ImageBackground
          source = {require('./assets/All_gfx_setup.png')}
            style={styles.backgroundImage}>
          <View style={styles.fullScreenView}>
            <Text style={styles.h1Text}>Fullscreen Home 1</Text>
          </View>
        </ImageBackground>
      )}

      {activeView === 2 && (
        <ImageBackground
        source = {require('./assets/Music_room_icon.png')}
          style={styles.backgroundImage}>
        <View style={styles.fullScreenView}>
          <Text style={styles.h1Text}>Fullscreen Page 2</Text>
        </View>
        </ImageBackground>
      )}

      {activeView === 30 && (
        <View style={styles.fullScreenView}>
          <Text style={styles.h1Text}>Fullscreen Settings</Text>
        </View>
      )}  
        
        
{/* overview UI buttons, home/mute/settings */}

      <View style={styles.buttonContainer}>

      <Pressable style={styles.roundButton} onPress={() => handleViewChange(1)}>

        <HomeIcon width={72} height={72}/>

      </Pressable>

      <Pressable style={styles.roundButton} onPress={() => handleViewChange(2)}>

        <MuteIcon width={65} height={65}/>

      </Pressable>

      <Pressable style={styles.roundButton} onPress={() => handleViewChange(30)}>
        
        <SettingsIcon width={72} height={72}/>

      </Pressable>

      </View>

      
      </View>

  );
}

