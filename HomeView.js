import React, { useEffect, useRef, useState } from 'react';
import { View, ImageBackground, Animated, Image } from 'react-native';

export default function HomeView({ styles, isLoaded, children, setShowIntroAnimation, showIntroAnimation }) {




  const animatedScaleValue = useRef(new Animated.Value(0)).current;
  const animatedOpacityValue = useRef(new Animated.Value(0)).current;
  const animatedTitleInValue = useRef(new Animated.Value(0)).current;



  const cloud1Anim = useRef(new Animated.Value(1200)).current;
  const cloud2Anim = useRef(new Animated.Value(1300)).current;


  useEffect(() => {


    if (isLoaded && showIntroAnimation) {

      const scaleAnimation = Animated.timing(animatedScaleValue, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true,

      });

      const opacityAnimation = Animated.timing(animatedOpacityValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,

      });

      const titleAnimationIn = Animated.timing(animatedTitleInValue, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })


      Animated.sequence([
        Animated.parallel([
          titleAnimationIn,
          scaleAnimation,
        ]),
          Animated.delay(350),
        opacityAnimation,
      ]).start(() => {
        setShowIntroAnimation(false);

      });

    } else {

        if (isLoaded && !showIntroAnimation){ 

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

  const animatedTitleIn = {
    opacity: animatedTitleInValue.interpolate({
        inputRange: [0, 0.1, 0.8,  1],
        outputRange: [0, 1, 1, 0],
    })
  }


  const animatedHouse = {
    transform: [
        {
          scaleX: animatedScaleValue.interpolate({
            inputRange: [0, 0.1, 1],
            outputRange: [0.85, 0.85, 1],
          }),
        },
        {
          scaleY: animatedScaleValue.interpolate({
            inputRange: [0, 0.1, 1],
            outputRange: [0.85, 0.85, 1],
          }),
        },
        {
          translateY: animatedScaleValue.interpolate({
            inputRange: [0, 1],
            outputRange: [35, 0],
          }),
        },
       
      ],
}

const animatedCloud1 = {
  transform: [{
    translateX: animatedScaleValue.interpolate({
      inputRange: [0, 0.2,  1],
      outputRange: [0, 0, 1500],
    }),
  }]
}
const animatedCloud2 = {
  transform: [{
    translateX: animatedScaleValue.interpolate({
      inputRange: [0, 0.2, 1],
      outputRange: [0,0, -1500],
    }),
  }]
}

const animatedForeGround = {
  transform: [{
    scaleY: animatedScaleValue.interpolate({
      inputRange: [0 , 1],
      outputRange: [0.9, 1],
    })
  }]
}

const animatedTrees = {
    transform: [
        {
          scaleX: animatedScaleValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.45, 1],
          }),
        },
        {
          scaleY: animatedScaleValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.45, 1],
          }),
        },
        {
          translateY: animatedScaleValue.interpolate({
            inputRange: [0, 1],
            outputRange: [85, 0],
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
    // Intro Animation
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

            <Animated.Image 
                source={require('./assets/cloud_2.png')}
                style={[{
                    position: 'absolute',
                    overflow: 'visible',
                    height: '100%',
                    width: '100%',
                    
                }, animatedCloud1]}/>

            <Animated.Image 
                source={require('./assets/cloud_1.png')}
                style={[{
                    position: 'absolute',
                    overflow: 'visible',
                    top: -200,
                    height: '100%',
                    width: '100%',
                }, animatedCloud2]}
                />

            <Animated.Image source = {require('./assets/TitterneLogo.png')}
                style={[{
                    position: 'absolute',
                    width: '50%',
                    height: '50%',
                    left: '25%',
                    top: '20%',
                    overflow: 'visible',
                },  animatedTitleIn ]}
                />


            <Animated.Image source = {require('./assets/forground.png')}
                style ={[{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
            }, animatedForeGround]}/>

    </ImageBackground>       
</View> 
)


);
                       ;
}  

