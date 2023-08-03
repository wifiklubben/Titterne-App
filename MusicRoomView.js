import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Pressable, Text } from 'react-native'

import { Audio } from 'expo-av';

import PlayIcon from './assets/graphics/playIcon.svg';
import PauseIcon from './assets/graphics/pauseIcon.svg';
import Multitrack from './Multitrack';
import OneShot from './OneShot';



export default function MusicRoomView({ styles, activeView }) {




    // audio load 
const [musicLoaded, setMusicLoaded ] = useState(false);

const [ track1, setTrack1 ] = useState();
const [ track2, setTrack2 ] = useState();
const [ track3, setTrack3 ] = useState();
const [ sfx1, setSfx1 ] = useState();
const [ sfx2, setSfx2 ] = useState();
const [ volume1, setVolume1 ] = useState(0.0);
const [ volume2, setVolume2 ] = useState(0.0);
const [ volume3, setVolume3 ] = useState(0.0);
const [ volumeDisplay1, setVolumeDisplay1 ] = useState(0)
const [ volumeDisplay2, setVolumeDisplay2 ] = useState(0)
const [ volumeDisplay3, setVolumeDisplay3 ] = useState(0)




  //loading music for music room

  useEffect(() => {

  async function loadMusic1() {

    try {
      
      const { sound } = await Audio.Sound.createAsync( require('./assets/audio/Gamma_Ray.mp3'));
      setTrack1( sound );

    } catch (error) {

      console.log("error in initial loadMusic of track 1", error);

    }    

  }

  async function loadMusic2() {

    try {

      const { sound } = await Audio.Sound.createAsync( require('./assets/audio/AguasDeMarco.mp3'));
      setTrack2( sound );

    } catch (error) {
      console.log("error in initial loadMusic of track 2: ", error);
    }
  }


  async function loadMusic3() {
    try {
     
      const { sound } = await Audio.Sound.createAsync( require('./assets/audio/Pelota.mp3'));
      setTrack3( sound );

    } catch (error) {
      console.log("error in initial loadMusic of track 3: ", error);
    }
  }

  async function loadSfx1() {
    try {
      const { sound } = await Audio.Sound.createAsync( require('./assets/audio/sax1.mp3'));
      setSfx1( sound );
      console.log("SFX1 loaded: ", setSfx1);

    } catch (error) {
      console.log("error in initial loadMusic of sfx1: ", error);
    }

  }
  async function loadSfx2() {
    try {
      const { sound } = await Audio.Sound.createAsync( require('./assets/audio/Airhorn.mp3'));
      setSfx2( sound );
      console.log("SFX2 loaded: ", setSfx2);
      

    } catch (error) {
      console.log("error in initial loadMusic of sfx2: ", error);
    }

  }

  
  loadSfx1()
  loadSfx2()
  loadMusic1()
  loadMusic2()
  loadMusic3()
  setMusicLoaded(true);
  

}, [])


// unload tracks on unmount

useEffect(() =>{
  if(track1) {
    return () => {
      if (track1) {
        track1.unloadAsync();
      }
    }
  }
}, [track1])

useEffect(() =>{
  if(track2) {
    return () => {
      if (track2) {
        track2.unloadAsync();
      }
    }
  }
}, [track2])

useEffect(() =>{
  if(track3) {
    return () => {
      if (track3) {
        track3.unloadAsync();
      }
    }
  }
}, [track3])



// play music funtion
  async function playMusic() {

    try {

      if (musicLoaded) {


        await track1.setVolumeAsync(volume1)
        await track2.setVolumeAsync(volume2)
        await track3.setVolumeAsync(volume3)

        await track1.playAsync();
        await track2.playAsync();
        await track3.playAsync();
        console.log("tracks playing");
      }
    } catch (error) {
      console.log("This is the error: ", error);
    }
  }
  

  //  pause music function
  async function pauseMusic() {
    try{
     if (musicLoaded) {

      await track1.setVolumeAsync(volume1)
      await track2.setVolumeAsync(volume2)
      await track3.setVolumeAsync(volume3)
      
      await track1.pauseAsync()
      await track2.pauseAsync()
      await track3.pauseAsync()

      console.log("tracks paused");

     } 

    } catch (error) {
      console.log(error);
    }
  }

  // change volume1 function
  useEffect(() => {
    async function changeVolume1() {
      try{
        if(musicLoaded) {
        await track1.setVolumeAsync(volume1)
        }
      } catch (error) {
        console.log("error changing volume1: ", error);
      }
    } changeVolume1()

  }, [ volume1 ])


  // volume handling 1
 const handleVolumeChange1 = (rawVolume) => {

  const newVolume = Math.round(rawVolume)/100;
  const volumeTen = Math.round(newVolume*100)

  setVolumeDisplay1(volumeTen)
  setVolume1(newVolume);

 }

 // change volume2 function
 useEffect(() => {
  async function changeVolume2() {
    try{
      if(musicLoaded) {
      await track2.setVolumeAsync(volume2)
      }
    } catch (error) {
      console.log("error changing volume2: ", error);
    }
  } changeVolume2()

}, [ volume2 ])


// volume handling 2
const handleVolumeChange2 = (rawVolume) => {

const newVolume = Math.round(rawVolume)/100;
const volumeTen = Math.round(newVolume*100)

setVolumeDisplay2(volumeTen)
setVolume2(newVolume);

}

// change volume3 function
useEffect(() => {

  async function changeVolume3() {
    try{
      if(musicLoaded) {
      await track3.setVolumeAsync(volume3)
      }
    } catch (error) {
      console.log("error changing volume3: ", error);
    }
  } changeVolume3()
 
}, [ volume3 ])


// volume handling 3
const handleVolumeChange3 = (rawVolume) => {

const newVolume = Math.round(rawVolume)/100;
const volumeTen = Math.round(newVolume*100)

setVolumeDisplay3(volumeTen)
setVolume3(newVolume);

}

 
  return (

<ImageBackground source = {require('./assets/Music_room_inside.png')}
        style={styles.fullWidthBackground}>
            
        <View style={{   
                  height: 100,
                  flexDirection: 'row',
                  gap: 10}}>
                    

            <View style={styles.musicButtonContainer}>

              <View style={{   
                  height: 100,
                  flexDirection: 'row',
                  gap: 10}}>

              <Pressable onPress={playMusic} style={styles.roundButton}>  

                  <PlayIcon width={72} height={60}/>

              </Pressable>

              <Pressable onPress={pauseMusic} style={styles.roundButton}>

                  <PauseIcon width={60} height={60}/>

              </Pressable>

              </View>

            <Multitrack styles={styles} volume={volume1} handleVolumeChange={handleVolumeChange1}>

              <Text style={styles.h1Text}> Track 1 volume: {volumeDisplay1} </Text>
              
            </Multitrack>

            <Multitrack styles={styles} volume={volume2} handleVolumeChange={handleVolumeChange2}>

              <Text style={styles.h1Text}> Track 2 volume: {volumeDisplay2} </Text>
              
            </Multitrack>

            <Multitrack styles={styles} volume={volume3} handleVolumeChange={handleVolumeChange3}>

              <Text style={styles.h1Text}> Track 3 volume: {volumeDisplay3} </Text>
              
            </Multitrack>


            </View>



            <View style={{   
                  position: 'absolute',
                  top: 50,
                  right: 200,
                  height: 100,
                  flexDirection: 'row',
                  gap: 10}}>


              <OneShot styles={styles} soundToPlay={sfx1}>

                <Text>Saxophone</Text>

              </OneShot>


              <OneShot styles={styles} soundToPlay={sfx2}>

              <Text>Air horn</Text>

              </OneShot>

            </View>


        </View>
            
    </ImageBackground>

  )
}

