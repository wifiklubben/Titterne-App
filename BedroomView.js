import React, { useEffect, useState, useRef } from "react";
import { View, ImageBackground, Pressable, Animated, Text } from "react-native";
import { Asset } from "expo-asset";
import { Audio } from "expo-av";
import { Image } from "expo-image";

import SockGameView from "./SockGameView";
import BookView from "./BookView";

import SpriteSheet from "rn-sprite-sheet";
import { Pre } from "@expo/html-elements";

export default function BedroomView({ styles, stopBedroomAmbientSound, startBedroomAmbientSound }) {
  const [waveSfx, setWaveSfx] = useState();
  const [dollSfx, setDollSfx] = useState();
  const [curtainSfx, setCurtainSfx] = useState();
  const [robotSfx, setRobotSfx] = useState();
  const [dragonSfx, setDragonSfx] = useState();
  const [carSfx, setCarSfx] = useState();
  const [planeSfx, setPlaneSfx] = useState();
  const [animation] = useState(new Animated.Value(0));
  const [driveAnimation] = useState(new Animated.Value(0));
  const [flyAnim] = useState(new Animated.Value(0));
  const [localIsLoaded, setLocalIsLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [imageArray, setImageArray] = useState();
  const [loadingCover] = useState(new Animated.Value(99));

  useEffect(() => {
    const loadAssets = async () => {
      const images = {
        skyAnim: require("./assets/graphics/spritesheets/SkyAnim.png"),
        TordenBedroomAnimWave: require("./assets/graphics/spritesheets/TordenBedroomAnimWaveSml.png"),
        Curtain1Notanimated: require("./assets/Bedroom/BedroomGraphics/Curtain1NotanimatedSml.png"),
        curtainnAnimFix: require("./assets/graphics/spritesheets/curtainnAnimFixSml.png"),
        bedroomBG: require("./assets/Bedroom/bedroomBG.png"),
        bedroomEnd: require("./assets/Bedroom/bedEndOverlaySml.png"),
        robotAnim: require("./assets/graphics/spritesheets/RobotAnimSml.png"),
        dragonAnim: require("./assets/graphics/spritesheets/DragonAnimSml.png"),
        doll: require("./assets/Bedroom/BedroomGraphics/dollNotanimated.png"),
        carDriving: require("./assets/graphics/spritesheets/CarDrivingSml.png"),
        planeAnim: require("./assets/graphics/spritesheets/PlananimSml.png"),
      };

      const cacheImages = Object.entries(images).map(async ([key, image]) => {
        const asset = Asset.fromModule(image);
        setImageArray(images);
        await asset.downloadAsync();
        setLoadedImages((prevLoadedImages) => ({
          ...prevLoadedImages,
          [key]: asset.localUri,
        }));
      });

      try {
        await Promise.all(cacheImages);
        setLocalIsLoaded(true);
      } catch (error) {
        console.warn("Error: ", error);
      }
    };

    loadAssets();
  }, []);

  console.log("local is loaded", localIsLoaded);

  // set all sfx

  useEffect(() => {
    async function loadDollSound() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/sfx/Doll.mp3"));
        setDollSfx(sound);
      } catch (error) {
        console.log("error loading wave sfx");
      }
    }
    async function loadWaveSound() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/sfx/hello.mp3"));
        setWaveSfx(sound);
      } catch (error) {
        console.log("error loading wave sfx");
      }
    }

    async function loadCurtainSound() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/sfx/Curtain.mp3"));
        setCurtainSfx(sound);
      } catch (error) {
        console.log("error loading curtain sfx");
      }
    }

    async function loadRobotSound() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/sfx/Robot.mp3"));
        setRobotSfx(sound);
      } catch (error) {
        console.log("error loading robot sfx");
      }
    }

    async function loadDragonSound() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/sfx/Dino.mp3"));
        setDragonSfx(sound);
      } catch (error) {
        console.log("error loading dragon sfx");
      }
    }

    async function loadCarSound() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/sfx/Bil.mp3"));
        setCarSfx(sound);
      } catch (error) {
        console.log("error loading car sfx");
      }
    }
    async function loadPlaneSound() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/sfx/Plane.mp3"));
        setPlaneSfx(sound);
      } catch (error) {
        console.log("error loading plane sfx");
      }
    }

    loadWaveSound();
    loadCurtainSound();
    loadRobotSound();
    loadDragonSound();
    loadCarSound();
    loadPlaneSound();
    loadDollSound();
  }, []);

  // play sfx
  async function playDollSound() {
    try {
      if (dollSfx) {
        dollSfx.replayAsync();
      }
    } catch (error) {
      console.log("error playing doll sound", error);
    }
  }
  async function playWaveSound() {
    try {
      if (waveSfx) {
        waveSfx.replayAsync();
      }
    } catch (error) {
      console.log("error playing wave sound", error);
    }
  }

  async function playRobotSound() {
    try {
      if (robotSfx) {
        robotSfx.replayAsync();
      }
    } catch (error) {
      console.log("error playing robot sound", error);
    }
  }

  async function playDragonSound() {
    try {
      if (dragonSfx) {
        dragonSfx.replayAsync();
      }
    } catch (error) {
      console.log("error playing dragon sound", error);
    }
  }

  async function playCurtainSound() {
    try {
      if (curtainSfx) {
        curtainSfx.replayAsync();
      }
    } catch (error) {
      console.log("error playing curtain sound", error);
    }
  }

  async function playCarSound() {
    try {
      if (carSfx) {
        carSfx.replayAsync();
      }
    } catch (error) {
      console.log("error playing car sound", error);
    }
  }

  async function playPlaneSound() {
    try {
      if (planeSfx) {
        planeSfx.replayAsync();
      }
    } catch (error) {
      console.log("error playing plane sound", error);
    }
  }

  // sprite animation and sound

  // thordenWave

  const wave = () => {
    this.thorden.play({
      type: "waveSleep",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
    playWaveSound();
  };

  const blink = () => {
    this.sky.play({
      type: "skyBlink",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
  };
  //animations
  const LoadingCover = () => {
    Animated.timing(loadingCover, {
      toValue: -99,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };
  const car = () => {
    this.car.play({
      type: "carDriving",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
    playCarSound();
  };

  const dragon = () => {
    this.dragon.play({
      type: "roar",
      fps: 21,
      loops: false,
      resetAfterFinish: true,
    });

    playDragonSound();
  };

  const curtain = () => {
    this.curtain.play({
      type: "curtainClose",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });

    playCurtainSound();
  };

  const robot = () => {
    this.robot.play({
      type: "robotDance",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });

    playRobotSound();
  };
  const robotAnimation = () => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: -55,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: -0,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const DriveAnimation = () => {
    Animated.sequence([
      Animated.timing(driveAnimation, {
        toValue: 1000,
        duration: 1500,
        useNativeDriver: false,
      }),
      Animated.timing(driveAnimation, {
        toValue: -300,
        duration: 0,
        useNativeDriver: false,
      }),
      Animated.timing(driveAnimation, {
        toValue: 0,
        duration: 700,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const plane = () => {
    this.plane.play({
      type: "planeFly",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });

    playPlaneSound();
  };

  // * story book logic

  const storyTitles = [
    {
      title: "Natero",
      tag: "natero",
      thumbnail: require("./assets/StoryContents/Thumbnails/illustorybookNattero.png"),
      storyAudio: require("./assets/StoryContents/Speeches/Hjælp_til_nattero.mp3"),
    },
    {
      title: "Magisk Have",
      tag: "magiskHave",
      thumbnail: require("./assets/StoryContents/Thumbnails/illustorybookRergnbueHaven.png"),
      storyAudio: require("./assets/StoryContents/Speeches/Magisk_have_2.mp3"),
    },
    {
      title: "Natur",
      tag: "natur",
      thumbnail: require("./assets/StoryContents/Thumbnails/illustorybookNaturdrøm.png"),
      storyAudio: require("./assets/StoryContents/Speeches/Natur.mp3"),
    },
    {
      title: "Skattejagt",
      tag: "skattejagt",
      thumbnail: require("./assets/StoryContents/Thumbnails/illustorybookSkatten.png"),
      storyAudio: require("./assets/StoryContents/Speeches/Skattejagt.mp3"),
    },
    {
      title: "Tuba",
      tag: "tuba",
      thumbnail: require("./assets/StoryContents/Thumbnails/illustorybookTuba.png"),
      storyAudio: require("./assets/StoryContents/Speeches/Tuba_2.mp3"),
    },
  ];
  const [storyIsPaused, setStoryIsPaused] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [currentSpeeches, setCurrentSpeech] = useState();
  const [currentStory, setCurrentStory] = useState({
    title: "",
    tag: "",
    thumbnail: "",
    storyAudio: "",
  });

  const renderStoryContents = () => {
    return (
      <View
        style={{
          width: "100%",
          top: 200,
          justifyContent: "center",
          alignItems: "center",
        }}
      ></View>
    );
  };

  // load speech sounds
  useEffect(() => {
    if (currentStory.storyAudio) {
      console.log("loading current story audio");
      loadSpeechSounds(currentStory.storyAudio);
    } else {
      console.log("not loading current story audio");
    }
  }, [currentStory]);

  const loadSpeechSounds = async (storyAudio) => {
    try {
      const { sound } = await Audio.Sound.createAsync(storyAudio);

      setCurrentSpeech(sound);
    } catch (error) {
      console.log("error loading current story audio ", error);
    }
    console.log("current story loaded");
  };

  //  unload speech sounds on unmount

  useEffect(() => {
    if (currentSpeeches) {
      return () => {
        if (currentSpeeches) {
          currentSpeeches.unloadAsync();
        }
      };
    }
  }, [currentSpeeches]);

  // play Speech Sounds

  useEffect(() => {
    console.log("trying to play");
    if (currentSpeeches) {
      async function playSpeech() {
        await currentSpeeches.playAsync();
      }
      playSpeech();
      console.log(currentStory);
    }
  }, [currentSpeeches]);

  // Close book modal

  async function handleBookClose() {
    if (currentSpeeches) {
      currentSpeeches.stopAsync();
    }
    setIsBookOpen(false),
      setCurrentStory({
        title: "",
        tag: "",
        thumbnail: "",
        storyAudio: "",
      }),
      setCurrentSpeech("");
    startBedroomAmbientSound();
  }

  // Deselect story, back to contents page

  async function handleStoryClose() {
    console.log("story closing");
    // todo remove current story and make sure audio stops (unload the audio as audio persists and there are two playing when you choose a different story)
    currentSpeeches.stopAsync();
    setCurrentStory({
      title: "",
      tag: "",
      thumbnail: "",
      storyAudio: "",
    }),
      setCurrentSpeech("");
    console.log("unloading sound");
  }

  async function pausePlayStory() {
    if (storyIsPaused === false) {
      currentSpeeches.pauseAsync();
      setStoryIsPaused(true);
    } else if (currentSpeeches && storyIsPaused === true) {
      currentSpeeches.playAsync();
      setStoryIsPaused(false);
    }
  }

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
  if (!localIsLoaded) {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "#8AC1DF",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.h1Text}>loading</Text>
      </View>
    );
  }
  if (localIsLoaded) {
    return (
      <ImageBackground source={imageArray.bedroomBG} style={styles.fullWidthBackground}>
        {/* bed frame graphics */}

        {sockGameOpen === false && (
          <Image
            source={{ uri: loadedImages.bedroomEnd }}
            style={{
              height: "100%",
              width: "100%",
              zIndex: 3,
            }}
            pointerEvents="none"
          />
        )}

        {/* bedroom toys */}
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
        <Animated.View
          style={{
            position: "absolute",
            height: 250,
            width: 200,
            top: 410,
            left: 800,
            zIndex: 4,
            alignItems: "center",
            transform: [{ translateX: animation }],
          }}
        >
          <SpriteSheet
            ref={(ref) => (this.robot = ref)}
            source={{ uri: loadedImages.robotAnim, width: 4230, height: 2019 }}
            columns={9}
            rows={3}
            width={200}
            animations={{
              robotDance: [0, 9, 18, 1, 10, 19, 2, 11, 20, 3, 12, 21, 4, 13, 22, 5, 14, 23, 6, 15, 24, 7, 16, 25, 8, 0, 9, 18, 1, 10, 19, 2, 11, 20, 3, 12, 21, 4, 13, 22, 5, 14, 23, 6, 15, 24, 7, 16, 25, 8],
            }}
          />
          <Pressable
            onPress={() => {
              robotAnimation();
              robot();
            }}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
          />
        </Animated.View>

        <View
          style={{
            position: "absolute",
            height: 250,
            width: 200,
            top: 440,
            left: 40,
            zIndex: 4,
          }}
        >
          <SpriteSheet
            ref={(ref) => (this.dragon = ref)}
            source={{ uri: loadedImages.dragonAnim, width: 4000, height: 1978 }}
            columns={8}
            rows={4}
            width={300}
            animations={{
              roar: [0, 8, 16, 24, 1, 9, 17, 25, 2, 10, 18, 26, 3, 11, 19, 27, 4, 12, 20, 28, 5, 6, 7, 13, 21, 29, 14, 15, 22, 30, 23, 31],
            }}
          />

          <Pressable
            onPress={() => dragon()}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
          />
        </View>

        <Animated.Image
          source={{ uri: loadedImages.doll }}
          style={{
            position: "absolute",
            height: 170,
            width: 140,
            top: 455,
            left: 260,
            zIndex: 3,
          }}
        />
        <Pressable
          style={{
            position: "absolute",
            height: 170,
            width: 140,
            top: 455,
            left: 260,
            zIndex: 4,
          }}
          onPress={() => {
            playDollSound();
          }}
        ></Pressable>

        <Animated.View
          style={{
            position: "absolute",
            height: 120,
            width: 240,
            top: 620,
            left: 200,
            zIndex: 6,
            overflow: "visible",
            transform: [{ translateX: driveAnimation }],
          }}
        >
          <SpriteSheet
            ref={(ref) => (this.car = ref)}
            source={{ uri: loadedImages.carDriving, width: 2800, height: 801 }}
            width={240}
            columns={7}
            rows={3}
            animations={{
              carDriving: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18],
            }}
          />

          <Pressable
            onPress={() => {
              car();
              DriveAnimation();
            }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
        </Animated.View>
        <Pressable
          onPress={() => {
            plane();
          }}
          style={{
            position: "absolute",
            height: 130,
            width: 180,
            top: 550,
            left: 640,
            zIndex: 4,
          }}
        >
          <SpriteSheet
            ref={(ref) => (this.plane = ref)}
            source={{ uri: loadedImages.planeAnim, width: 990, height: 1320 }}
            imageStyle={{
              marginBottom: 0,
              top: -50,
              right: 10,
            }}
            width={240}
            columns={3}
            rows={4}
            animations={{
              planeFly: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            }}
          />
        </Pressable>

        <View
          style={{
            position: "absolute",
            height: 280,
            width: 300,
            top: 230,
            left: 80,
            flex: 1,
            zIndex: 2,
            alignItems: "flex-end",
          }}
        >
          <SpriteSheet
            ref={(ref) => (this.sky = ref)}
            source={{ uri: loadedImages.skyAnim, width: 8019, height: 5054 }}
            columns={9}
            rows={7}
            width={320}
            animations={{
              skyBlink: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
                61,
              ],
            }}
            onLoad={() => LoadingCover()}
          />

          <Pressable
            onPress={() => blink()}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
        </View>

        <View
          style={{
            position: "absolute",
            height: 200,
            width: 330,
            top: 218,
            left: 715,
            flex: 1,
            zIndex: 2,
            alignItems: "flex-end",
          }}
        >
          <SpriteSheet
            ref={(ref) => (this.thorden = ref)}
            source={{ uri: loadedImages.TordenBedroomAnimWave, width: 3000, height: 2600 }}
            imageStyle={{
              marginBottom: 0,
            }}
            columns={8}
            rows={8}
            width={300}
            animations={{
              waveSleep: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
                61, 62,
              ],
            }}
          />

          <Pressable
            onPress={() => wave()}
            style={{
              position: "absolute",
              top: "10%",
              height: "100%",
              left: "15%",
              width: "60%",
            }}
          />
        </View>

        <Image
          source={{ uri: loadedImages.Curtain1Notanimated }}
          style={{
            position: "absolute",
            height: 260,
            width: 240,
            top: 0,
            left: 110,
            zIndex: 1,
          }}
        />

        <View
          style={{
            position: "absolute",
            height: 270,
            width: 250,
            top: 0,
            left: 700,
            zIndex: 1,
            overflow: "hidden",
          }}
        >
          <SpriteSheet
            ref={(ref) => (this.curtain = ref)}
            source={{ uri: loadedImages.curtainnAnimFix, width: 7216, height: 5706 }}
            columns={8}
            rows={6}
            width={340}
            imageStyle={{
              left: -50,
              top: -90,
            }}
            animations={{
              curtainClose: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
            }}
          />

          <Pressable
            onPress={() => curtain()}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
        </View>

        {/* Sock buttons */}

        {/* sock button red */}

        {sockGameOpen === false && (
          <ImageBackground
            source={require("./assets/graphics/socks/sockRed.png")}
            style={{
              position: "absolute",
              contentFit: "contain",
              width: 100,
              height: 100,
              top: 690,
              left: 65,
              zIndex: 4,

              transform: [{ scaleX: -1 }],
            }}
          />
        )}

        {sockGameOpen === false && (
          <Pressable
            onPress={() => handleGameOpen()}
            style={{
              position: "absolute",
              contentFit: "contain",
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
              position: "absolute",
              contentFit: "contain",
              width: 110,
              height: 110,
              top: 675,
              left: 435,
              zIndex: 4,
              transform: [
                {
                  rotate: "40deg",
                },
                { scaleX: -1 },
              ],
            }}
          />
        )}

        {sockGameOpen === false && (
          <Pressable
            onPress={() => handleGameOpen()}
            style={{
              position: "absolute",
              contentFit: "contain",
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
              position: "absolute",
              contentFit: "contain",
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
              position: "absolute",
              contentFit: "contain",
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
              position: "absolute",
              contentFit: "contain",
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
              position: "absolute",
              contentFit: "contain",
              width: 115,
              height: 115,
              top: 675,
              left: 695,
              zIndex: 4,
            }}
          />
        )}

        {sockGameOpen === true && (
          <SockGameView
            styles={styles}
            handleGameOpen={handleGameOpen}
            style={{
              zIndex: 50,
            }}
          />
        )}

        {/* story book component */}

        {isBookOpen === false && (
          <Pressable
            onPress={() => {
              setIsBookOpen(true);
              {
                stopBedroomAmbientSound();
              }
            }}
            style={{
              position: "absolute",
              height: 220,
              width: 220,
              left: 420,
              top: 450,
              zIndex: 5,
            }}
          >
            <Image
              source={require("./assets/Bedroom/books.png")}
              style={{
                contentFit: "contain",
                height: 220,
                width: 220,
                zIndex: 5,
              }}
            />
          </Pressable>
        )}

        {isBookOpen === true && (
          <BookView
            //   todo remove unnecessary props
            storyIsPaused={storyIsPaused}
            pausePlayStory={pausePlayStory}
            currentStory={currentStory}
            setCurrentStory={setCurrentStory}
            storyTitles={storyTitles}
            styles={styles}
            renderStoryContents={renderStoryContents}
            handleBookClose={handleBookClose}
            handleStoryClose={handleStoryClose}
          />
        )}
      </ImageBackground>
    );
  }
}
