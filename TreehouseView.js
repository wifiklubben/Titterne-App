import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text, Image, Pressable } from 'react-native';



import { Audio } from 'expo-av'

import BookView from './BookView'



function TreehouseView( {styles}) {

    const storyTitles = [
        {
            title: 'Chickens are Brave',
            tag: 'chickenFight',
            thumbnail: require('./assets/StoryContents/Thumbnails/ChickenFightThumbnail.png'),
            verses: 
            [
                'This is a story of a chicken,',
                'and a Grandma.',
                'The chicken is scared of Grandma!',
                'Because Grandma looks HUNGRY!',
                'REALLY Hungry.',
                'But chickens are brave,',
                'fighting is wrong, and',
                'Grandma is strong,',
                'But chickens are BRAVE!',
            ],
            pictures: 
            [
                require('./assets/StoryContents/Pictures/ChickenFight1.png'),
                require('./assets/StoryContents/Pictures/ChickenFight2.png'),
                require('./assets/StoryContents/Pictures/ChickenFight3.png'),
                require('./assets/StoryContents/Pictures/ChickenFight4.png'),
                require('./assets/StoryContents/Pictures/ChickenFight5.png'),
                require('./assets/StoryContents/Pictures/ChickenFight6.png'),
                require('./assets/StoryContents/Pictures/ChickenFight7.png'),
                require('./assets/StoryContents/Pictures/ChickenFight8.png'),
                require('./assets/StoryContents/Pictures/ChickenFight9.png'),
            ],
        },

        {
            title: 'Cinderella',
            tag: 'cinderella',
            thumbnail: require('./assets/StoryContents/Thumbnails/CinderellaThumbnail.png'),
            verses: 
            [
                'Cinderlla was not treated nicely!',
                'Her fairy godmother said she needed a treat!',
                'She got a brand new cart and a makeover',
                'The prince said "hello" so she got scared and ran off!',
                'He went looking for her because he had her shoe',
                'Women love shoes so she immediately married him'
            ],
            pictures: [
                require('./assets/StoryContents/Pictures/Cinderella1.png'),
                require('./assets/StoryContents/Pictures/Cinderella2.png'),
                require('./assets/StoryContents/Pictures/Cinderella3.png'),
                require('./assets/StoryContents/Pictures/Cinderella4.png'),
                require('./assets/StoryContents/Pictures/Cinderella5.png'),
                require('./assets/StoryContents/Pictures/Cinderella6.png'),
            ]
        },

        {
            title: 'Romeo & Juliet',
            tag: 'romeoJuliet',
            thumbnail: require('./assets/StoryContents/Thumbnails/RomeoJulietThumbnail.png'),
            verses: 
            [
                "This one's a little ambitious for us maybe...",
            ],
            pictures: [
                require('./assets/StoryContents/Pictures/ShakespeareShrug.jpeg'),
            ]
        },
    ];

    const [isBookOpen, setIsBookOpen] = useState(false);
    const [showContents, setShowContents] = useState(true)
    const [currentStory, setCurrentStory] = useState(
        {
            title: '',
            tag: '',
            thumbnail: '',
            verses: [],
            pictures: []
        }
    );

   
    //render story page
        const renderStoryContents = () => {

            const pages = currentStory.verses.map((verse, index) => {

                return(
                    <View
                    key={index}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={ currentStory.pictures[index] } style={{
                            width: '50%',
                            height: '50%',
                            marginBottom: 10
                        }}/>
                        <Text style={styles.pText}>{verse}</Text>

                    </View>
                        );
                    });

            // add 'the end' to displayed array
            pages.push(
                <View
                key="end"
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    }}>

                    <Pressable onPress={() => setCurrentStory({
                            title: '',
                            tag: '',
                            thumbnail: '',
                            verses: [],
                            pictures: []
                        })}
>
                        <Text style={[styles.h1Text, {
                            textAlign: 'center',
                        }]}>The End!</Text>

                        <Text style={[styles.pText, {
                            textAlign: 'center',
                        }]}>Let's read another?</Text>

                    </Pressable>
                    
                </View>
            )
            return pages
        };



    const [pageSound, setPageSound] = useState();

    useEffect(() => {
        async function loadPageSound() {
            try {
                const { sound } = await Audio.Sound.createAsync(require('./assets/audio/pageTurn.mp3'));
                setPageSound( sound ) 

            } catch (error) {
                console.log("error loading page sound: ", error);
            }
        }
        loadPageSound();
    }, [])



    async function turnPage() {

        try {
            pageSound.stopAsync();
            pageSound.playAsync();
        
        } catch(error) {
            console.log("failed to play page turn sound: ", error);
        }

    }

    async function  handleBookClose() {
        setIsBookOpen(false),
        setCurrentStory({
            title: '',
            tag: '',
            thumbnail: '',
            verses: [],
            pictures: []
        })
    }

  return (
    <>
        <ImageBackground source={require('./assets/TreeHouse_inside.png')}
                style={styles.fullWidthBackground}>

        <Image source={require('./assets/SkyDancing.png')}
                        style={{
                            position: 'absolute',
                            left: 150,
                            top: 350,
                        }}/>

        {isBookOpen === false && ( 

                    <Pressable onPress={() => setIsBookOpen(true)}>
                        <Image source={require('./assets/graphics/books.png')}
                        style={{
                            position: 'absolute',
                            right: 120,
                            top: 245,
                            width: '15%',
                            resizeMode: 'contain',
                            shadowColor: 'white',
                            shadowOpacity: 1,
                            shadowRadius: 3,
                        }}
                        />
                    </Pressable>)
        }

            {isBookOpen &&(
                <BookView 
                currentStory={currentStory}
                setCurrentStory={setCurrentStory}
                showContents={showContents}
                storyTitles={storyTitles}
                styles={styles}
                renderStoryContents={renderStoryContents}
                handleBookClose={handleBookClose}
                turnPage={turnPage}
                />)}

        </ImageBackground>
    </>
  )
}

export default TreehouseView