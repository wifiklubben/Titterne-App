import React, { useEffect, useRef, useState } from 'react';
import { View, ImageBackground, Animated, Image } from 'react-native';

export default function HomeView({ styles, isLoaded, children, setShowIntroAnimation, showIntroAnimation }) {




  const animatedScaleValue = useRef(new Animated.Value(0)).current;
  const animatedOpacityValue = useRef(new Animated.Value(0)).current;
  const animatedTitleValue = useRef(new Animated.Value(0)).current
  // const animatedDropValue = useRef(new Animated.Value(-550)).current; title animation abandoned

  const cloud1Anim = useRef(new Animated.Value(1200)).current;
  const cloud2Anim = useRef(new Animated.Value(1300)).current;


  useEffect(() => {

    console.log("isloaded is,", isLoaded);

    if (isLoaded && showIntroAnimation) {

      console.log('showIntroAnimation ');

      const scaleAnimation = Animated.timing(animatedScaleValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      });

      const opacityAnimation = Animated.timing(animatedOpacityValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      });

      const titleAnimation = Animated.timing(animatedTitleValue, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      })


console.log('starting intro animation');
      Animated.sequence([
          scaleAnimation,
          titleAnimation,
        Animated.delay(350),
        opacityAnimation,
        Animated.delay(550),
      ]).start(() => {
        setShowIntroAnimation(false);
        console.log('setShowIntroAnimation(false)');
      });

    } else {

        if (isLoaded && !showIntroAnimation){ 
            console.log('showMainAnimation ');
            Animated.loop(
              Animated.timing(cloud1Anim, {
                toValue: -500, 
                duration: 15000, 
                useNativeDriver: true,
              }),
              {
                iterations: -1, 
              }
            ).start();
        
            Animated.loop(
                Animated.timing(cloud2Anim, {
                  toValue: -500,
                  duration: 20000,
                  useNativeDriver: true,
                }),
                {
                  iterations: -1,
                }
              ).start();
            }
   
    }
  }, [ isLoaded, showIntroAnimation ]);

  const animatedTitle = {
    opacity: animatedTitleValue.interpolate({
        inputRange: [0,1],
        outputRange: [1,0],
    })
  }

  const animatedHouse = {
    transform: [
        {
          scaleX: animatedScaleValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.85, 1],
          }),
        },
        {
          scaleY: animatedScaleValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.85, 1],
          }),
        },
        {
          translateX: animatedScaleValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.65 , 1],
          }),
        },
      ],
}

const animatedTrees = {
    transform: [
        {
          scaleX: animatedScaleValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.85, 1],
          }),
        },
        {
          scaleY: animatedScaleValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.85, 1],
          }),
        },
        {
          translateX: animatedScaleValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.65 , 1],
          }),
        },
      ],
}

const animatedWindow = {
    opacity: animatedOpacityValue
};

    


    return (
       !showIntroAnimation ? (
        // Main view 
         <View>
            <ImageBackground source = {require('./assets/sky.png')}
                style={styles.backgroundImage}>

                    <Animated.Image 
                        source={require('./assets/cloud_1.png')}
                        style={{
                            overflow: 'visible',
                            position: 'absolute',
                            height: '25%',
                            width: '25%',
                            transform: [
                                {
                                    translateX: cloud1Anim,
                                }
                            ]
                        }}/>


                    <Animated.Image 
                        source={require('./assets/cloud_2.png')}
                        style={{
                            position: 'absolute',
                            overflow: 'visible',
                            top: 15,
                            height: '35%',
                            width: '35%',
                            transform: [
                                {
                                    translateX: cloud2Anim,
                                }
                            ]
                        }}/>

                    <Image source = {require('./assets/Bg_trees.png')}
                        style = {{
                            position: 'absolute',
                            bottom: 0,
                            left: 0 ,
                            width: '100%',
                            height: '100%',                       
                        }} 
                    />

                    <Image source = {require('./assets/House_open_music_room.png')}
                        style = {{
                            position: 'absolute',
                            bottom: 0,
                            left: 0 ,
                            width: '100%',
                            height: '100%',                   
                        }} 
                    />

                    <Image source = {require('./assets/forground.png')}
                        style ={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                    }}/>
                  
            <View>{children}</View>                     

            </ImageBackground>       
        </View> 
) : (
    // Intro VIew
    <View>
 
    <ImageBackground source = {require('./assets/sky.png')}

        style={styles.backgroundImage}>

            <Animated.Image source = {require('./assets/Bg_trees.png')}
                style = {[{
                    position: 'absolute',
                    bottom: 0,
                    left: 0 ,
                    width: '100%',
                    height: '100%',                       
                }, animatedTrees]} 
            />

            <Animated.Image source = {require('./assets/House.png')}
                style = {[{
                    position: 'absolute',
                    bottom: 0,
                    left: 0 ,
                    width: '100%',
                    height: '100%',                       
                }, animatedHouse]} 
            />

            <Animated.Image source = {require('./assets/House_open_music_room.png')}
                style = {[{
                    position: 'absolute',
                    bottom: 0,
                    left: 0 ,
                    width: '100%',
                    height: '100%',  
                    opacity: 0,                   
                }, animatedWindow]} 
            />


            <Animated.Image source = {require('./assets/TitterneLogo.png')}
                style={[{
                    position: 'absolute',
                    width: '30%',
                    height: '30%',
                    left: '35%',
                    top: '20%',
                    overflow: 'visible',
                }, animatedTitle ]}
                />


            <Image source = {require('./assets/forground.png')}
                style ={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
            }}/>


    </ImageBackground>       
</View> 
)


);
                       ;
}  

