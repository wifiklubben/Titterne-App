
import React, {useState} from 'react'
import { View, ImageBackground, Text, Image, FlatList } from 'react-native';

export default function BedroomView({ styles }) {

const uniqueSocksArray = [
    {
        color: "red",
        image: require('./assets/graphics/socks/sockRed.png')
    },
    {
        color: "blue",
        image: require('./assets/graphics/socks/sockBlue.png')
    },
    {
        color: 'yellow',
        image: require('./assets/graphics/socks/sockYellow.png')
    },
    {
        color: 'purple',
        image: require('./assets/graphics/socks/sockPurple.png')
    },
    {
        color: 'pink',
        image: require('./assets/graphics/socks/sockPink.png')
    },
    {
        color: 'green',
        image: require('./assets/graphics/socks/sockGreen.png')
    }
]

//shuffle function

function shuffleSocks(array) {
    const length = array.length;
    for (let i = length; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const currentIndex = i-1;
        const temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array
}


    //Rendering socks

const renderItem = ({item}) => {
    const image = item.image
    const text = item.color

    return (
        <View >
        <Image 
            source = {image}
            style={{
                height: 120,
                resizeMode: 'contain',
                opacity: 1,
            }}
            />
            <Text>{text}</Text>
        </View>
        )
    }

    const [cards, setCards] = useState(
        () => shuffleSocks(uniqueSocksArray.concat(uniqueSocksArray))
    );


  return (

<ImageBackground source = {require('./assets/Bedroom_inside.png')}
        style={styles.fullWidthBackground}>

    <View style={{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 20,
        width: 600,
        height: 600,
        top: 40,
        left: 450,
        borderRadius: '25%',
    }}>

        <FlatList
            numColumns={4}
            data={cards}
            renderItem={renderItem}
            justifyContent= {'space-around'}
            alignItems = {'center'}
            style = {{
                width: '100%',
                height: "100%",
                borderColor: 'red',
                borderWidth: 2,
            }}>

        </FlatList>

    </View>


</ImageBackground>
  )

  }