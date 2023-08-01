import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Pressable } from 'react-native'
import { Audio } from 'expo-av';

import MuteIcon from './assets/graphics/muteIcon.svg';
import UnmuteIcon from './assets/graphics/UnmuteIcon.svg';
import PlayIcon from './assets/graphics/playIcon.svg';
import PauseIcon from './assets/graphics/pauseIcon.svg';



export default function MusicRoomView({ styles }) {

console.log("step 1");
    // audio load 
const [ music, setMusic ] = useState(null);
const [ volume, setVolume ] = useState(0.5);


  //loading music for music room
useEffect(() => {
  console.log("step 2");
  async function loadMusic() {
    try {
      const  { sound }  = await Audio.Sound.createAsync( require('./assets/audio/Gamma_Ray.mp3'));

    setMusic( sound );

    } catch (error) {
      console.log("error in initial loadMusic", error);
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

  return (

<ImageBackground source = {require('./assets/Music_room_icon.png')}
        style={styles.fullWidthBackground}>
            
        <View>

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

        </View>
            
    </ImageBackground>

  )
}

