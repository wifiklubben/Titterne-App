import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Animated, Image, Pressable } from 'react-native'



import OneShot from './OneShot';
import MusicGameView from './MusicGameView';


import { Audio } from 'expo-av';

export default function MusicRoomView({ styles }) {

const [ sfx1, setSfx1 ] = useState();
const [ sfx2, setSfx2 ] = useState();

const [isMusicGameOpen, setIsMusicGameOpen] = useState(false);


const handleMusicGameOpen = () => {
  console.log("opening music room game");

  if (isMusicGameOpen === false) {
    setIsMusicGameOpen(true);
  } else if (isMusicGameOpen === true) {
    setSockGameOpen(false);
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

<ImageBackground source = {require('./assets/Music_room_inside.png')}
        style={styles.fullWidthBackground}>


    <Pressable onPress={() => handleMusicGameOpen()}>
        <Image source={require('./assets/Bedroom/BedroomGraphics/RobotNotanimated.png')}
        style={{
          height: 250,
          width: 200,
          top: 500,
          left: 100
        }}/>
    </Pressable>
            


    {isMusicGameOpen && (
      <MusicGameView 
      styles={styles}    
      />
      )}

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

