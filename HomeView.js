import React, {useEffect, useRef} from 'react';
import { View, ImageBackground, Image, Animated } from 'react-native';



export default function HomeView({styles, children}) {

    const cloud1Anim = useRef(new Animated.Value(1200)).current;
    const cloud2Anim = useRef(new Animated.Value(1300)).current;

    useEffect(() => {
       
        Animated.loop(
          Animated.timing(cloud1Anim, {
            toValue: -500, 
            duration: 15000, 
            useNativeDriver: false,
          }),
          {
            iterations: -1, 
          }
        ).start();

        Animated.loop(
            Animated.timing(cloud2Anim, {
              toValue: -500,
              duration: 20000,
              useNativeDriver: false,
            }),
            {
              iterations: -1,
            }
          ).start();
        }, [cloud1Anim, cloud2Anim]);


    return (
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

                    <Image source = {require('./assets/House_open_window.png')}
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


    );
}  

