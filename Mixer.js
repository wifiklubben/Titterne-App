import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Pressable, Text, Image } from 'react-native'

import PlayIcon from './assets/graphics/playIcon.svg';
import PauseIcon from './assets/graphics/pauseIcon.svg';

import Multitrack from './Multitrack';


function Mixer(props) {

  return (
    <>
<Image source={require('./assets/mixer.png')}
    style={{
        position: 'absolute',
        top: 40,
        left: 50,
        width: '40%',
        overflow: 'visible',
        resizeMode: 'contain'
    }
    }
    />

    <View style={{   
        position: 'absolute',
        top: 180,
        left: 85,
    }}
        >

        <Pressable onPress={props.playMusic} > 


        { !props.musicPlaying && <PlayIcon width={72} height={60}/> }  

        { props.musicPlaying &&  <PauseIcon width={50} height={50} top={7} left={7}/> }   


        </Pressable>

    </View>

    <View style={props.styles.musicButtonContainer}>

    <Multitrack styles={props.styles} volume={props.volume1} handleVolumeChange={props.handleVolumeChange1}/>

    <Multitrack styles={props.styles} volume={props.volume2} handleVolumeChange={props.handleVolumeChange2}/>

    <Multitrack styles={props.styles} volume={props.volume3} handleVolumeChange={props.handleVolumeChange3}/>

    <Multitrack styles={props.styles} volume={props.volume4} handleVolumeChange={props.handleVolumeChange4}/>

    <Multitrack styles={props.styles} volume={props.volume5} handleVolumeChange={props.handleVolumeChange5}/>

    <Multitrack styles={props.styles} volume={props.volume6} handleVolumeChange={props.handleVolumeChange6}/>

    <Multitrack styles={props.styles} volume={props.volume7} handleVolumeChange={props.handleVolumeChange7}/>

    <Multitrack styles={props.styles} volume={props.volume8} handleVolumeChange={props.handleVolumeChange8}/>


    </View>
</>

  )
}

export default Mixer