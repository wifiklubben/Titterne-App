import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, Pressable } from 'react-native';
import {  useFonts  } from 'expo-font';
import * as ScreenOrientation from 'expo-screen-orientation';


import HomeIcon from './assets/graphics/homeIcon.svg';
import MuteIcon from './assets/graphics/muteIcon.svg';
import SettingsIcon from './assets/graphics/settingsIcon';
import HomeView from './HomeView';
import IntroView from './IntroView';






export default () => {

    // ********* VARIABLES *******************

// define screen dimensions
  const fullWidth = Dimensions.get('window').width;
  const fullHeight = Dimensions.get('window').height;


    // ********* STATES ************

  // set page being viewed, default 1
  const [activeView, setActiveView] = useState(0);
  
  const handleViewChange = (viewNumber) => {
    setActiveView(viewNumber);
  };

  //load Bubblegum font
  const [fontLoaded] = useFonts({
    Bubblegum: require('./assets/fonts/BubblegumSans-Regular.ttf'),
  });

     // ********* EFFECTS ************

  useEffect(() => {

    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    // Researched that this won't work in the simulator, but will work on an exported app (https://github.com/expo/expo/issues/5188)

    // Load the font 
    if (!fontLoaded) {
      return;
    }
  }, [fontLoaded]); 

  if (!fontLoaded) {
    return null;
  }




  // ********* STYLES ***********************

  const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#8AC1DF',
      alignItems: 'center',
      width: fullWidth,
    },

    backgroundImage: {
      position: 'relative',
      flex: 1,
      width: '100%',
      left: '-50%',
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

    RoomButton: {
      position: 'absolute',
      width: 135,
      height: 160,
      left: (fullWidth/2) + 10,
      top: (fullHeight/2) - 140,
      borderWidth: 2,
      borderColor: 'red',
      borderStyle: 'dashed'
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

      {activeView === 0 && (
        <IntroView onViewChange={handleViewChange} styles={styles} fullWidth={fullWidth}/>
      )}

      {activeView === 1 && (


            <HomeView styles={styles}>
            {/* music room change button */}
            <Pressable onPress={() => handleViewChange(2)}
                 style={ styles.RoomButton }>
            </Pressable>
            </HomeView>


      )}

      {activeView === 2 && (
        <ImageBackground
        source = {require('./assets/Music_room_icon.png')}
          style={styles.backgroundImage}>
        <View >
          <Text style={styles.h1Text}>Music room!</Text>
        </View>
        </ImageBackground>
      )}

      {activeView === 30 && (
        <View style={styles.fullScreenView}>
          <Text style={styles.h1Text}> Settings Page</Text>
        </View>
      )}  
        
        
{/* overview UI buttons, home/mute/settings */}

        {activeView > 0 && (
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
        )}

      
      </View>

  );
}