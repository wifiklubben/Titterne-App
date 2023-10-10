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
      tag: 'natero',
      thumbnail: require('./assets/StoryContents/Thumbnails/ChickenFightThumbnail.png'),
      storyAudio:require('./assets/StoryContents/Speeches/Hjælp_til_nattero.mp3'),
  },
  {
      title: 'Magisk Have',
      tag: 'magiskHave',
      thumbnail: require('./assets/StoryContents/Thumbnails/CinderellaThumbnail.png'),
      storyAudio:require('./assets/StoryContents/Speeches/Magisk_have_2.mp3'),
  },
  {
      title: 'Natur',
      tag: 'natur',
      thumbnail: require('./assets/StoryContents/Thumbnails/RomeoJulietThumbnail.png'),
      storyAudio:require('./assets/StoryContents/Speeches/Natur.mp3'),
  },
  {
      title: 'Skattejagt',
      tag: 'skattejagt',
      thumbnail: require('./assets/StoryContents/Thumbnails/RomeoJulietThumbnail.png'),
      storyAudio:require('./assets/StoryContents/Speeches/Skattejagt.mp3'),
   
  },
  {
      title: 'Tuba',
      tag: 'tuba',
      thumbnail: require('./assets/StoryContents/Thumbnails/RomeoJulietThumbnail.png'),
      storyAudio:require('./assets/StoryContents/Speeches/Tuba_2.mp3'),
  },

];

    const [isBookOpen, setIsBookOpen] = useState(false);
    const [currentSpeeches, setCurrentSpeech] = useState()
    const [currentStory, setCurrentStory] = useState(
  {
      title: '',
      tag: '',
      thumbnail: '',
      storyAudio: '',
  }
);


