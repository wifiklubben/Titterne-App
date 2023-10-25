import React, { useEffect, useState, useRef } from "react";
import { View, ImageBackground, Image, TouchableWithoutFeedback, Pressable, Animated, Text } from "react-native";

import { Audio } from "expo-av";

import SockGameView from "./SockGameView";
import BookView from "./BookView";

import SpriteSheet from 'rn-sprite-sheet';


export default function BedroomView({ styles }) {




  // sprite animations

  // thordenWave 

const  wave = () => {
  console.log("thorden animation triggered");
  this.thorden.play({
    type: "waveSleep",
    fps: 24,
    loops: false,
    resetAfterFinish: true,
  })
}


// * story book logic

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
  if(currentSpeeches) {
    currentSpeeches.stopAsync();
  }
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
        borderWidth: 1,
        borderColor: 'green',
        pointerEvents: 'none',
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


    <Animated.Image source={require('./assets/Bedroom/BedroomGraphics/dragonNotanimated.png')}
    style={{
      position: 'absolute',
      height: 250,
      width: 200,
      top: 440,
      left: 40,
      zIndex: 4,
    }}/>

    <Animated.Image source={require('./assets/Bedroom/BedroomGraphics/dollNotanimated.png')}
    style={{
      position: 'absolute',
      height: 170,
      width: 140,
      top: 455,
      left: 260,
      zIndex: 4,
    }}/>

    <Animated.Image source={require('./assets/Bedroom/BedroomGraphics/carNotanimated.png')}
    style={{
      position: 'absolute',
      height: 120,
      width: 240,
      top: 620,
      left: 200,
      zIndex: 4,
      overflow: 'visible',
    }}/>

    <Animated.Image source={require('./assets/Bedroom/BedroomGraphics/planeNotanimated.png')}
    style={{
      position: 'absolute',
      height: 150,
      width: 160,
      top: 570,
      left: 640,
      zIndex: 4,

    }}/>

    <Animated.Image source={require('./assets/Bedroom/BedroomGraphics/SkyNotanimated.png')}
    style={{
      position: 'absolute',
      height: 280,
      width: 300,
      top: 210,
      left: 50,
      zIndex: 2,
    }}/>


    <View style={{
        position: 'absolute',
        height: 540,
        width: 800,
        top: 140,
        left: 530,

        }}>
          <SpriteSheet 
            ref={ref => (this.thorden = ref)}
            source={require('./assets/graphics/spritesheets/ThordenBed.png')}
            style={{
              position: 'absolute',
              left: 100,
            }}
            columns={7}
            rows={9}
            width={800}
            frameWidth={960}
            frameHeight={540}
            animations={{
              waveSleep: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62],
              idle: [0],
            }}
            onLoad={() => console.log('SpriteSheet loaded')}
            />
        <Pressable onPress={() => wave()} style={{
            position: 'absolute',
            top: '10%',
            height: '50%',
            left: '25%',
            width: '30%',
            }}>
        </Pressable>
      </View>

    {/* <Animated.Image source={require('./assets/Bedroom/BedroomGraphics/TordenNotanimated.png')}
    style={{
      position: 'absolute',
      height: 290,
      width: 300,
      top: 190,
      left: 730,
      zIndex: 2,
    }}/> */}

    <Animated.Image source={require('./assets/Bedroom/BedroomGraphics/Curtain1Notanimated.png')}
    style={{
      position: 'absolute',
      height: 260,
      width: 240,
      top: 0,
      left: 110,
      zIndex: 1,
    }}/>

    <Animated.Image source={require('./assets/Bedroom/BedroomGraphics/Curtain2Notanimated.png')}
    style={{
      position: 'absolute',
      height: 260,
      width: 250,
      top: 0,
      left: 700,
      zIndex: 1,
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
        height: 220,
        width: 220,
        left: 420,
        top: 450,
        zIndex: 5,
      }}>
          <Image source={require('./assets/Bedroom/books.png')}
          style={{
              resizeMode: "contain",
              height: 220,
              width: 220,
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
