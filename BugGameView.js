import React, {useEffect, useState, useRef, useMemo} from 'react'
import { View, ImageBackground, Image, FlatList, Pressable, Animated, Text } from 'react-native';

import { Audio } from 'expo-av'

// matching bugs stock function
function areBugsMatched(bug1, bug2) {
    console.log("bug1 id: ", bug1.id);
    console.log("bug2 id: ", bug2.id);

    if (bug1.bug.name === bug2.bug.name && bug1.id != bug2.id) {

        return(bug1, bug2)

    } else{}
}

function BugGameView( styles ) {

    const [popSound, setPopSound] = useState()
    const [fartSound, setFartSound] = useState()
    const [yaySound, setYaySound] = useState()

    const [openCards, setOpenCards] = useState([])
    const [clearedCards, setClearedcards] = useState([])

    const [moves, setMoves] = useState(0);




    useEffect(() => {

        async function loadPop() {
            try {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/audio/pop.mp3')
            );
            setPopSound( sound )
            } catch (error) {
                console.log("error loading sound: ", error);
            }
        };
        loadPop()
    }, [])
    
    useEffect(() => {
    
        async function loadFart() {
            try {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/audio/fart.mp3')
            );
            setFartSound( sound )
            } catch (error) {
                console.log("error loading sound: ", error);
            }
        };
        loadFart()
    }, [])
    
    useEffect(() => {
    
        async function loadYay() {
            try {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/audio/yay.mp3')
            );
            setYaySound( sound )
            } catch (error) {
                console.log("error loading sound: ", error);
            }
        };
        loadYay()
    }, [])

    const unqiqueBugsArray = [
        {
            name: 'ant',
            image: require('./assets/graphics/bugs/Ant.png')
        },
        {
            name: 'beetle',
            image: require('./assets/graphics/bugs/Beetle.png')
        },
        {
            name: 'caterpillar',
            image: require('./assets/graphics/bugs/Caterpillar.png')
        },
        {
            name: 'ladybird',
            image: require('./assets/graphics/bugs/Ladybird.png')
        },
        {
            name: 'snail',
            image: require('./assets/graphics/bugs/Snail.png')
        },
        {
            name: 'worm',
            image: require('./assets/graphics/bugs/Worm.png')
        },
    ]

    // play sounds
    
    const playPopSound = () => {
        try {
             popSound.stopAsync();
             popSound.playAsync();
        } catch(error) {
            console.log("PLAYBACK error here is: ", error);
        }
    }
    
    const playFartSound = () => {
        try {
             fartSound.stopAsync();
             fartSound.playAsync();
        } catch(error) {
            console.log("PLAYBACK error here is: ", error);
        }
    }
    
    const playYaySound = () => {
        try {
             yaySound.stopAsync();
             yaySound.playAsync();
        } catch(error) {
            console.log("PLAYBACK error here is: ", error);
        }
    }

    //  animations
    const FlipAnimView = ( {isOpen, children} ) => {
        const flipAnim = useRef(new Animated.Value(0)).current;

        const interpolatedRotation = flipAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '90deg', '180deg'],
          });

        const interpolatedOpacity = flipAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0, 1],
        })
        
        useEffect(() => {
        Animated.timing(flipAnim, {
            toValue: isOpen ? 1 : 0,
            duration: 180,
            useNativeDriver: true,
        }).start();
    }, [flipAnim, isOpen])
;
    console.log("current Rotation: ", interpolatedRotation);

    return (

        <Animated.View style={{
            opacity: interpolatedOpacity,
            transform: [
                {
                  rotateY: interpolatedRotation
                },
              ]}}>
            {children} 
        </Animated.View>
    )
}
    
    //shuffle function

    function shuffleBugs(array) {
        const length = array.length;
        for (let i=length; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * i);
            const currentIndex = i-1;
            const temp = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temp;
        }
        return array
    }

    //picking bugs

    const handleCardClick = async (clickedBug, bugId) => {

        if (openCards.length === 1) {
            setOpenCards((prev) => [...prev, {bug: clickedBug, id: bugId}])
        } else {
            setOpenCards([{ bug: clickedBug, id: bugId}])
        }

    };

    // verifying bugs

    useEffect(() => {
        if(openCards.length === 2) {
            if(areBugsMatched(openCards[0], openCards[1])) {
                setClearedcards(prevClearedCards => [...prevClearedCards, ...openCards])
                playYaySound()
            } else {
                playFartSound()
                const delay = 1000;
            const timeoutId = setTimeout(() => {
 
                setOpenCards([]);
       
            }, delay)
            return() => clearTimeout(timeoutId)
    
            }

        }
    }, [openCards])

    //checking picked bugs for win condition

    useEffect(() => {
        if (clearedCards.length === 12) {
            const delay = 2000;
            const timeoutId = setTimeout(() => {
                //reset
                setClearedcards([]);
                setOpenCards([]);
                shuffleBugs(unqiqueBugsArray)
            }, delay)
            return() => clearTimeout(timeoutId)
        }
    }, [clearedCards])

    // rendering bugs

    const renderItem = ({item, index}) => {
        const image = item.image
        const bugId = index

        const isCardOpen = openCards.some(card => card.id === bugId);
        const isCardCleared = clearedCards.some(card => card.bug.name === item.name)

        return (


            <Pressable onPress={() => [handleCardClick(item, bugId), playPopSound()]}
                style={{
                    opacity: isCardCleared ? 0 : 1,
                    marginVertical: 15,
                    marginHorizontal: -20,
                }}>
                <FlipAnimView isOpen={isCardOpen}>
            
                    {isCardOpen && <Animated.Image
                    data={'name'}
                    source = {image}
                    style={{
                        height: 120,
                        resizeMode: 'contain',
                        opacity: 1,
                        overflow: 'visible',
                    }}
                        /> }

                    {!isCardOpen && <Animated.Image
                    data={'name'}
                    source = {require('./assets/graphics/bugs/QMark.png')}
                    style={{
                        height: 120,
                        resizeMode: 'contain',
                        opacity: 1,
                        overflow: 'visible',
                    }}
                        /> }
                </FlipAnimView>
            </Pressable>
        )
    }


    const [cards, setCards] = useState(
        () => shuffleBugs(unqiqueBugsArray.concat(unqiqueBugsArray))
    );

    


  return (
    <>

<Image source={
        require('./assets/bushBG.png')
    }
    style={{
        position: 'absolute',
        height: '130%',
        width: '120%',
        top: '-15%',
        left: '-10%',
    }}/>

    <View
    justifyContent={'center'}
    alignItems={'center'}
    style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 20,
        width: 800,
        height: 600,
        top: 40,
        left: 150,
        borderRadius: '25%',
    }}>
        <Pressable onPress={() => props.handleGameOpen()}
                        style={{
                            position: 'absolute',
                            right: 20,
                            top: 20,
                            zIndex: 100,
                        }}
                        >
                        <Image source={require('./assets/graphics/closeIcon.png')}
                            style={{
                                width: 80,
                                height: 80,
                                resizeMode: 'contain',
                            }}
                        />  
        </Pressable>

        {clearedCards.length < 12 &&
        <FlatList
            numColumns={4}
            data={cards}
            renderItem={renderItem}
            justifyContent= {'space-around'}
            alignItems = {'center'}
            style = {{
                width: '100%',
                height: "100%",
            }}>
        </FlatList>}

        {clearedCards.length  === 12 &&
        <Text style={styles.h1Text}>You did it!!</Text>}


    </View>

    </>

  )


}
export default BugGameView