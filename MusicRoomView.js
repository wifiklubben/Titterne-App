import React, { useEffect, useState } from "react";
import { View, ImageBackground, Animated, Image, Pressable, Text } from "react-native";

import OneShot from "./OneShot";
import MusicGameView from "./MusicGameView";
import SpriteSheet from "rn-sprite-sheet";

import { Audio } from "expo-av";

export default function MusicRoomView({ styles, startMusicRoomBackgroundSound, stopMusicRoomBackgroundSound }) {
  const [sfx1, setSfx1] = useState();
  const [sfx2, setSfx2] = useState();
  const [guitarAudio, setGuitarAudio] = useState();
  const [fluteAudio, setFluteAudio] = useState();
  const [maracasAudio, setMaracasAudio] = useState();
  const [tambourineAudio, setTambourineAudio] = useState();
  const [trumpetAudio, setTrumpetAudio] = useState();
  const [skyIsPressed, setSkyIsPresssed] = useState(false);
  const [skyIsDancing, setSkyIsDancing] = useState(false);
  const [isMusicGameOpen, setIsMusicGameOpen] = useState(false);
  const [loadingCover] = useState(new Animated.Value(99));
  const [isPlayignRightNow, setIsPlayingRightNow] = useState(null);

  const handleMusicGameOpen = () => {
    console.log("opening music room game", "music game is open: ", isMusicGameOpen);

    if (isMusicGameOpen === false) {
      setIsMusicGameOpen(true);
      {
        stopMusicRoomBackgroundSound();
      }
    } else if (isMusicGameOpen === true) {
      setIsMusicGameOpen(false);
      {
        startMusicRoomBackgroundSound();
      }
    }
  };

  useEffect(() => {
    async function loadSfx1() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/guitarLick.mp3"));
        setSfx1(sound);
      } catch (error) {
        console.log("error in initial loadMusic of sfx1: ", error);
      }
    }

    async function loadGuitarAudio() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/musicRoom/guitar.mp3"));
        setGuitarAudio(sound);
      } catch (error) {
        console.log("error in initial loadMusic of guitar audio: ", error);
      }
    }

    async function loadFluteAudio() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/musicRoom/flute.mp3"));
        setFluteAudio(sound);
      } catch (error) {
        console.log("error in initial loadMusic of flute audio: ", error);
      }
    }

    async function loadMaracasAudio() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/musicRoom/maracas.mp3"));
        setMaracasAudio(sound);
      } catch (error) {
        console.log("error in initial loadMusic of maracas audio: ", error);
      }
    }

    async function loadTambourineAudio() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/musicRoom/tambourine.mp3"));
        setTambourineAudio(sound);
      } catch (error) {
        console.log("error in initial loadMusic of tambourine audio: ", error);
      }
    }

    async function loadTrumpetAudio() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/musicRoom/trumpet.mp3"));
        setTrumpetAudio(sound);
      } catch (error) {
        console.log("error in initial loadMusic of trumpet audio: ", error);
      }
    }

    async function loadSfx2() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/Airhorn.mp3"));
        setSfx2(sound);
      } catch (error) {
        console.log("error in initial loadMusic of sfx2: ", error);
      }
    }

    loadSfx1();
    loadSfx2();
    loadGuitarAudio();
    loadFluteAudio();
    loadMaracasAudio();
    loadTambourineAudio();
    loadTrumpetAudio();
  }, []);

  // Audio

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

  // Maracas animation

  const maracasShake = () => {
    this.maracasShake.play({
      type: "shake",
      fps: 24,
      loop: false,
      resetAfterFinish: true,
    });
    playAudio(maracasAudio);
  };

  // Guitar animation

  const guitarStrings = () => {
    this.guitarStrings.play({
      type: "play",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
    playAudio(guitarAudio);
  };

  // Flute animation

  const flutePlay = () => {
    this.flutePlay.play({
      type: "play",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
    playAudio(fluteAudio);
  };

  // Tambourine animation

  const tambourineShake = () => {
    this.tambourineShake.play({
      type: "shake",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
    playAudio(tambourineAudio);
  };

  // Trumpet animation

  const trumpetPlay = () => {
    this.trumpetPlay.play({
      type: "play",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
    playAudio(trumpetAudio);
  };

  // Record player animation

  const recordSpin = () => {
    this.recordSpin.play({
      type: "spin",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
  };

  // Drums animation

  const drumPlay = () => {
    this.drumPlay.play({
      type: "play",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
  };

  // Torden animation
  const tordenWave = () => {
    this.tordenWave.play({
      type: "wave",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
  };

  // Sky dance
  const skyDance = () => {
    if (!skyIsDancing) {
      this.skyDance.play({
        type: "dance",
        fps: 24,
        loops: false,
        resetAfterFinish: true,
        onFinish: () => {
          setSkyIsPresssed(false);
        },
      });
    }
  };
  // sky idle dance
  const skyIdle = () => {
    this.skyDance.play({
      type: "idle",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
      onFinish: () => {
        setSkyIsDancing(false);
      },
    });
  };
  useEffect(() => {
    if (!skyIsPressed) {
      const danceTimer = setInterval(() => {
        setSkyIsDancing(true);
        skyIdle();
      }, 5000);
      return () => clearInterval(danceTimer);
    }
  }, [skyIsPressed]);

  // animation functions
  const LoadingCover = () => {
    Animated.timing(loadingCover, {
      toValue: -99,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };

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
      // source={require("./assets/MusicRoom/musicRoomCharacterPlacement.png")}
      style={styles.fullWidthBackground}
    >
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "#8AC1DF",
          zIndex: 99,
          alignItems: "center",
          justifyContent: "center",
          zIndex: loadingCover,
        }}
      >
        <Text style={styles.h1Text}>Loading...</Text>
      </Animated.View>
      <Pressable
        onPress={() => handleMusicGameOpen()}
        style={{
          position: "absolute",
          height: 90,
          width: 290,
          top: 615,
          left: 300,
          transform: "rotateZ(-17deg)",
          zIndex: 3,
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
        onPress={() => {
          tordenWave();
        }}
        style={{
          position: "absolute",
          height: 300,
          width: 200,
          top: 100,
          right: 125,

          zIndex: 4,
        }}
      >
        {/* insert torden spritesheet here */}
        <SpriteSheet
          ref={(ref) => (this.tordenWave = ref)}
          source={require("./assets/graphics/spritesheets/tordenWaveMusicRoom.png")}
          columns={5}
          rows={9}
          frameHeight={6264}
          frameWidth={3040}
          width={300}
          imageStyle={{
            position: "absolute",
            top: 12,
            left: -48,
          }}
          animations={{
            wave: [0, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
            blink: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          }}
        ></SpriteSheet>
      </Pressable>

      <Pressable
        onPress={() => {
          skyDance();
          setSkyIsPresssed(true);
        }}
        style={{
          position: "absolute",
          height: 300,
          width: 200,
          top: 300,
          left: 255,

          zIndex: 2,
        }}
      >
        {/* insert torden spritesheet here */}
        <SpriteSheet
          ref={(ref) => (this.skyDance = ref)}
          source={require("./assets/graphics/spritesheets/skyDanceMusicRoom.png")}
          columns={4}
          rows={9}
          frameHeight={150}
          frameWidth={150}
          width={400}
          imageStyle={{
            position: "absolute",
            top: -40,
            left: -80,
          }}
          animations={{
            dance: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
            idle: [0, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
          }}
        ></SpriteSheet>
      </Pressable>

      <Pressable
        onPress={() => maracasShake()}
        style={{
          position: "absolute",
          height: 150,
          width: 85,
          top: 650,
          left: 200,

          zIndex: 4,
        }}
      >
        {/* insert maracas spritesheet here */}
        <SpriteSheet
          ref={(ref) => (this.maracasShake = ref)}
          source={require("./assets/graphics/spritesheets/maracasShake.png")}
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
            shake: [0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8],
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

          zIndex: 3,
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
            shake: [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7],
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

          zIndex: 4,
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
            play: [0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8],
          }}
        ></SpriteSheet>
      </Pressable>

      <Pressable
        onPress={() => trumpetPlay()}
        style={{
          position: "absolute",
          height: 130,
          width: 190,
          top: 355,
          left: 625,

          zIndex: 3,
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
            play: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
          }}
        ></SpriteSheet>
      </Pressable>

      <Pressable
        onPress={() => recordSpin()}
        style={{
          position: "absolute",
          height: 215,
          width: 250,
          top: 480,
          left: 590,

          zIndex: 3,
        }}
      >
        {/* insert record player spritesheet here */}
        <SpriteSheet
          ref={(ref) => (this.recordSpin = ref)}
          source={require("./assets/graphics/spritesheets/recordSpin.png")}
          columns={3}
          rows={4}
          height={100}
          frameHeight={1872}
          frameWidth={150}
          width={430}
          imageStyle={{
            position: "absolute",
            top: -50,
            left: -30,
          }}
          animations={{
            spin: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          }}
        ></SpriteSheet>
      </Pressable>

      <Pressable
        onPress={() => drumPlay()}
        style={{
          position: "absolute",
          height: 380,
          width: 350,
          top: 200,
          left: 20,

          resizeMode: "contain",
        }}
      >
        {/* insert drums spritesheet here */}
        <SpriteSheet
          ref={(ref) => (this.drumPlay = ref)}
          source={require("./assets/graphics/spritesheets/drumPlay.png")}
          columns={4}
          rows={3}
          height={200}
          frameHeight={1872}
          frameWidth={150}
          width={800}
          imageStyle={{
            position: "absolute",
            top: -25,
            left: -200,
          }}
          animations={{
            play: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          }}
          onLoad={() => LoadingCover()}
        ></SpriteSheet>
      </Pressable>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,

          height: 380,
          width: 250,
          borderColor: "purple",
        }}
      >
        <Image
          pointerEvents="none"
          source={require("./assets/MusicRoom/MusicRoomAssets/pillows.png")}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>

      {isMusicGameOpen && <MusicGameView styles={styles} handleMusicGameOpen={handleMusicGameOpen} />}

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
