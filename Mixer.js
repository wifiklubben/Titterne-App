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
        top: 140,
        left: 50,
        width: '40%',
        overflow: 'visible',
        resizeMode: 'contain'
    }
    }
    />

    <View style={{   
        position: 'absolute',
        top: 280,
        left: 85,
    }}
        >

        <Pressable onPress={props.playMusic} > 


        { !props.musicPlaying && <PlayIcon width={72} height={60}/> }  

        { props.musicPlaying &&  <PauseIcon width={50} height={50} top={7} left={7}/> }   


        </Pressable>

    </View>

    <View style={props.styles.musicButtonContainer}>

    <Multitrack styles={props.styles} volume={props.volume1} handleVolumeChange={props.handleVolumeChange1}
    style={{
        position: 'absolute',
        left: 185,
    }}>

        {/* { props.volume1 === 1 && <Text style={props.styles.h1Text}> Beck is playing! </Text>}
        { props.volume1 !== 1 && <Text style={props.styles.h1Text}> Beck isn't playing!</Text>} */}

    </Multitrack>

    <Multitrack styles={props.styles} volume={props.volume2} handleVolumeChange={props.handleVolumeChange2}>

        {/* { props.volume2 === 1 && <Text style={props.styles.h1Text}> Tom Jobim is playing! </Text>}
        { props.volume2 !== 1 && <Text style={props.styles.h1Text}> Tom Jobim isn't playing!</Text>} */}
        
    </Multitrack>

    <Multitrack styles={props.styles} volume={props.volume3} handleVolumeChange={props.handleVolumeChange3}>

        {/* { props.volume3 === 1 && <Text style={props.styles.h1Text}> Khruangbin is playing! </Text>}
        { props.volume3 !== 1 && <Text style={props.styles.h1Text}> Khruangbin isn't playing!</Text>} */}

    </Multitrack>

    </View>
</>

  )
}

export default Mixer