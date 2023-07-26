import React, {useEffect, useRef} from 'react';
import { View, ImageBackground, Animated, Image } from 'react-native';



export default function IntroView({ onViewChange, styles }) {

    const animatedScaleValue = useRef(new Animated.Value(0)).current;
    const animatedOpacityValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {

        const scaleAnimation = Animated.timing(animatedScaleValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          });
      

          const opacityAnimation = Animated.timing(animatedOpacityValue, {
            toValue: 1,
            duration: 150,
            useNativeDriver: false,
          });

        Animated.sequence([scaleAnimation, Animated.delay(100), opacityAnimation, Animated.delay(500)]).start(() => {
            onViewChange(1);
        });

    }, [onViewChange]) ;


    const animatedHouse = {
        width: animatedScaleValue.interpolate({
            inputRange: [0,1],
            outputRange: ['85%', '100%'],
        }),

        height: animatedScaleValue.interpolate({
            inputRange: [0,1],
            outputRange: ['85%', '100%'],
        }),

        left: animatedScaleValue.interpolate({
            inputRange: [0,1],
            outputRange: ['6.5%', '0%'],
        })
    }

    const animatedTrees = {
        width: animatedScaleValue.interpolate({
            inputRange: [0,1],
            outputRange: ['95%', '100%'],
        }),

        height: animatedScaleValue.interpolate({
            inputRange: [0,1],
            outputRange: ['95%', '100%'],
        }),

        left: animatedScaleValue.interpolate({
            inputRange: [0,1],
            outputRange: ['2%', '0%'],
        }),
    }

    const animatedWindow = {
        opacity: animatedOpacityValue
    };



    return (
        <View>
            <ImageBackground source = {require('./assets/sky.png')}
            //  <ImageBackground source = {require('./assets/All_gfx_setup.png')}
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

                    <Animated.Image source = {require('./assets/House_open_window.png')}
                        style = {[{
                            position: 'absolute',
                            bottom: 0,
                            left: 0 ,
                            width: '100%',
                            height: '100%',  
                            opacity: 0,                   
                        }, animatedWindow]} 
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
}