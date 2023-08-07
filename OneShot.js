import React, {useState, useRef}from 'react';
import { View, Pressable, Image, Animated } from 'react-native'



function OneShot({soundToPlay, children }) {


const animatedValue = useRef(new Animated.Value(0)).current;

  // animations

  function wiggleAnimation() {
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
  
  const interpolatedTranslateX = animatedValue.interpolate({
    inputRange: [-10,-5, 0, 5, 10],
    outputRange: [-5, 5, -5, 5, -5],
  })

  const interpolatedRotation = animatedValue.interpolate({
    inputRange: [-10,-5, 0, 5, 10],
    outputRange: ["-10deg", "10deg", "0deg", "-10deg", "10deg"],
  })

  const [playingRightNow, setPlayingRightNow] = useState(null)
    
    async function playSound() {
      console.log("playSound()");

    try {
      if (playingRightNow !== null) {
        console.log("stopping, starting");

        soundToPlay.stopAsync();
        soundToPlay.playAsync();
      }

      wiggleAnimation();
        const { sound } = await soundToPlay.playAsync();
        setPlayingRightNow(sound);

    } catch (error) {

        console.log("error in playing SFX: ",error);
    }
    
}
  return (
    <>
        <Pressable onPress={playSound}>
          <Animated.View
              style={{
                transform: [
                  { translateX: interpolatedTranslateX},
                  {rotate: interpolatedRotation}
                ],
                }} >

              { children }
              
          </Animated.View>
        </Pressable>
    </>
  )
}

export default OneShot