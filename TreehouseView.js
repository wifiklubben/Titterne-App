import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text, Image, Pressable } from 'react-native';

import { Audio } from 'expo-av'


import BugGameView from './BugGameView';



function TreehouseView( {styles}) {

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
    <>
        <ImageBackground source={require('./assets/TreeHouse_inside.png')}
                style={styles.fullWidthBackground}>

    
    {bugGameOpen === false && 
    <Pressable
    onPress={() => handleGameOpen()}
    style={{
        position: 'absolute',
        top: 175,
        left: 150,
    }}>
    <Image source={require('./assets/SkyDancing.png')}
    style={{
        width: 250,
        height: 400,
    }}/>

    </Pressable>}

    {bugGameOpen === true && 
    <BugGameView styles={ styles } handleGameOpen={handleGameOpen}/>
    }
        
        </ImageBackground>
    </>
  )
}

export default TreehouseView