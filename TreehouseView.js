import React, {useEffect, useState} from 'react'
import { View, ImageBackground, Text, Image, Pressable, FlatList } from 'react-native';
import PagerView from 'react-native-pager-view'

import { Audio } from 'expo-av'



function TreehouseView( {styles}) {

    const [isBookOpen, setIsBookOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentStory, setCurrentStory] = useState('contents')

    const storyTitles = [
        {
            title: 'Chicken Fight',
            thumbnail: require('./assets/StoryContents/Thumbnails/ChickenFightThumbnail.png'),
            page1Text: 'This is a story of a chicken'
        },
        {
            title: 'Cinderella',
            thumbnail: require('./assets/icon.png'),
            page1Text: 'Work work work work'
        },
        {
            title: 'Romeo & Juliet',
            thumbnail: require('./assets/StoryContents/Thumbnails/RomeoJulietThumbnail.png'),
            page1Text: 'Romeo, Romeo you idiot Romeo...'
        },
    ];

    const renderItem = ({item}) => {
        const title = item.title
        const thumbnail = item.thumbnail

        return (
            <View style={{

                flexBasis: '40%',
                marginHorizontal: '5%',
                marginVertical: 5,
                justifyContent: 'space-around',
                alignItems: 'center',

            }}>
                <Image source = {thumbnail} style={{
                    height: 150,
                    width: 150,
                }}/>
                <Text style={styles.h2Text}>{title}</Text>
            </View>
        )
    }

    const [pageSound, setPageSound] = useState();

    console.log("isBookOpen: ", isBookOpen);

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
        console.log("page turned!");

        try {
            pageSound.stopAsync();
            pageSound.playAsync();
        
        } catch(error) {
            console.log("failed to play page turn sound: ", error);
        }

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
            </Pressable>)}

    {isBookOpen &&(
        <View style={{
            width: '90%',
            height: '90%',
            position: 'absolute',
            left: '5%',
            top: '5%'
        }}>
            <ImageBackground source={require('./assets/BookOpen.png')}
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                right: 20,
                top: 20,
            }}>

                {/* story not chosen CONTENTS PAGES */}
                {currentStory === 'contents' &&(
                    <PagerView initialPage={0}
                    onPageSelected={() => turnPage() }
                            style={{flex: 1}}>

                        <View key="1" style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                        }}>
                            <FlatList 
                            numColumns={2}
                            data={storyTitles}
                            renderItem={renderItem}
                            style={{
                                paddingVertical: '10%',
                                width: '100%',
                                height: '100%',
                            }}>
                            </FlatList>
                        </View>

                        <View key="2" style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                        }}>
                            <Text>More Stories?</Text>
                        </View>

                        <View key="3" style={{

                                justifyContent: 'center',
                                alignItems: 'center'
                        }}>

                            <Text>Even more Stories here?</Text>

                        </View>

                    </PagerView>) }
                    
     

        </ImageBackground>
        </View>)}
    

</ImageBackground>


</>
  )
}

export default TreehouseView