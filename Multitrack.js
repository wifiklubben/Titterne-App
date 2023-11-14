import React from 'react';
import { ImageBackground, View } from 'react-native'

import Slider from '@react-native-community/slider';



function Multitrack( {styles, volume, handleVolumeChange} ) {

  return (
    <ImageBackground 
    source={require('./assets/MusicRoom/KeyboardAssets/SliderGroove.png')}
    style={{
    }}
    >
        <Slider 
            style={styles.musicSlider} 
            minimumValue={0}
            maximumValue={1}
            step={0.2}
            tapToSeek={true}
            value={volume}
            onValueChange={handleVolumeChange}
            minimumTrackTintColor="#fff"
            maximumTrackTintColor="#000"
            />
    </ImageBackground>
  )}

export default Multitrack