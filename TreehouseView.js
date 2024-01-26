import React, { useEffect, useState } from "react";
import { View, ImageBackground, Text, Image, Pressable } from "react-native";

import { Audio } from "expo-av";

import SpriteSheet from "rn-sprite-sheet";

import BugGameView from "./BugGameView";
import BookViewAction from "./BookViewAction";

function TreehouseView({ styles, startTreehouseSound, stopTreehouseSound }) {
  const [bugGameOpen, setBugGameOpen] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [birdSfx, setBirdSfx] = useState();
  const [boomboxAudio, setBoomboxAudio] = useState();
  const [crowAudio, setCrowAudio] = useState();
  const [cansAudio, setCansAudio] = useState();
  const [popcornAudio, setPopcornAudio] = useState();
  const [isWaving, setIsWaving] = useState(false);
  const [skyisBlinking, setSkyisBlinking] = useState(false);
  const [skyisWaving, setSkyisWaving] = useState(false);

  //set all sfx

  useEffect(() => {
    // async function loadBirdSound() {
    //     try {
    //         const [sound] = await Audio.Sound.createAsync(require())
    //         setBirdSfx( sound );
    //     } catch (error) {
    //         console.log('error loading bird sfx');
    //     }
    // }
    // more SFX loading here
    //     loadBirdSound()

    async function loadBoomboxAudio() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/treeHouse/Boombox.mp3"));
        setBoomboxAudio(sound);
      } catch (error) {
        console.log("error in initial loadMusic of Boombox audio: ", error);
      }
    }

    async function loadCrowAudio() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/treeHouse/Crow.mp3"));
        setCrowAudio(sound);
      } catch (error) {
        console.log("error in initial loadMusic of Crow audio: ", error);
      }
    }

    async function loadCansAudio() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/treeHouse/Cans.mp3"));
        setCansAudio(sound);
      } catch (error) {
        console.log("error in initial loadMusic of Cans audio: ", error);
      }
    }

    async function loadPopcornAudio() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/treeHouse/Popcorn.mp3"));
        setPopcornAudio(sound);
      } catch (error) {
        console.log("error in initial loadMusic of Popcorn audio: ", error);
      }
    }

    loadBoomboxAudio();
    loadCrowAudio();
    loadCansAudio();
    loadPopcornAudio();
  }, []);

  async function playAudio(audio) {
    try {
      if (audio) {
        audio.replayAsync();
      }
    } catch (error) {
      console.log("error playing audio", error);
    }
  }

  //   sprite animations

  // bird singing

  const birdSong = () => {
    this.birdSong.play({
      type: "squawk",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
    setTimeout(() => {
      playAudio(crowAudio);
    }, 400);
  };

  // sky blinking

  // sky waving
  const skyWave = () => {
    if (!skyisBlinking && !skyisWaving) {
      this.skyWave.play({
        type: "wave",
        fps: 24,
        loops: false,
        resetAfterFinish: true,
        onFinish: () => {
          setSkyisWaving(false);
        },
      });
    }
  };
  //skyblink
  const skyBlink = () => {
    this.skyWave.play({
      type: "blink",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
      onFinish: () => {
        setSkyisBlinking(false);
      },
    });
  };
  useEffect(() => {
    if (!skyisWaving) {
      const blinkTimer = setInterval(() => {
        setSkyisBlinking(true);
        skyBlink();
      }, 4500);
      return () => clearInterval(blinkTimer);
    }
  }, [skyisWaving]);

  // Torden waving
  const tordenWave = () => {
    if (!isBlinking) {
      this.tordenWave.play({
        type: "wave",
        fps: 24,
        loops: false,
        resetAfterFinish: true,
        onFinish: () => {
          setIsWaving(false);
        },
      });
    }
  };
  // Torden blinking
  const tordenBlink = () => {
    this.tordenWave.play({
      type: "blink",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
      onFinish: () => {
        setIsBlinking(false);
      },
    });
  };
  useEffect(() => {
    if (!isWaving) {
      const blinkTimer = setInterval(() => {
        setIsBlinking(true);
        tordenBlink();
      }, 5000);
      return () => clearInterval(blinkTimer);
    }
  }, [isWaving]);

  // Boombox animation

  const boomBox = () => {
    this.boomBox.play({
      type: "bounce",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
    playAudio(boomboxAudio);
  };

  const handleGameOpen = () => {
    console.log("handle game open");

    if (bugGameOpen === false) {
      setBugGameOpen(true);
    } else if (bugGameOpen === true) {
      setBugGameOpen(false);
    }
    console.log(bugGameOpen);
  };

  return (
    <>
      <ImageBackground
        source={require("./assets/TreeHouse/TreeHouseBG.png")}
        // source={require("./assets/TreeHouse/TreeHousePlacement.png")}
        style={styles.fullWidthBackground}
      >
        {bugGameOpen === false && (
          <Pressable
            onPress={() => handleGameOpen()}
            style={{
              position: "absolute",
              top: 550,
              left: 290,
              width: 200,
              height: 200,

              zIndex: 4,
            }}
          >
            <Image
              source={require("./assets/TreeHouse/Cards.png")}
              style={{
                resizeMode: "contain",
                width: "100%",
                height: "100%",
              }}
            />
          </Pressable>
        )}

        <View
          style={{
            position: "absolute",
            resizeMode: "contain",
            width: 150,
            height: 150,
            top: 120,
            left: 500,
            zIndex: 2,
          }}
        >
          <SpriteSheet
            ref={(ref) => (this.birdSong = ref)}
            source={require("./assets/graphics/spritesheets/birdSing.png")}
            columns={6}
            rows={8}
            height={150}
            frameHeight={150}
            frameWidth={150}
            animations={{
              squawk: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
            }}
          ></SpriteSheet>

          <Pressable
            onPress={() => birdSong()}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
          />
        </View>

        <View
          style={{
            position: "absolute",

            height: 85,
            width: 100,
            top: 500,
            left: 490,
            zIndex: 2,
          }}
        >
          {/* cola cans placeholder */}
          <Image
            source={require("./assets/TreeHouse/cola.png")}
            style={{
              position: "absolute",
              // right: 200,
              top: -80,
              width: "100%",
              resizeMode: "contain",
            }}
          />
          <Pressable
            onPress={() => playAudio(cansAudio)}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
          />
        </View>

        <View
          style={{
            position: "absolute",

            height: 160,
            width: 180,
            top: 540,
            left: 590,
            zIndex: 2,
          }}
        >
          {/* popcorn placeholder */}
          <Image
            source={require("./assets/TreeHouse/popcorn.png")}
            style={{
              position: "absolute",
              // right: 200,
              left: -30,
              top: -160,
              width: 250,
              resizeMode: "contain",
            }}
          />
          <Pressable
            onPress={() => playAudio(popcornAudio)}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
          />
        </View>

        <View
          style={{
            position: "absolute",

            width: 200,
            height: 300,
            left: 0,
            top: 405,
            zIndex: 2,
          }}
        >
          <SpriteSheet
            ref={(ref) => (this.boomBox = ref)}
            source={require("./assets/graphics/spritesheets/BoomboxAnim.png")}
            columns={4}
            rows={4}
            frameHeight={735}
            width={350}
            imageStyle={{
              position: "absolute",
              top: -10,
              left: -60,
            }}
            animations={{
              bounce: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            }}
          ></SpriteSheet>
          <Pressable
            onPress={() => boomBox()}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
          />
        </View>

        <View
          style={{
            position: "absolute",

            left: 100,
            top: 210,
            width: 260,
            height: 310,
            zIndex: 2,
          }}
        >
          {/* Sky placeholder */}
          <SpriteSheet
            ref={(ref) => (this.skyWave = ref)}
            source={require("./assets/graphics/spritesheets/SkyWave.png")}
            columns={8}
            rows={8}
            frameHeight={7496}
            width={370}
            imageStyle={{
              position: "absolute",
              top: -65,
              left: -45,
              zIndex: 0,
            }}
            animations={{
              wave: [0, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57],
              blink: [0, 1, 2, 3, 4, 5, 6, 7, 8, 0],
            }}
          ></SpriteSheet>

          <Pressable
            onPress={() => {
              skyWave();
              setSkyisWaving(true);
            }}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
          />
        </View>

        <View
          style={{
            position: "absolute",

            top: 220,
            left: 730,
            height: 300,
            width: 260,
            zIndex: 2,
          }}
        >
          <SpriteSheet
            ref={(ref) => (this.tordenWave = ref)}
            source={require("./assets/graphics/spritesheets/tordenWaveTreehouse.png")}
            columns={5}
            rows={10}
            frameHeight={1690}
            width={300}
            imageStyle={{
              position: "absolute",
              top: -30,
              left: -20,
            }}
            animations={{
              wave: [0, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
              blink: [0, 1, 2, 3, 4, 5, 6, 7],
            }}
          ></SpriteSheet>
          <Pressable
            onPress={() => {
              tordenWave();
              setIsWaving(true);
            }}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
          />
        </View>

        {/* <View
          style={{
            position: "absolute",
            borderWidth: 3,
            borderColor: "red",
            height: 160,
            width: "100%",
            bottom: 0,
            left: 590,
          }}
        > */}
        {/* Foreground */}
        <Image
          source={require("./assets/TreeHouse/TreeHouseFG.png")}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        />
        {/* </View> */}

        {bugGameOpen === true && <BugGameView styles={styles} handleGameOpen={handleGameOpen} />}

        {/* story book component

          {bugGameOpen || isBookOpen === false && ( 

<Pressable onPress={() => setIsBookOpen(true)}>
          <Image source={require('./assets/graphics/books.png')}
          style={{
              position: 'absolute',
              right: 200,
              top: 250,
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
      <BookViewAction 
      currentStory={currentStory}
      setCurrentStory={setCurrentStory}
      storyTitles={storyTitles}
      styles={styles}
      renderStoryContents={renderStoryContents}
      handleBookClose={handleBookClose}
      turnPage={turnPageWithSpeech}
      />)} */}
      </ImageBackground>
    </>
  );
}

export default TreehouseView;
