import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, Pressable } from 'react-native';
import {  useFonts  } from 'expo-font';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Audio } from 'expo-av';


import HomeIcon from './assets/graphics/homeIcon.svg';
import MuteIcon from './assets/graphics/muteIcon.svg';
import UnmuteIcon from './assets/graphics/UnmuteIcon.svg';
import SettingsIcon from './assets/graphics/settingsIcon';
import PlayIcon from './assets/graphics/playIcon.svg';
import PauseIcon from './assets/graphics/pauseIcon.svg';


import HomeView from './HomeView';
import IntroView from './IntroView';
import MusicRoomView from './MusicRoomView';


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
  const [activeView, setActiveView] = useState(0);
  
  const handleViewChange = (viewNumber) => {
    setActiveView(viewNumber);
  };


  // audio load 
const [ music, setMusic ] = useState();
const [ volume, setVolume ] = useState(0.5);


     // ********* EFFECTS ************

useEffect(() => {
  async function loadMusic() {
    try {
      const { sound } = await Audio.Sound.createAsync( require('./assets/audio/Gamma_Ray.mp3')
    );
    setMusic( sound );
    } catch (error) {
      console.log(error);
    }    
  }
  loadMusic();

  return () => {
    if (music) {
      music.unloadAsync();
    }
  }

}, [])


// play music funtion
  async function playMusic() {
    try {
      if (music) {
        await music.playAsync();
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  //  pause music function
  async function pauseMusic() {
    try{
     if (music) {
      await music.pauseAsync()
     }
    } catch (error) {
      console.log(error);
    }
  }

  // raise volume function
  async function raiseVolume() {
    try{
      if (music) {
        const newVolume = Math.min(Number((volume + 0.1).toFixed(1)), 1);
        setVolume(newVolume);
        await music.setVolumeAsync(newVolume);
        console.log(newVolume)
      } 
    } catch (error) {
      console.log(error);
    }
  }

  // lower volume function
  async function lowerVolume() {
    try{
      if (music) {
        const newVolume = Math.max(Number(volume - 0.1).toFixed((1)), 0);
        setVolume(newVolume);
        await music.setVolumeAsync(newVolume);
        console.log(newVolume)
      } 
    } catch (error) {
      console.log(error);
    }
  }


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

  {/* Home View */}
  
      {activeView === 1 && (

          <HomeView styles={styles}>
            {/* music room transition button */}

            {/* <ImageBackground source={require('./assets/Music_room_icon.png')}> */}

              <Pressable onPress={() => handleViewChange(2)}
                    style={ styles.RoomButton }>
              </Pressable>

            {/* </ImageBackground> */}

          </HomeView>
      )}

{/* Music Room */}
      {activeView === 2 && (
          <MusicRoomView styles={styles}>
  
            <View style={styles.musicButtonContainer}>

                <Pressable onPress={playMusic} style={styles.roundButton}>  

                    <PlayIcon width={72} height={60}/>

                </Pressable>

                <Pressable onPress={pauseMusic} style={styles.roundButton}>

                    <PauseIcon width={60} height={60}/>

                </Pressable>

                <Pressable onPress={raiseVolume} style={styles.roundButton}>

                    <UnmuteIcon width={60} height={60}/>

                </Pressable>

                <Pressable onPress={lowerVolume} style={styles.roundButton}>

                    <MuteIcon width={72} height={72}/>
                  
                </Pressable>

              </View>

          </MusicRoomView>
      )}

{/* Settings View */}
      {activeView === 30 && (
        <View style={styles.fullScreenView}>
          <Text style={styles.h1Text}> Settings Page</Text>
        </View>
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