const renderStoryContents = () => {

    return(
        <View
        style={{
          width: '100%',
            top: 200,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
          
            <Text style={styles.pText}>{currentStory.title}</Text>

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

              setCurrentSpeech(sound)
          } catch (error) {
              console.log("error loading current story audio ", error);
      }
      console.log("current story loaded");
  };

//  unload speech sounds on unmount

useEffect(() =>{
  if(currentSpeeches) {
    return () => {
      if (currentSpeeches) {
        currentSpeeches.unloadAsync();
      }
    }
  }
}, [currentSpeeches])


  // play Speech Sounds

  useEffect(() => {
    console.log("trying to play");
    if(currentSpeeches) {
      async function playSpeech() {
        await currentSpeeches.playAsync();
      } playSpeech()
    }
    }, [currentSpeeches])



    // Close book modal

async function  handleBookClose() {
  currentSpeeches.stopAsync();
  setIsBookOpen(false),
  setCurrentStory({
        title: '',
        tag: '',
        thumbnail: '',
        storyAudio: '',
  }),
  setCurrentSpeech('')
};

// Deselect story, back to contents page

async function handleStoryClose() {
console.log("story closing");
    // todo remove current story and make sure audio stops (unload the audio as audio persists and there are two playing when you choose a different story)
  currentSpeeches.stopAsync();
        setCurrentStory({
            title: '',
            tag: '',
            thumbnail: '',
            storyAudio: '',
      }),
      console.log("unloading sound");
    };
    


  //* sock game logic
  const [sockGameOpen, setSockGameOpen] = useState(false);

  const handleGameOpen = () => {
    console.log("handling game open");

    if (sockGameOpen === false) {
      setSockGameOpen(true);
    } else if (sockGameOpen === true) {
      setSockGameOpen(false);
    }
  };


  console.log("sock Game Open? ", sockGameOpen);
  console.log("is book Open? ", isBookOpen);

  return (
    // <ImageBackground source={require("./assets/Bedroom/Titterne_bedroom_placement.png")} style={styles.fullWidthBackground}>
      <ImageBackground source={require("./assets/Bedroom/bedroomBG.png")} style={styles.fullWidthBackground}>

    
    {/* bed frame graphics */}

    {sockGameOpen === false && (

      <Image source={require('./assets/Bedroom/bedEndOverlay.png')} style={{
        height: '100%',
        width: '100%',
        zIndex: 3,
      }}/>
      )}

    {/* bedroom toys */}

    <Animated.Image source={require('./assets/Bedroom/BedroomGraphics/RobotNotanimated.png')}
    style={{
      position: 'absolute',
      height: 250,
      width: 200,
      top: 510,
      left: 800,
      zIndex: 4,
    }}/>

    
    
    {/* Sock buttons */}

      {/* sock button red */}

      {sockGameOpen === false && (
        <ImageBackground
          source={require("./assets/graphics/socks/sockRed.png")}
          style={{
            position: 'absolute',
            resizeMode: "contain",
            width: 100,
            height: 100,
            top: 690,
            left: 65,
            zIndex: 4,
            transform: [{scaleX: -1
            }]
          }}
        />
      )}

      {sockGameOpen === false && (
        <Pressable
          onPress={() => handleGameOpen()}
          style={{
            position: 'absolute',
            resizeMode: "contain",
            width: 100,
            height: 100,
            top: 690,
            left: 65,
            zIndex: 4,
          }}
        />
      )}


      {/* sock button pink */}

      {sockGameOpen === false && (
        <ImageBackground
          source={require("./assets/graphics/socks/sockPink.png")}
          style={{
            position: 'absolute',
            resizeMode: "contain",
            width: 110,
            height: 110,
            top: 675,
            left: 435,
            zIndex: 4,
            transform: [{
              rotate: '40deg'
            },{scaleX: -1
            }]
          }}
        />
      )}

      {sockGameOpen === false && (
        <Pressable
          onPress={() => handleGameOpen()}
          style={{
            position: 'absolute',
            resizeMode: "contain",
            width: 110,
            height: 110,
            top: 675,
            left: 435,
            zIndex: 4,
          }}
        />
      )}

      {/* sock button yellow */}

      {sockGameOpen === false && (
        <ImageBackground
          source={require("./assets/graphics/socks/sockYellow.png")}
          style={{
            position: 'absolute',
            resizeMode: "contain",
            width: 110,
            height: 110,
            top: 470,
            left: 665,
            zIndex: 4,
          }}
        />
      )}

      {sockGameOpen === false && (
        <Pressable
          onPress={() => handleGameOpen()}
          style={{
            position: 'absolute',
            resizeMode: "contain",
            width: 110,
            height: 110,
            top: 470,
            left: 665,
            zIndex: 4,
          }}
        />
      )}


      {/* sock button green */}

      {sockGameOpen === false && (
        <ImageBackground
          source={require("./assets/graphics/socks/sockGreen.png")}
          style={{
            position: 'absolute',
            resizeMode: "contain",
            width: 115,
            height: 115,
            top: 675,
            left: 695,
            zIndex: 4,
          }}
        />
      )}

      {sockGameOpen === false && (
        <Pressable
          onPress={() => handleGameOpen()}
          style={{
            position: 'absolute',
            resizeMode: "contain",
            width: 115,
            height: 115,
            top: 675,
            left: 695,
            zIndex: 4,
          }}
        />
      )}

      {sockGameOpen === true && <SockGameView styles={styles} handleGameOpen={handleGameOpen} 
      style={{
        zIndex: 50
      }}/>}

      {/* story book component */}

      {isBookOpen === false && ( 

      <Pressable onPress={() => setIsBookOpen(true)}
      style={{
        position: 'absolute',
        resizeMode: "contain",
        height: 220,
        left: 200,
        top: 450,
        zIndex: 5,
      }}>
          <Image source={require('./assets/Bedroom/books.png')}
          style={{
              position: 'absolute',
              resizeMode: "contain",
              height: 220,
              left: 200,
              top: 450,
              zIndex: 5,
          }}
          />
      </Pressable>)}

      {isBookOpen === true && (
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
