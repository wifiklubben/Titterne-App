import React from 'react'
import { View, ImageBackground } from 'react-native'



export default function MusicRoomView({styles, children}) {

  return (
    <ImageBackground source = {require('./assets/Music_room_icon.png')}
        style={styles.fullWidthBackground}>
            
        <View>{children}</View>
            
    </ImageBackground>

  )
}

