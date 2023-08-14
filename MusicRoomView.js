import React, { useEffect, useRef, useState } from 'react';
import { View, ImageBackground, Animated, Image } from 'react-native'

import { Audio } from 'expo-av';

import OneShot from './OneShot';
import Mixer from './Mixer';



export default function MusicRoomView({ styles, activeView }) {

    // audio load 
const [musicLoaded, setMusicLoaded ] = useState(false);
const [musicPlaying, setMusicPlaying] = useState(false);

const [ track1, setTrack1 ] = useState();
const [ track2, setTrack2 ] = useState();
const [ track3, setTrack3 ] = useState();

const [ sfx1, setSfx1 ] = useState();
const [ sfx2, setSfx2 ] = useState();

const [ volume1, setVolume1 ] = useState(0.0);
const [ volume2, setVolume2 ] = useState(0.0);
const [ volume3, setVolume3 ] = useState(0.0);




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
      const { sound } = await Audio.Sound.createAsync( require('./assets/audio/guitarLick.mp3'));
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

    if (musicPlaying === false) {

    try {

      if (musicLoaded) {


        await track1.setVolumeAsync(volume1)
        await track2.setVolumeAsync(volume2)
        await track3.setVolumeAsync(volume3)

        await track1.playAsync();
        await track2.playAsync();
        await track3.playAsync();

        setMusicPlaying(true);

        console.log("tracks playing");
      }
    } catch (error) {
      console.log("This is the error: ", error);
    }
  }

  else {

    try{

      if (musicLoaded) {
 
       await track1.setVolumeAsync(volume1)
       await track2.setVolumeAsync(volume2)
       await track3.setVolumeAsync(volume3)
       
       await track1.pauseAsync()
       await track2.pauseAsync()
       await track3.pauseAsync()
 
       setMusicPlaying(false);
       console.log("tracks paused");

 
      } 
 
     } catch (error) {
       console.log(error);
     }
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
  setVolume1(rawVolume);
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
const handleVolumeChange2 = (newVolume) => {
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
const handleVolumeChange3 = (newVolume) => {
setVolume3(newVolume);
}

// animation functions

const wiggleAnimation = () => {
  console.log("wiggling!");
  Animated.sequence([
    Animated.timing(animatedValue, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: -10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }),
  ]).start();
};




  return (

<ImageBackground source = {require('./assets/Music_room_inside.png')}
        style={styles.fullWidthBackground}>
            

         <Mixer 
              styles={styles}    
              handleVolumeChange1={handleVolumeChange1}
              handleVolumeChange2={handleVolumeChange2}
              handleVolumeChange3={handleVolumeChange3}
              track1={track1}
              track2={track2}
              track3={track3}
              volume1={volume1}
              volume2={volume2}
              volume3={volume3}
              playMusic={playMusic}
              musicLoaded={musicLoaded}
              musicPlaying={musicPlaying}
              />



            <View style={{
                position:'absolute',
                top: 300,
                right: 150,
              
              }}>


              <OneShot soundToPlay={sfx1} styles={styles}>

               <Animated.Image source={require('./assets/ThordenBass.png')}
                          styles={[
                            styles.speakerButton
                          ]}
                          onPress={wiggleAnimation}
                          />

              </OneShot>

              </View>

             
              <View style={{
                position:'absolute',
                top: 100,
                right: 350,
              }}>

              <OneShot  soundToPlay={sfx2} styles={styles}>

              <Image source={require('./assets/speakerR.png')}
              styles={styles.speakerButton}/>

              </OneShot>
              
              </View>

            
    </ImageBackground>

  )
}

