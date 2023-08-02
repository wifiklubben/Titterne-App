import React from 'react';
import { View, Pressable, Text } from 'react-native'
import {Audio} from 'expo-av';



function OneShot({styles, soundToPlay}) {

    
    async function playSound() {

      console.log("trying to play sound");
      
    try {
        const { sound } =  await Audio.Sound.createAsync(soundToPlay);
        
        await sound.playAsync()

    } catch (error) {

        console.log("error in playing SFX: ",error);
    }
    
}
  return (
    <View>
        <Pressable style={styles.roundButton} onPress={playSound}>
        <Text> Push me </Text>
        </Pressable>
    </View>
  )
}

export default OneShot