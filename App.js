import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, Pressable } from 'react-native';

import {  useFonts  } from 'expo-font';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as SplashScreen from 'expo-splash-screen';
import { Asset }  from 'expo-asset';

import HomeIcon from './assets/graphics/homeIcon.svg';
import SettingsIcon from './assets/graphics/settingsIcon';

import HomeView from './HomeView';
import MusicRoomView from './MusicRoomView';
import SettingsView from './SettingsView';


export default () => {

    // ********* VARIABLES *******************

  // define screen dimensions
    const fullWidth = Dimensions.get('window').width;
    const fullHeight = Dimensions.get('window').height;

  //load Bubblegum font
  const [fontLoaded] = useFonts({
    Bubblegum: require('./assets/fonts/BubblegumSans-Regular.ttf'),
  });


    // ********* STATES ************

  // set page being viewed, default 1
  const [activeView, setActiveView] = useState(1);

  const handleViewChange = (viewNumber) => {

    setActiveView(viewNumber);
  };

  const [showIntroAnimation, setShowIntroAnimation] = useState(true);

  // is content cached yet?
  const [ isLoaded, setIsLoaded] = useState(false);


SplashScreen.preventAutoHideAsync();



     // ********* EFFECTS ************

    //splashscreen for hiding loading assets

    useEffect(() => {
    const loadAssets = async () => {
      const images = [
        require('./assets/sky.png'), 
        require('./assets/Bg_trees.png'),
        require('./assets/House.png'),
        require('./assets/House_open_music_room.png'),
        require('./assets/forground.png'),
        require('./assets/TitterneLogo.png'),
      ]

      const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
      });

      try {

        await Promise.all(cacheImages);
        
        setIsLoaded(true);
        console.log('setIsLoaded true app.js');
        
        console.log('splashcreen hidden');
        await SplashScreen.hideAsync();

      } catch (e) {

        console.warn('Error = ', e)
        
      }

      };

      loadAssets();
    }, []);




  // Force hoiztonral orientation

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

    fullWidthBackground: {
      position: 'absolute',
      backgroundColor: '#000',
      height: '100%',
      width: '100%',
    },

    animationContainer: {
      width: '100%',
      height: '100%',
    },

    settingsContainer: {
      display: 'flex',
      gap: 50,
      height: '100%',
      width: '100%',
      alignItems: 'center',
      paddingTop: 100,
    },
  
    buttonContainer: {
      position: 'absolute',
      bottom: 50,
      right: 50,
      height: 100,
      flexDirection: 'row',
      gap: 10,
    },

    musicButtonContainer: {
      position: 'absolute',
      top: 50,
      left: 50,
      height: 100,
      flexDirection: 'column',
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
    },
  
    h1Text: {
      fontSize: 60, 
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

  {/* Home View */}
  
      {activeView === 1 && (

          <HomeView styles={styles} isLoaded={isLoaded} setShowAnimation={setShowIntroAnimation} showAnimation={showIntroAnimation}>
            {/* music room transition button */}

            <ImageBackground source={require('./assets/Music_room_icon.png')}
                              >

              <Pressable onPress={() => handleViewChange(2)}
                    style={ styles.RoomButton }>
              </Pressable>

            </ImageBackground>

          </HomeView>
      )}

{/* Music Room */}
      {activeView === 2 && (
          <MusicRoomView styles={styles}></MusicRoomView>
      )}

{/* Settings View */}
      {activeView === 30 && (
        <SettingsView styles={styles}>
        </SettingsView>
      )}  
        
        
{/* overview UI buttons, home/mute/settings */}

        {activeView > 0 && (
        <View style={styles.buttonContainer}>

          {activeView > 1 && (
          <Pressable style={styles.roundButton} onPress={() => handleViewChange(1)}>

            <HomeIcon width={72} height={72}/>

          </Pressable>
          )}


          <Pressable style={styles.roundButton} onPress={() => handleViewChange(30)}>
            
            <SettingsIcon width={72} height={72}/>

          </Pressable>
          

        </View>
        )}


      
      </View>

  );

        };