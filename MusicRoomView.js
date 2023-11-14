import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Animated, Image, Pressable } from 'react-native'



import OneShot from './OneShot';
import MusicGameView from './MusicGameView';


import { Audio } from 'expo-av';

export default function MusicRoomView({ styles }) {

const [ sfx1, setSfx1 ] = useState();
const [ sfx2, setSfx2 ] = useState();



const [isMusicGameOpen, setIsMusicGameOpen] = useState(false);

const [isPlayignRightNow, setIsPlayingRightNow] = useState(null);


const handleMusicGameOpen = () => {
  console.log("opening music room game", "music game is open: ", isMusicGameOpen);

  if (isMusicGameOpen === false) {
    setIsMusicGameOpen(true);
  } else if (isMusicGameOpen === true) {
    setIsMusicGameOpen(false);
  }
};


useEffect(() =>{
  
  async function loadSfx1() {
    try {
      const { sound } = await Audio.Sound.createAsync( require('./assets/audio/guitarLick.mp3'));
      setSfx1( sound );
    } catch (error) {
      console.log("error in initial loadMusic of sfx1: ", error);
    }
  }

  async function loadSfx2() {
    try {
      const { sound } = await Audio.Sound.createAsync( require('./assets/audio/Airhorn.mp3'));
      setSfx2( sound );
    } catch (error) {
      console.log("error in initial loadMusic of sfx2: ", error);
    }
  }
  
  loadSfx1()
  loadSfx2()
  
}, [])


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

<ImageBackground source = {require('./assets/MusicRoom/musicRoomPlacement.png')}
        style={styles.fullWidthBackground}>


    <Pressable onPress={() => handleMusicGameOpen()}
    style={{
      position: 'absolute',      
      height: 90,
      width: 290,
      top: 615,
      left: 300,
      borderWidth: 3,
      borderColor: 'red',
      transform: 'rotateZ(-17deg)'
    }}>
      <Image source={require('./assets/MusicRoom/MusicRoomAssets/Keyboard.png')} 
      style={{
      height: '145%',
      width: '145%',
      transform: [{rotateZ: '17deg'}],
      overflow: 'visible',
      left: -70,      }}/>

    </Pressable>

    <Pressable style={{
      position: 'absolute',
      height: 150,
      width: 85,
      top: 650,
      left: 200,
      borderWidth: 3,
      borderColor: 'green',
    }}>
      {/* insert maracas spritesheet here */}
    </Pressable>
            
    <Pressable style={{
      position: 'absolute',
      height: 100,
      width: 130,
      top: 605,
      left: 70,
      borderWidth: 3,
      borderColor: 'brown',
    }}>
      {/* insert tambourine spritesheet here */}
    </Pressable>
            
    <Pressable style={{
      position: 'absolute',
      height: 285,
      width: 135,
      top: 340,
      left: 840,
      borderWidth: 3,
      borderColor: 'orange',
    }}>
      {/* insert guitar spritesheet here */}
    </Pressable>
            
            
    <Pressable style={{
      position: 'absolute',
      height: 85,
      width: 190,
      top: 360,
      left: 640,
      borderWidth: 3,
      borderColor: 'gold',
    }}>
      {/* insert trumpet spritesheet here */}
    </Pressable>
            
            
    <Pressable style={{
      position: 'absolute',
      height: 50,
      width: 175,
      top: 740,
      left: 360,
      borderWidth: 3,
      borderColor: 'lime',
      transform: 'rotateZ(-18deg)'
    }}>
      {/* insert flute spritesheet here */}
    </Pressable>
            
    <Pressable style={{
      position: 'absolute',
      height: 130,
      width: 190,
      top: 500,
      left: 6300,
      borderWidth: 3,
      borderColor: 'gray',
    }}>
      {/* insert record player spritesheet here */}
    </Pressable>
            


    {isMusicGameOpen && (
      <MusicGameView 
      styles={styles}  
      handleMusicGameOpen={handleMusicGameOpen}  
      />
      )}

        {/* <View style={{
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
          
        </View> */}

            
    </ImageBackground>

  )
}

