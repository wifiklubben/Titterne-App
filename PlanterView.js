import React, {useEffect, useState}  from 'react';
import { View, ImageBackground, Text, Image, Pressable, FlatList, Animated } from 'react-native';

import { Audio } from 'expo-av';

function PlanterView( props ) {

    const [thisRound, setThisRound] = useState(0);
    const [timerInterval, setTimerInterval] = useState(2000);
    const [plantGrowthStage, setPlantGrowthStage] = useState(1);

    const [sunSound, setSunSound] = useState()
    const [waterSound, setWaterSound] = useState()
    const [growSound, setGrowSound] = useState()
    const [winSound, setWinSound] = useState()

    //* load music
    useEffect(() => {

        async function loadSunSfx() {
          try {
            const { sound } = await Audio.Sound.createAsync( require('./assets/audio/sunSound.mp3'));
            setSunSound( sound );
          } catch (error) {
            console.log("error in initial loadSunSfx", error);
          }    
        }

        async function loadWaterSfx() {
          try {
            const { sound } = await Audio.Sound.createAsync( require('./assets/audio/waterDrop.mp3'));
            setWaterSound( sound );
          } catch (error) {
            console.log("error in initialloadWaterSfx", error);
          }    
        }

        async function loadGrowSfx() {
          try {
            const { sound } = await Audio.Sound.createAsync( require('./assets/audio/slideWhistle.mp3'));
            setGrowSound( sound );
          } catch (error) {
            console.log("error in initial loadGrowSfx", error);
          }    
        }

        async function loadWinSfx() {
            try {
                const { sound } = await Audio.Sound.createAsync( require('./assets/audio/yay.mp3'));
                setWinSound( sound );
            } catch (error) {
                console.log("error in initial loadWinSfx" , error);
            }
        }

        loadGrowSfx()
        loadSunSfx()
        loadWaterSfx()
        loadWinSfx()
        }, [])

    //* play music

    async function playWaterSound() {
        try {
            waterSound.replayAsync();
        } catch (error) {
            console.log("error in playing SFX: ",error);
        }
    }

    async function playSunSound() {
        try {
            sunSound.replayAsync();
        } catch (error) {
            console.log("error in playing SFX: ",error);
        }
    }

    async function playGrowSound() {
        try {
            growSound.replayAsync();
        } catch (error) {
            console.log("error inm playing SFX: ", error);
        }
    }

    async function playWinSound() {
        try {
            winSound.replayAsync();
        } catch (error) {
            console.log("error in playWindSound: ", error);
        }
    }


        //* use water and sunlight to help plant grow

        const addWater = () => {
            if (thisRound === 2) {
                plantGrowth()
            }
        }
        
        const addSun = () => {

            if (thisRound === 1) {
                plantGrowth()
            }
        }

    const plantGrowth = () => {
        if (plantGrowthStage <= 5) {
            console.log("not won yet!")
            setPlantGrowthStage(plantGrowthStage + 1)
            setTimerInterval(100)
            playGrowSound();
        }
    }


    useEffect(() => { 
        console.log("plant growth stage: ", plantGrowthStage);
        if (plantGrowthStage === 6) {
            console.log("win condition run");
            setTimerInterval(5000)
            playWinSound();
            setThisRound(0)

            setTimeout(() => {
            setPlantGrowthStage(1);
        }, 5000);
        }
    }, [plantGrowthStage])


    useEffect(() => {
        return () => {
            if (waterSound) {
                waterSound.unloadAsync();
            }
        };
    }, []);
    
    useEffect(() => {
        return () => {
            if (sunSound) {
                sunSound.unloadAsync();
            }
        };
    }, []);

    useEffect(() => {
        return () => {
            if (growSound) {
                growSound.unloadAsync();
            }
        };
    }, []);
    

    useEffect(() => {

        const intervalId = setInterval(() => {

        // randomly chooses either watering can or sun or nothing, can only choose one,
        let randNum = Math.floor(Math.random() * 3 +1)
        setThisRound(randNum)

        }, timerInterval)
        return () => {
            clearInterval(intervalId);
        } 
            }, [timerInterval])


    useEffect(() => {
            // when either can or sun is highlighted, sound also plays
        if (thisRound === 1) {

            playSunSound()
            setTimerInterval(10000)


        } else if (thisRound === 2) {

            playWaterSound()
            setTimerInterval(10000)


        } else if (thisRound === 3) {

            setTimerInterval(2000)
        }

        }, [thisRound])



    // if correct pressable is pressed... plant grows to next stage




    // When plant gets to level 6, big party time, new plant starts

    return (

    <View justifyContent={'center'}
    alignItems={'center'}
    style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 20,
        width: 600,
        height: 700,
        bottom: 10,
        left: 200,
        borderRadius: '25%',
    }}>

        {plantGrowthStage === 6 && (
             <Text style={[props.styles.h1Text, {zIndex: 100}]}>You did it!!</Text>
        )}

        <Pressable onPress={() => props.handleGameOpen()}
            style={{
                position: 'absolute',
                right: 20,
                top: 20,
                zIndex: 100,
            }}>
            <Image source={require('./assets/graphics/closeIcon.png')}
                style={{
                    width: 80,
                    height: 80,
                    resizeMode: 'contain',
                }}/>  
        </Pressable>

        <Pressable onPress={() => addWater()}
            style={{
                position: 'absolute',
                right: 120,
                top: 50,                    
                width: 180,
                height: 180,
            }}>
                  {thisRound === 2 && (
            <Animated.Image
            source={require('./assets/graphics/plants/glowStar.png')}
            style={{
                position: 'absolute',
                left: -55,
                top: -55,
                height: 300,
                width: 300,
                resizeMode: 'contain',
            }}/>
            )}
            <Image source={require('./assets/graphics/plants/waterCan.png')}
                style={{
                    position: 'absolute',
                    height: 180,
                    width: 180,
                    resizeMode: 'contain',
                }}/>  
        </Pressable>

        <Pressable onPress={() => addSun()}
        style={{
            position: 'absolute',
            left: 80,
            top: 50,
            width: 180,
            height: 180,
        }}>
            {thisRound === 1 && (
            <Animated.Image
            source={require('./assets/graphics/plants/glowStar.png')}
            style={{
                position: 'absolute',
                left: -50,
                top: -50,
                height: 250,
                width: 250,
                resizeMode: 'contain',
            }}/>
            )}

            <Image source={require('./assets/graphics/plants/sunShine.png')}
            style={{
                position: 'absolute',
                height: 150,
                width: 150,
                resizeMode: 'contain',
            }} />
        </Pressable>

        {plantGrowthStage === 6 && (
        <Animated.Image
            source={require('./assets/graphics/plants/glowStar.png')}
            style={{
                position: 'absolute',
                height: 500,
                width: 500,
                bottom:80,
                resizeMode: 'contain',
            }}/>
            )}

        <Image source={require('./assets/graphics/plants/flowerpotBack.png')}
        style={{
            position: 'absolute',
            width: 150,
            height: 150,
            bottom: 40,
            resizeMode: 'contain',
        }}/>

        {plantGrowthStage === 1 && (
        <Image source={require('./assets/graphics/plants/Plant1.png')}
        style={{
            position: 'absolute',
            width: 150,
            height: 200,
            bottom: 90,
        }}/>
        )}

        {plantGrowthStage === 2 && (
        <Image source={require('./assets/graphics/plants/Plant2.png')}
        style={{
            position: 'absolute',
            width: 150,
            height: 220,
            bottom: 90,
        }}/>
        )}


        {plantGrowthStage === 3 && (
        <Image source={require('./assets/graphics/plants/Plant3.png')}
        style={{
            position: 'absolute',
            width: 150,
            height: 220,
            bottom: 90,
        }}/>
        )}


        {plantGrowthStage === 4 && (
        <Image source={require('./assets/graphics/plants/Plant4.png')}
        style={{
            position: 'absolute',
            width: 150,
            height: 250,
            bottom: 90,
        }}/>
        )}


        {plantGrowthStage === 5 && (
        <Image source={require('./assets/graphics/plants/Plant5.png')}
        style={{
            position: 'absolute',
            width: 200,
            height: 300,
            bottom: 60,
        }}/>
        )}

        {plantGrowthStage === 6 && (
        <Image source={require('./assets/graphics/plants/Plant6.png')}
        style={{
            position: 'absolute',
            width: 200,
            height: 400,
            bottom: 30,
        }}/>
        )}

<Image source={require('./assets/graphics/plants/flowerpotFront.png')}
        style={{
            position: 'absolute',
            width: 150,
            height: 150,
            bottom: 40,
            resizeMode: 'contain',
        }}/>

    </View>
    )
}

export default PlanterView