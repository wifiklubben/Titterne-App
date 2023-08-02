import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Pressable, Text } from 'react-native'

import Slider from '@react-native-community/slider';

import { Audio } from 'expo-av';

import MuteIcon from './assets/graphics/muteIcon.svg';
import UnmuteIcon from './assets/graphics/UnmuteIcon.svg';
import PlayIcon from './assets/graphics/playIcon.svg';
import PauseIcon from './assets/graphics/pauseIcon.svg';



export default function MusicRoomView({ styles }) {


    // audio load 
const [musicLoaded, setMusicLoaded ] = useState(false);

const [ track1, setTrack1 ] = useState();
const [ track2, setTrack2 ] = useState();
const [ track3, setTrack3 ] = useState();
const [ volume, setVolume ] = useState(0.0);
const [ volumeDisplay, setVolumeDisplay ] = useState(0)


  //loading music for music room

  useEffect(() => {

  async function loadMusic1() {

    try {
      
      const { sound } = await Audio.Sound.createAsync( require('./assets/audio/Gamma_Ray.mp3'));
      setTrack1( sound );
      console.log("track 1: ", track1);

    } catch (error) {

      console.log("error in initial loadMusic of track 1", error);

    }    
  }

  async function loadMusic2() {

    try {

      const { sound } = await Audio.Sound.createAsync( require('./assets/audio/AguasDeMarco.mp3'));
      setTrack2( sound );
      console.log("track 2: ", track2);

    } catch (error) {
      console.log("error in initial loadMusic of track 2: ", error);
    }
  }


  async function loadMusic3() {
    try {
     
      const { sound } = await Audio.Sound.createAsync( require('./assets/audio/Pelota.mp3'));
      setTrack3( sound );
      console.log("track 3: ", track3);

    } catch (error) {
      console.log("error in initial loadMusic of track 3: ", error);
    }
  }
  loadMusic1()
  loadMusic2()
  loadMusic3()
  setMusicLoaded(true);
}, [])



// play music funtion
  async function playMusic() {

    try {

      if (musicLoaded) {

        await track1.setVolumeAsync(volume)
        await track2.setVolumeAsync(volume)
        await track3.setVolumeAsync(volume)

        console.log("tracks playing");
        await track1.playAsync();
        await track2.playAsync();
        await track3.playAsync();
      }
    } catch (error) {
      console.log("This is the error: ", error);
    }
  }
  

  //  pause music function
  async function pauseMusic() {
    try{
     if (musicLoaded) {

      await track1.setVolumeAsync(volume)
      await track2.setVolumeAsync(volume)
      await track3.setVolumeAsync(volume)

      console.log("tracks paused");
      await track1.pauseAsync()
      await track2.pauseAsync()
      await track3.pauseAsync()
     }
    } catch (error) {
      console.log(error);
    }
  }

  // change volume function
  useEffect(() => {
    async function changeVolume() {

      try{
        await track1.setVolumeAsync(volume)
        await track2.setVolumeAsync(volume)
        await track3.setVolumeAsync(volume)
      } catch (error) {
        console.log("error changing volume: ", error);
      }
    } changeVolume()
  }, [ volume ])


  // volume handling 
 const handleVolumeChange = (rawVolume) => {

  const newVolume = Math.round(rawVolume)/100;
  const volumeTen = Math.round(newVolume*100)

  setVolumeDisplay(volumeTen)
  setVolume(newVolume);

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

              <Slider 
              style={styles.musicSlider} 
              minimumValue={0}
              maximumValue={100}
              steps={100}
              value={volume}
              onValueChange={handleVolumeChange}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              />
              <Text style={styles.h1Text}>All tracks volume: {volumeDisplay} </Text>

            </View>

        </View>
            
    </ImageBackground>

  )
}

