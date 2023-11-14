
import React, { useState} from 'react'
import { View, ImageBackground, Image, Pressable } from 'react-native';

import { Audio } from 'expo-av'

import PlanterView from './PlanterView';


function ConservatoryView( styles ) {
  
  const [plantGameOpen, setPlantGameOpen] = useState(false);
  const handleGameOpen = () => {
    console.log("handle game open")

    if (plantGameOpen === false) {
        setPlantGameOpen(true)

    } else if (plantGameOpen === true) {
      setPlantGameOpen(false)
    }
    console.log(plantGameOpen)
}

  return (
    

    <>
    <ImageBackground
    source={require('./assets/ConservatoryRoom/Conservatory_Bg.png')}
    style={{
        width: '100%',
        height: '100%'
    }}>

    <Image source={require('./assets/ConservatoryRoom/Conservatory_Placeholder_Sky.png')}
      style={{
        position: 'absolute',
        right: 0,
        top: 130,
        width: 220,
        height: 300,
        resizeMode: 'contain',
        borderWidth: 3,
        borderColor: 'pink'
      }}/>

    <Image source={require('./assets/ConservatoryRoom/Conservatory_Placeholder_Torden.png')}
      style={{
        position: 'absolute',
        left: 15,
        top: 265,
        width: 250,
        height: 300,
        resizeMode: 'contain',
        borderWidth: 3,
        borderColor: 'cyan'
      }}/>


  {!plantGameOpen && (
  <>
  <Pressable
    onPress={() => handleGameOpen()}
    style={{
      position: 'absolute',
      width: 190,
      height: 400,
      left: 450,
      top: 150,
      borderWidth: 3,
      borderColor: 'red',
    }}>
      <Image source={require('./assets/graphics/plants/ConservatoryPlant_06.png')}
      style={{
        height: '105%',
        width: '105%',
        bottom: '5%',
      }}/>
  </Pressable>

  <Image source={require('./assets/ConservatoryRoom/Hose.png')}
  style={{
    position: 'absolute',
    width: 460,
    height: 280,
    bottom: 0,
    left: 120,
    resizeMode: 'contain',
  }}/>

  </>)}

  {plantGameOpen && (<PlanterView handleGameOpen={handleGameOpen} styles={styles}/>)}

    
  <Image
    pointerEvents="none"
    source={require('./assets/ConservatoryRoom/Conservatory_Fg.png')}
    style={{
        width: '100%',
        height: '100%',
    }}/>
    </ImageBackground>

    
  </>
  )
}

export default ConservatoryView