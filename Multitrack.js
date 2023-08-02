import React from 'react';
import { View } from 'react-native'

import Slider from '@react-native-community/slider';



function Multitrack( {styles, volume, handleVolumeChange, children} ) {

  return (

    <View> 

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

        { children } 

  </View>

  )
}

export default Multitrack