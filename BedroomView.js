import React, { useEffect, useState } from "react";
import { View, ImageBackground, Image, FlatList, Pressable, Animated, Text } from "react-native";

import { Audio } from "expo-av";

import SockGameView from "./SockGameView";
import BookView from "./BookView";




export default function BedroomView({ styles }) {

    

// * story book logic

//  todo switch media to new files

//  todo reduce functionality in book to single image/animation read through

//  todo add play pause button



const storyTitles = [

  {
      title: 'Hjælp Til Nattero',
      tag: 'Natero',
      thumbnail: require('./assets/StoryContents/Thumbnails/ChickenFightThumbnail.png'),
      storyText: 'Her er en historie om en lille kylling',
      storyAudio:require('./assets/StoryContents/Speeches/Hjælp_til_nattero.mp3'),
      storyPicture:  require('./assets/StoryContents/Pictures/ChickenFight9.png'),
  },


  {
      title: 'Cinderella',
      tag: 'cinderella',
      thumbnail: require('./assets/StoryContents/Thumbnails/CinderellaThumbnail.png'),
      storyText: 'Her er en historie om en lille Cinderella',
      storyAudio:require('./assets/StoryContents/Speeches/Hjælp_til_nattero.mp3'),
      storyPicture:  require('./assets/StoryContents/Pictures/ChickenFight9.png'),
  },

  {
      title: 'Romeo & Juliet',
      tag: 'romeoJuliet',
      thumbnail: require('./assets/StoryContents/Thumbnails/RomeoJulietThumbnail.png'),
      storyText: 'Her er en historie om en lille Romeo Juliet',
      storyAudio:require('./assets/StoryContents/Speeches/Hjælp_til_nattero.mp3'),
      storyPicture:  require('./assets/StoryContents/Pictures/ChickenFight9.png'),
  }
];

    const [isBookOpen, setIsBookOpen] = useState(false);
    const [currentSpeeches, setCurrentSpeeches] = useState([])
    const [currentStory, setCurrentStory] = useState(
  {
      title: '',
      tag: '',
      thumbnail: '',
      storyText: '',
      storyAudio: '',
      storyPicture: '',
  }
);

const renderStoryContents = () => {

          return(
              <View
           
              style={{
                  justifyContent: 'center',
                  alignItems: 'center'
              }}>
                  <Image source={ currentStory.storyPicture } style={{
                      width: '50%',
                      height: '50%',
                      marginBottom: 10
                  }}/>
                  <Text style={styles.pText}>{currentStory.storyText}</Text>

              </View>
                  );    
                };
        
  // load speech sounds


  useEffect(() => {
      if (currentStory.storyAudio) {
        console.log("loading current story audio");
          loadSpeechSounds(currentStory.storyAudio)
      } else {
        console.log("not loading current story audio");
      }
  }, [currentStory])


  const loadSpeechSounds = async (storyAudio) => {
          try {
              const { sound } = await Audio.Sound.createAsync(storyAudio)
              setCurrentSpeeches(sound)
          } catch (error) {
              console.log("error loading current story audio ", error);
      }

      console.log("current story loaded");
  };

  useEffect(() => {
    async function playSpeech() {
  
            currentSpeeches.playAsync();
  
       
    } playSpeech()
  }, [currentSpeeches])




async function  handleBookClose() {

  setIsBookOpen(false),
  setCurrentStory({
        title: '',
        tag: '',
        thumbnail: '',
        storyText: '',
        storyAudio: '',
        storyPicture: '',
    
  }),
  setCurrentSpeeches('')
};

async function handleStoryClose() {

    // todo remove current story and make sure audio stops (unload the audio as audio persists and there are two playing when you choose a different story)

        setCurrentStory({
            title: '',
            tag: '',
            thumbnail: '',
            storyText: '',
            storyAudio: '',
            storyPicture: '',
        
      }),
      setCurrentSpeeches('')
    };
    


  //* sock game logic
  const [sockGameOpen, setSockGameOpen] = useState(false);
  console.log(sockGameOpen);

  const handleGameOpen = () => {
    console.log("handling game open");

    if (sockGameOpen === false) {
      setSockGameOpen(true);
    } else if (sockGameOpen === true) {
      setSockGameOpen(false);
    }
    console.log(sockGameOpen);
  };

  return (
    <ImageBackground source={require("./assets/Bedroom_inside.png")} style={styles.fullWidthBackground}>

      {/* sock game component */}

      {sockGameOpen === false && (
        <ImageBackground
          source={require("./assets/ThordenSockPile.png")}
          style={{
            height: 250,
            width: 150,
            top: 355,
            left: 550,
            overflow: "visible",
          }}
        />
      )}

      {sockGameOpen === false && (
        <Pressable
          onPress={() => handleGameOpen()}
          style={{
            position: "absolute",
            width: 150,
            height: 250,
            top: 355,
            left: 550,
          }}
        />
      )}

      {sockGameOpen === true && <SockGameView styles={styles} handleGameOpen={handleGameOpen} />}

      {/* story book component */}

      {sockGameOpen || isBookOpen === false && ( 

      <Pressable onPress={() => setIsBookOpen(true)}>
          <Image source={require('./assets/graphics/books.png')}
          style={{
              position: 'absolute',
              right: 620,
              top: 180,
              width: '15%',
              resizeMode: 'contain',
              shadowColor: 'white',
              shadowOpacity: 1,
              shadowRadius: 3,
          }}
          />
      </Pressable>)
      }

      {isBookOpen && (
      <BookView 
    //   todo remove unnecessary props
      currentStory={currentStory}
      setCurrentStory={setCurrentStory}
      storyTitles={storyTitles}
      styles={styles}
      renderStoryContents={renderStoryContents}
      handleBookClose={handleBookClose}
      handleStoryClose={handleStoryClose}
      />)}
      


    </ImageBackground>
  );
}
