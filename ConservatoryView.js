
import React, {useEffect, useState} from 'react'
import { View, ImageBackground, Image, FlatList, Pressable, Animated, Text } from 'react-native';

import { Audio } from 'expo-av'

import PlanterView from './PlanterView';


function ConservatoryView( styles ) {



  return (
    
    <ImageBackground
    source={require('./assets/Conservatory_inside.jpg')}
    style={{
        width: '100%',
        height: '100%'
    }}>

    <PlanterView></PlanterView>
   

    </ImageBackground>
  )
}

export default ConservatoryView