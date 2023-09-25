
import React, {useEffect, useState} from 'react'
import { View, ImageBackground, Image, FlatList, Pressable, Animated, Text } from 'react-native';

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
    

    <ImageBackground
    source={require('./assets/Conservatory_inside.jpg')}
    style={{
        width: '100%',
        height: '100%'
    }}>


  {!plantGameOpen && (<Pressable
    onPress={() => handleGameOpen()}
    style={{
      position: 'absolute',
      width: 50,
      height: 50,
      left: 100,
      top: 100,
      resizeMode: 'contain',
    }}>
      <Image source={require('./assets/graphics/plants/Plant1.png')}/>
  </Pressable>)}

  {plantGameOpen && (<PlanterView handleGameOpen={handleGameOpen} styles={styles}/>)}


    </ImageBackground>
  )
}

export default ConservatoryView