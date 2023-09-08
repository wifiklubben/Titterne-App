
import React, {useEffect, useState} from 'react'
import { View, ImageBackground, Image, FlatList, Pressable, Animated, Text } from 'react-native';

import { Audio } from 'expo-av'

import BugGameView from './BugGameView';

function ConservatoryView( styles ) {

const [bugGameOpen, setBugGameOpen] = useState(false)

const handleGameOpen = () => {
    console.log("handle game open")

    if (bugGameOpen === false) {
        setBugGameOpen(true)

    } else if (bugGameOpen === true) {
        setBugGameOpen(false)
    }
    console.log(bugGameOpen)
}

  return (
    
    <ImageBackground
    source={require('./assets/Conservatory_inside.jpg')}
    style={{
        width: '100%',
        height: '100%'
    }}>

    {bugGameOpen === false && 
    <Image source={require('./assets/SkyDancing.png')}
    style={{
        position: 'absolute',
        width: 150,
        height: 250,
        top: 475,
        left: 550,
    }}/>}
    
    {bugGameOpen === false && 
    <Pressable
    onPress={() => handleGameOpen()}
    style={{
        position: 'absolute',
        width: 150,
        height: 250,
        top: 475,
        left: 550,
    }}
    />}

    {bugGameOpen === true && 
    <BugGameView styles={ styles } handleGameOpen={handleGameOpen}/>
    }
        

    </ImageBackground>
  )
}

export default ConservatoryView