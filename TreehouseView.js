import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text, Image, Pressable } from 'react-native';

import { Audio } from 'expo-av'

import BookView from './BookView'



function TreehouseView( {styles}) {

    const storyTitles = [
        {
            title: 'Kyllinger er modige',
            tag: 'chickenFight',
            thumbnail: require('./assets/StoryContents/Thumbnails/ChickenFightThumbnail.png'),

            verses: 
            [
                'Her er en historie om en lille kylling,',
                'og en bedstemor.',
                'Den lille kylling er bange for bedstemoderen!',
                'For bedstemoderen ser sulten ud!',
                'Virkelig sulten!',
                'Men kyllinger er modige,',
                'det er forkert at slås, og',
                'bedstemor er stærk,',
                'Men kyllinger er MODIGE!’',
            ],

            speeches:
            [
                require('./assets/StoryContents/Speeches/ChickenFightSpeech1.mp3'),
                require('./assets/StoryContents/Speeches/ChickenFightSpeech2.mp3'),
                require('./assets/StoryContents/Speeches/ChickenFightSpeech3.mp3'),
                require('./assets/StoryContents/Speeches/ChickenFightSpeech4.mp3'),
                require('./assets/StoryContents/Speeches/ChickenFightSpeech5.mp3'),
                require('./assets/StoryContents/Speeches/ChickenFightSpeech6.mp3'),
                require('./assets/StoryContents/Speeches/ChickenFightSpeech7.mp3'),
                require('./assets/StoryContents/Speeches/ChickenFightSpeech8.mp3'),
                require('./assets/StoryContents/Speeches/ChickenFightSpeech9.mp3')

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
                'Askepot blev ikke behandlet ordenligt!',
                'Hendes bedstemor synes hun skulle forkæles!',
                'Hun fik en helt ny hestevogn og en ny kjole',
                'Prinsen sagde "hej", men hun blev bange og løb væk!',
                'Han tog ud for at finde hende for han havde hendes sko',
                'Hun savnede sin sko så hun giftede sig straks med ham'
            ],

            speeches: [
                require('./assets/StoryContents/Speeches/AskepotSpeech1.mp3'),
                require('./assets/StoryContents/Speeches/AskepotSpeech2.mp3'),
                require('./assets/StoryContents/Speeches/AskepotSpeech3.mp3'),
                require('./assets/StoryContents/Speeches/AskepotSpeech4.mp3'),
                require('./assets/StoryContents/Speeches/AskepotSpeech5.mp3'),
                require('./assets/StoryContents/Speeches/AskepotSpeech6.mp3'),
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
                "This one's a little ambitious for us maybe >>>>",
            ],
            speeches: [
                require('./assets/StoryContents/Speeches/RomeoJulietSpeech1.mp3'),
            ],
            pictures: [
                require('./assets/StoryContents/Pictures/ShakespeareShrug.jpeg'),
            ]
        },
    ];

    const [isBookOpen, setIsBookOpen] = useState(false);
    const [currentStory, setCurrentStory] = useState(
        {
            title: '',
            tag: '',
            thumbnail: '',
            verses: [],
            speeches: [],
            pictures: [],
        }
    );
    const [currentPage, setCurrentPage] = useState(0);
    const [currentSpeechIndex, setCurrentSpeechIndex] = useState(0);
    const [currentSpeeches, setCurrentSpeeches] = useState([])

   
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

                    <Pressable onPress={() => handleStoryClose()}
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

        // load speech sounds

        useEffect(() => {
            if (currentStory.speeches.length > 0) {
                setCurrentSpeechIndex(0)
                loadSpeechSounds(currentStory.speeches)
            }
        }, [currentStory])

        const loadSpeechSounds = async (speeches) => {
            const loadedSounds = [];
            for (const speech of speeches) {
                try {
                    const { sound } = await Audio.Sound.createAsync(speech)
                    loadedSounds.push(sound);
                } catch (error) {
                    console.log("error loading speech soundsL ", error);
                }
            }

            setCurrentSpeeches(loadedSounds)
            console.log("current speeches loaded");

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

    //catch first page 

    useEffect(() => {
        async function playFirstSpeech() {

                currentSpeeches[0].playAsync();

           
        } playFirstSpeech()
    }, [currentSpeeches])


     function turnPageWithSpeech(pageIndex) {

        try {

            setCurrentPage(pageIndex)

            const nextSpeechIndex = pageIndex;

            
            if (currentSpeeches[nextSpeechIndex]) {
                pageSound.stopAsync();
                pageSound.playAsync();

                if (currentSpeeches[currentSpeechIndex]) {
                    currentSpeeches[currentSpeechIndex].stopAsync();
                }

                currentSpeeches[nextSpeechIndex].playAsync();

                setCurrentSpeechIndex(nextSpeechIndex);

            } else {
                setCurrentSpeechIndex(nextSpeechIndex -1);
            };

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
            speeches: [],
            pictures: []
        }),
        setCurrentSpeechIndex(0)
        setCurrentPage(0)
        setCurrentSpeeches([])
    }

    async function handleStoryClose() {

        setCurrentStory({
            title: '',
            tag: '',
            thumbnail: '',
            verses: [],
            speeches: [],
            pictures: []
        }),
        setCurrentSpeechIndex(0)
        setCurrentPage(0)
        setCurrentSpeeches([])
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
                storyTitles={storyTitles}
                styles={styles}
                renderStoryContents={renderStoryContents}
                handleBookClose={handleBookClose}
                turnPage={turnPageWithSpeech}
                />)}

        </ImageBackground>
    </>
  )
}

export default TreehouseView