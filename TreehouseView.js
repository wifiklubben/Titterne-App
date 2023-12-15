import React, { useEffect, useState } from "react";
import { View, ImageBackground, Text, Image, Pressable } from "react-native";

import { Audio } from "expo-av";

import SpriteSheet from "rn-sprite-sheet";

import BugGameView from "./BugGameView";
import BookViewAction from "./BookViewAction";

function TreehouseView({ styles }) {
  const [bugGameOpen, setBugGameOpen] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [birdSfx, setBirdSfx] = useState();

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
  }, []);

  //set Skyblinking timer
  useEffect(() => {
    // Start the blink animation every 3 seconds
    const blinkTimer = setInterval(() => {
      skyBlink(); // Trigger the blink animation
      setTimeout(() => {
        setIsBlinking(false);
      }, 2000); // Assuming blink animation duration is 2000 milliseconds
    }, 3000);

    // Clean up the timer when the component is unmounted
    return () => clearInterval(blinkTimer);
  }, []);

  // play all sfx

  async function playBirdSound() {
    try {
      if (birdSfx) {
        birdSfx.replayAsync();
      }
    } catch (error) {
      console.log("error playing bird sound", error);
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
    playBirdSound();
  };

  // sky blinking

  const skyBlink = () => {
    this.skyWave.play({
      type: "blink",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
  };

  // sky waving

  const skyWave = () => {
    if (!isBlinking) {
      this.skyWave.play({
        type: "wave",
        fps: 24,
        loops: false,
        resetAfterFinish: true,
      });
    }
  };

  // Torden blinking

  const tordenBlink = () => {
    this.tordenBlink.play({
      type: "blink",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
  };

  // Boombox animation

  const boomBox = () => {
    this.boomBox.play({
      type: "bounce",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
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
      <ImageBackground source={require("./assets/TreeHouse/TreeHouseBG.png")} style={styles.fullWidthBackground}>
        {bugGameOpen === false && (
          <Pressable
            onPress={() => handleGameOpen()}
            style={{
              position: "absolute",
              top: 550,
              left: 290,
              width: 200,
              height: 200,
              borderWidth: 3,
              borderColor: "green",
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
            borderWidth: 2,
            borderColor: "orange",
            height: 85,
            width: 100,
            top: 500,
            left: 490,
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
        </View>

        <View
          style={{
            position: "absolute",
            borderWidth: 3,
            borderColor: "purple",
            height: 160,
            width: 180,
            top: 540,
            left: 590,
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
        </View>

        <View
          style={{
            position: "absolute",
            borderWidth: 3,
            borderColor: "yellow",
            width: 200,
            height: 300,
            left: 0,
            top: 420,
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
              bounce: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
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
            borderWidth: 3,
            borderColor: "pink",
            left: 100,
            top: 210,
            width: 260,
            height: 310,
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
              top: -70,
              left: -45,
              zIndex: 0,
            }}
            animations={{
              wave: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57],
              blink: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            }}
          ></SpriteSheet>

          <Pressable
            onPress={() => skyWave()}
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
            borderWidth: 3,
            borderColor: "blue",
            top: 220,
            left: 730,
            height: 300,
            width: 260,
          }}
        >
          <SpriteSheet
            ref={(ref) => (this.tordenBlink = ref)}
            source={require("./assets/graphics/spritesheets/TordenBlink.png")}
            columns={4}
            rows={2}
            frameHeight={1690}
            width={300}
            imageStyle={{
              position: "absolute",
              top: -30,
              left: -20,
            }}
            animations={{
              blink: [0, 4, 1, 5, 2, 6, 3],
            }}
          ></SpriteSheet>
          <Pressable
            onPress={() => tordenBlink()}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
          />
        </View>

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
