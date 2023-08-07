import React, {useState}from 'react';
import { View, Pressable, Image } from 'react-native'



function OneShot({soundToPlay, children }) {

  const [playingRightNow, setPlayingRightNow] = useState(null)
    
    async function playSound() {
      console.log("playSound()");

    try {
      if (playingRightNow !== null) {
      console.log("stopping, starting");
        soundToPlay.stopAsync();
        soundToPlay.playAsync();
      }
        
        const { sound } = await soundToPlay.playAsync();
        setPlayingRightNow(sound);

    } catch (error) {

        console.log("error in playing SFX: ",error);
    }
    
}
  return (
    <>
        <Pressable onPress={playSound} >
        { children }
        </Pressable>
    </>
  )
}

export default OneShot