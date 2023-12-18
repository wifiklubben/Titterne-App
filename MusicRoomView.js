import React, { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  Animated,
  Image,
  Pressable,
} from "react-native";

import OneShot from "./OneShot";
import MusicGameView from "./MusicGameView";
import SpriteSheet from "rn-sprite-sheet";

import { Audio } from "expo-av";

export default function MusicRoomView({ styles }) {
  const [sfx1, setSfx1] = useState();
  const [sfx2, setSfx2] = useState();

  const [isMusicGameOpen, setIsMusicGameOpen] = useState(false);

  const [isPlayignRightNow, setIsPlayingRightNow] = useState(null);

  const handleMusicGameOpen = () => {
    console.log(
      "opening music room game",
      "music game is open: ",
      isMusicGameOpen
    );

    if (isMusicGameOpen === false) {
      setIsMusicGameOpen(true);
    } else if (isMusicGameOpen === true) {
      setIsMusicGameOpen(false);
    }
  };

  useEffect(() => {
    async function loadSfx1() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("./assets/audio/guitarLick.mp3")
        );
        setSfx1(sound);
      } catch (error) {
        console.log("error in initial loadMusic of sfx1: ", error);
      }
    }

    async function loadSfx2() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("./assets/audio/Airhorn.mp3")
        );
        setSfx2(sound);
      } catch (error) {
        console.log("error in initial loadMusic of sfx2: ", error);
      }
    }

    loadSfx1();
    loadSfx2();
  }, []);

  //   sprite animations

  // Caracas animation

  const caracasShake = () => {
    this.caracasShake.play({
      type: "shake",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
  };

  // Guitar animation

  const guitarStrings = () => {
    this.guitarStrings.play({
      type: "play",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
  };

  // Flute animation

  const flutePlay = () => {
    this.flutePlay.play({
      type: "play",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
  };

  // Tambourine animation

  const tambourineShake = () => {
    this.tambourineShake.play({
      type: "shake",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
  };

  // Trumpet animation

  const trumpetPlay = () => {
    this.trumpetPlay.play({
      type: "play",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
  };

  // animation functions

  const wiggleAnimation = () => {
    console.log("wiggling!");
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ImageBackground
      // source={require("./assets/MusicRoom/musicRoomPlacement.png")}
      source={require("./assets/MusicRoom/MusicRoomAssets/musicRoomBG.png")}
      style={styles.fullWidthBackground}
    >
      <Pressable
        onPress={() => handleMusicGameOpen()}
        style={{
          position: "absolute",
          height: 90,
          width: 290,
          top: 615,
          left: 300,
          borderWidth: 3,
          borderColor: "red",
          transform: "rotateZ(-17deg)",
        }}
      >
        <Image
          source={require("./assets/MusicRoom/MusicRoomAssets/Keyboard.png")}
          style={{
            height: "145%",
            width: "145%",
            transform: [{ rotateZ: "17deg" }],
            overflow: "visible",
            left: -70,
          }}
        />
      </Pressable>

      <Pressable
        onPress={() => caracasShake()}
        style={{
          position: "absolute",
          height: 150,
          width: 85,
          top: 650,
          left: 200,
          borderWidth: 3,
          borderColor: "green",
        }}
      >
        {/* insert maracas spritesheet here */}
        <SpriteSheet
          ref={(ref) => (this.caracasShake = ref)}
          source={require("./assets/graphics/spritesheets/caracasShake.png")}
          columns={3}
          rows={3}
          height={150}
          frameHeight={150}
          frameWidth={150}
          width={130}
          imageStyle={{
            position: "absolute",
            top: -30,
            left: -12,
          }}
          animations={{
            shake: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          }}
        ></SpriteSheet>
      </Pressable>

      <Pressable
        onPress={() => tambourineShake()}
        style={{
          position: "absolute",
          height: 100,
          width: 130,
          top: 605,
          left: 70,
          borderWidth: 3,
          borderColor: "brown",
        }}
      >
        {/* insert tambourine spritesheet here */}
        <SpriteSheet
          ref={(ref) => (this.tambourineShake = ref)}
          source={require("./assets/graphics/spritesheets/tambourineShake.png")}
          columns={2}
          rows={4}
          height={150}
          frameHeight={150}
          frameWidth={150}
          width={160}
          imageStyle={{
            position: "absolute",
            top: -16,
            left: -13,
          }}
          animations={{
            shake: [0, 1, 2, 3, 4, 5, 6, 7],
          }}
        ></SpriteSheet>
      </Pressable>

      <Pressable
        onPress={() => guitarStrings()}
        style={{
          position: "absolute",
          height: 285,
          width: 135,
          top: 340,
          left: 840,
          borderWidth: 3,
          borderColor: "orange",
        }}
      >
        {/* insert guitar spritesheet here */}
        <SpriteSheet
          ref={(ref) => (this.guitarStrings = ref)}
          source={require("./assets/graphics/spritesheets/guitarStrings.png")}
          columns={5}
          rows={2}
          height={250}
          frameHeight={1456}
          frameWidth={150}
          width={140}
          imageStyle={{
            position: "absolute",
            top: -2,
            left: -4,
          }}
          animations={{
            play: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          }}
        ></SpriteSheet>
      </Pressable>

      <Pressable
        onPress={() => trumpetPlay()}
        style={{
          position: "absolute",
          height: 130,
          width: 190,
          top: 340,
          left: 640,
          borderWidth: 3,
          borderColor: "gold",
        }}
      >
        {/* insert trumpet spritesheet here */}
        <SpriteSheet
          ref={(ref) => (this.trumpetPlay = ref)}
          source={require("./assets/graphics/spritesheets/trumpetPlay.png")}
          columns={5}
          rows={3}
          height={150}
          frameHeight={150}
          frameWidth={150}
          width={180}
          imageStyle={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
          animations={{
            play: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13],
          }}
        ></SpriteSheet>
      </Pressable>

      <Pressable
        onPress={() => flutePlay()}
        style={{
          position: "absolute",
          height: 100,
          width: 175,
          top: 710,
          left: 360,
          borderWidth: 3,
          borderColor: "lime",
          // transform: "rotateZ(-40deg)",
        }}
      >
        {/* insert flute spritesheet here */}
        <SpriteSheet
          ref={(ref) => (this.flutePlay = ref)}
          source={require("./assets/graphics/spritesheets/flutePlay.png")}
          columns={3}
          rows={6}
          height={100}
          frameHeight={1872}
          frameWidth={150}
          width={150}
          imageStyle={{
            position: "absolute",
            top: -35,
            left: 5,
          }}
          animations={{
            play: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
          }}
        ></SpriteSheet>
      </Pressable>

      <Pressable
        style={{
          position: "absolute",
          height: 130,
          width: 190,
          top: 500,
          left: 6300,
          borderWidth: 3,
          borderColor: "gray",
        }}
      >
        {/* insert record player spritesheet here */}
      </Pressable>

      {isMusicGameOpen && (
        <MusicGameView
          styles={styles}
          handleMusicGameOpen={handleMusicGameOpen}
        />
      )}

      {/* <View style={{
            position:'absolute',
            top: 300,
            right: 150,
          
          }}>

          <OneShot soundToPlay={sfx1} styles={styles}>

            <Animated.Image source={require('./assets/ThordenBass.png')}
              styles={[
                styles.speakerButton
              ]}
              onPress={wiggleAnimation}
            />
              
          </OneShot>

        </View>

        <View style={{
            position:'absolute',
            top: 100,
            right: 350,
            }}>

          <OneShot  soundToPlay={sfx2} styles={styles}>

          <Image source={require('./assets/speakerR.png')}
          styles={styles.speakerButton}/>

          </OneShot>
          
        </View> */}
    </ImageBackground>
  );
}
