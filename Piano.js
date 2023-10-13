import React, { useEffect, useState } from 'react';

import { StyleSheet, View, ImageBackground, Animated, Image } from 'react-native'

function Piano( props ) {

    const pianoStyles = StyleSheet.create({
        whiteKey: {
            borderWidth: 2,
            borderColor: 'black',
            backgroundColor: 'white',
            height: '100%',
            width: '14%',
        },

        nonKey: {
            width: '8.33%',
            height: '100%',
            pointerEvents: 'none',
        },

        blackKey: {
            width: '8.33%',
            height: '100%',
            backgroundColor: 'black',
        }
    })



    return (
        <View style={{
            borderWidth: 10,
            borderRadius: 20,
            borderColor: 'red',
            left: 200,
            top: 450,
            width: 600,
            height: 250,
        }}>
        {/* white keys */}
        <View
        style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            <View style={pianoStyles.whiteKey}/>
            <View style={pianoStyles.whiteKey}/>
            <View style={pianoStyles.whiteKey}/>
            <View style={pianoStyles.whiteKey}/>
            <View style={pianoStyles.whiteKey}/>
            <View style={pianoStyles.whiteKey}/>
            <View style={pianoStyles.whiteKey}/>
        </View>

        {/* black keys */}
        <View
        style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            height: '50%',
        }}>
            <View style={pianoStyles.nonKey}/>
            <View style={pianoStyles.blackKey}/>
            <View style={pianoStyles.nonKey}/>
            <View style={pianoStyles.blackKey}/>
            <View style={pianoStyles.nonKey}/>
            <View style={pianoStyles.nonKey}/>
            <View style={pianoStyles.blackKey}/>
            <View style={pianoStyles.nonKey}/>
            <View style={pianoStyles.blackKey}/>
            <View style={pianoStyles.nonKey}/>
            <View style={pianoStyles.blackKey}/>
            <View style={pianoStyles.nonKey}/>
        </View>

        
        </View>
    )
}

export default Piano