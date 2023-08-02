import React from 'react';
import { View, Pressable, Text } from 'react-native'



function OneShot({styles, soundToPlay, children}) {

    
    async function playSound() {

      console.log("trying to play sound: ", soundToPlay);

    try {

        
        await soundToPlay.playAsync()

    } catch (error) {

        console.log("error in playing SFX: ",error);
    }
    
}
  return (
    <>
        <Pressable style={styles.roundButton} onPress={playSound}>
        { children }
        </Pressable>
    </>
  )
}

export default OneShot