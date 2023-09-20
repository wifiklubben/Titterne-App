import React, {useEffect, useState}  from 'react';
import { View, ImageBackground, Text, Image, Pressable, FlatList } from 'react-native';

function PlanterView() {


    // use water and sunlight to help plant grow

const addWater = () => {
    if (plantGrowthStage < 6) {
        setPlantGrowthStage(plantGrowthStage + 1)
    } else {
        setPlantGrowthStage(1)
    }
}

    //open the blind?

    // open the tap

const [plantGrowthStage, setPlantGrowthStage] = useState(1)



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
            <Image source={require('./assets/graphics/plants/waterCan.png')}
                style={{
                    height: 180,
                    width: 180,
                    resizeMode: 'contain',
                }}/>  
        </Pressable>


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
            height: 200,
            bottom: 90,
        }}/>
        )}


        {plantGrowthStage === 3 && (
        <Image source={require('./assets/graphics/plants/Plant3.png')}
        style={{
            position: 'absolute',
            width: 150,
            height: 200,
            bottom: 90,
        }}/>
        )}


        {plantGrowthStage === 4 && (
        <Image source={require('./assets/graphics/plants/Plant4.png')}
        style={{
            position: 'absolute',
            width: 150,
            height: 200,
            bottom: 90,
        }}/>
        )}


        {plantGrowthStage === 5 && (
        <Image source={require('./assets/graphics/plants/Plant5.png')}
        style={{
            position: 'absolute',
            width: 150,
            height: 200,
            bottom: 90,
        }}/>
        )}

        {plantGrowthStage === 6 && (
        <Image source={require('./assets/graphics/plants/Plant6.png')}
        style={{
            position: 'absolute',
            width: 150,
            height: 200,
            bottom: 90,
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