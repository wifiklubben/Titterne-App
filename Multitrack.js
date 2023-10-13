import React from 'react';
import { View } from 'react-native'

import Slider from '@react-native-community/slider';



function Multitrack( {styles, volume, handleVolumeChange} ) {

  return (
        <Slider 
            style={styles.musicSlider} 
            minimumValue={0}
            maximumValue={1}
            step={0.2}
            tapToSeek={true}
            value={volume}
            onValueChange={handleVolumeChange}
            minimumTrackTintColor="#fff"
            maximumTrackTintColor="red"
            />
  )}

export default Multitrack