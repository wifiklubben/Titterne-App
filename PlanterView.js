import React, {useEffect, useState}  from 'react';
import { View, ImageBackground, Text, Image, Pressable, FlatList } from 'react-native';

function PlanterView() {


    // use water and sunlight to help plant grow

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
        height: 600,
        top: 40,
        left: 250,
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


        <Image source={require('./assets/graphics/plants/Plant6.png')}
        style={{
            width: 150,
            height: 150,
            resizeMode: 'contain',
        }}/>

    </View>
    )
}

export default PlanterView