import React, { useEffect, useState } from "react";
import {
  AppState,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Pressable,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import { Audio } from "expo-av";

import moment from "moment";

import { create } from "zustand";

import HomeIcon from "./assets/graphics/homeIcon.svg";
import SettingsIcon from "./assets/graphics/settingsIcon";

import HomeView from "./HomeView";
import MusicRoomView from "./MusicRoomView";
import SettingsView from "./SettingsView";
import BedroomView from "./BedroomView";
import TreehouseView from "./TreehouseView";
import ConservatoryView from "./ConservatoryView";
import BathroomView from "./rooms/bathroom/BathroomView";

// locally stored variables
const useStore = create((set) => ({
  showTutorial: false,
  //todo set to true once user has seen it

  sleepControlActive: false,
  toggleSleepControlActive: () =>
    set((state) => ({ sleepControlActive: !state.sleepControlActive })),
  sleepControlMorning: new Date(),
  changeSleepControlMorning: (e) => set({ sleepControlMorning: e }),
  sleepControlNight: new Date(),
  changeSleepControlNight: (e) => set({ sleepControlNight: e }),
}));

export default () => {
  // ********* VARIABLES *******************

  // define screen dimensions
  const fullWidth = Dimensions.get("window").width;
  const fullHeight = Dimensions.get("window").height;

  //load Bubblegum font
  const [fontLoaded] = useFonts({
    Bubblegum: require("./assets/fonts/BubblegumSans-Regular.ttf"),
  });

  // ********* STATES ************

  // parental controls states

  // const [sleepControlActive, setSleepControlActive] = useState(false)
  const [isNightTime, setIsNightTime] = useState(false);

  const [elapsedTime, setElapsedTime] = useState(0);

  const [appOpenTime, setAppOpenTime] = useState(new Date().getTime());

  const [timeLimitActive, setTimeLimitActive] = useState(false);
  const [timeLimitAmount, setTimeLimitAmount] = useState(0);

  const sleepControlNight = useStore((state) => state.sleepControlNight);
  const sleepControlMorning = useStore((state) => state.sleepControlMorning);
  const sleepControlActive = useStore((state) => state.sleepControlActive);

  // Room codes:
  // HouseView = 1,
  // MusicRoom = 2,
  // Bedroom = 3,
  // Treehouse = 4,
  // Conservatory = 5,
  // Bathroom = 6,
  // Settings = 30,

  // set page being viewed, default 1
  const [activeView, setActiveView] = useState(3);

  const handleViewChange = (viewNumber) => {
    setActiveView(viewNumber);
  };

  const [showIntroAnimation, setShowIntroAnimation] = useState(true);

  // is content cached yet?
  const [isLoaded, setIsLoaded] = useState(false);

  // Parental control

  let timeLimitFlag;
  let bedTimeFlag;

  useEffect(() => {
    //  Time Limit check
    const intervalId = setInterval(() => {
      const currentTime = moment().format("x");
      const currentTimeHuman = moment().format();
      const elapsedMilliseconds = currentTime - appOpenTime;
      const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
      const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));

      setElapsedTime(elapsedMinutes);

      // console.log("elapsed seconds ", elapsedSeconds);
      // console.log("elapsed minutes ", elapsedMinutes);
      // console.log("time limit: ", timeLimitAmountValue);
      // console.log("time limit is:  ", timeLimitActiveValue);

      // console.log("sleep control active: ", sleepControlActive);
      // console.log("current time: ", currentTimeHuman);
      // console.log("sleep time  : ", sleepControlNight);

      if (elapsedMinutes >= timeLimitAmount && timeLimitActive) {
        timeLimitFlag = true;
        console.log("overtime!");
      } else {
        timeLimitFlag = false;
      }

      // bed time check
      if (currentTime > sleepControlNight && sleepControlActive) {
        bedTimeFlag = true;
      } else if (currentTime < sleepControlMorning && sleepControlActive) {
        bedTimeFlag = true;
      } else {
        bedTimeFlag = false;
      }

      // setNightMode
      if (bedTimeFlag || timeLimitFlag) {
        setIsNightTime(true);
      } else {
        setIsNightTime(false);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [activeView]);

  // music

  const [birdsAmbientSound, setBirdsAmbientSound] = useState();
  const [treesAmbientSound, setTreesAmbientSound] = useState();
  const [musicRoomAmbient, setMusicRoomAmbientSound] = useState();

  SplashScreen.preventAutoHideAsync();

  // ********* EFFECTS ************

  //  BG audio form home screen

  useEffect(() => {
    async function loadBirdsAmbientSound() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("./assets/audio/birdsAmbient.mp3")
        );
        sound.setVolumeAsync(0.5);
        sound.setIsLoopingAsync(true);
        setBirdsAmbientSound(sound);
      } catch (error) {
        console.log("error loading birds ambient sound: ", error);
      }
    }

    async function loadTreesAmbientSound() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("./assets/audio/trees.mp3")
        );

        sound.setVolumeAsync(0.3);
        sound.setIsLoopingAsync(true);
        setTreesAmbientSound(sound);
      } catch (error) {
        console.log("error loading trees ambient sound ", error);
      }
    }

    async function loadMusicRoomAmbientSound() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("./assets/audio/MusicRoomLoop.mp3")
        );
        sound.setVolumeAsync(0.5);
        sound.setIsLoopingAsync(true);
        setMusicRoomAmbientSound(sound);
      } catch (error) {
        console.log("error loading music room ambient sound: ", error);
      }
    }

    loadTreesAmbientSound();
    loadBirdsAmbientSound();
    loadMusicRoomAmbientSound();
  }, []);

  // background music/sounds per room view
  useEffect(() => {
    console.log("activeView: ", activeView);

    if (activeView === 1 && birdsAmbientSound) {
      if (treesAmbientSound) {
        treesAmbientSound.stopAsync();
      }

      if (musicRoomAmbient) {
        musicRoomAmbient.stopAsync();
      }

      birdsAmbientSound.playAsync();
    } else if (activeView === 2 && musicRoomAmbient) {
      console.log("musicRoomAmbient playing");
      if (birdsAmbientSound) {
        birdsAmbientSound.stopAsync();
      }

      musicRoomAmbient.playAsync();
    } else if (activeView === 3) {
      if (birdsAmbientSound) {
        birdsAmbientSound.stopAsync();
      }
    } else if (activeView === 4 && treesAmbientSound) {
      if (birdsAmbientSound) {
        birdsAmbientSound.stopAsync();
      }

      treesAmbientSound.playAsync();
    } else if (activeView === 6) {
      if (birdsAmbientSound) {
        birdsAmbientSound.stopAsync();
      }
    }
  }, [activeView]);

  //splashscreen for hiding loading assets

  useEffect(() => {
    const loadAssets = async () => {
      const images = [
        require("./assets/sky.png"),
        require("./assets/Bg_trees.png"),
        require("./assets/House.png"),
        require("./assets/House_open_music_room.png"),
        require("./assets/forground.png"),
        require("./assets/TitterneLogo.png"),
        require("./assets/HouseNight.png"),
      ];

      const cacheImages = images.map((image) => {
        return Asset.fromModule(image).downloadAsync();
      });

      try {
        await Promise.all(cacheImages);

        setIsLoaded(true);

        await SplashScreen.hideAsync();
      } catch (error) {
        console.warn("Error: ", error);
      }
    };

    loadAssets();
  }, []);

  // ********* STYLES ***********************

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#8AC1DF",
      alignItems: "center",
      width: fullWidth,
    },

    backgroundImage: {
      position: "relative",
      flex: 1,
      width: "100%",
      left: "-50%",
    },

    fullWidthBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      zIndex: 1,
    },

    animationContainer: {
      width: "100%",
      height: "100%",
    },

    settingsContainer: {
      display: "flex",
      gap: 50,
      height: "100%",
      width: "100%",
      alignItems: "center",
      paddingTop: 100,
    },

    buttonContainer: {
      position: "absolute",
      bottom: 50,
      right: 50,
      height: 100,
      flexDirection: "row",
      gap: 10,
      zIndex: 100,
    },

    musicButtonContainer: {
      transform: [{ rotate: "270deg" }],
      position: "absolute",
      top: 10,
      right: 500,
      flexDirection: "column",
      gap: 35,
      backgroundColor: "black",
    },

    musicSlider: {
      width: 150,
      height: 40,
    },

    roundButton: {
      backgroundColor: "white",
      width: 100,
      height: 100,
      borderRadius: 100,
      borderWidth: 3,
      borderColor: "black",
      justifyContent: "center",
      alignItems: "center",
    },

    MusicRoomButton: {
      position: "absolute",
      width: 135,
      height: 160,
      left: fullWidth / 2 + 10,
      top: fullHeight / 2 - 140,
    },

    BedroomButton: {
      position: "absolute",
      width: 135,
      height: 160,
      left: fullWidth / 2 - 210,
      top: fullHeight / 2 - 140,
    },

    TreehouseButton: {
      position: "absolute",
      left: fullWidth / 2 + 205,
      top: fullHeight / 2 - 120,
      width: 145,
      height: 160,
    },

    ConservatoryButton: {
      position: "absolute",
      height: 120,
      width: 120,
      left: fullWidth / 2 - 350,
      top: fullHeight / 2 + 70,
    },

    BathroomButton: {
      position: "absolute",
      height: 120,
      width: 120,
      left: fullWidth / 2 - 40,
      top: fullHeight / 2 + 70,
    },

    h1Text: {
      fontSize: 60,
      fontFamily: "Bubblegum",
      color: "white",
    },

    h2Text: {
      fontFamily: "Bubblegum",
      fontSize: 50,
    },

    pText: {
      fontFamily: "Bubblegum",
      fontSize: 30,
    },
  });

  return (
    <View style={styles.container}>
      {/* Home View */}

      {activeView === 1 && (
        <HomeView
          styles={styles}
          isLoaded={isLoaded}
          isNightTime={isNightTime}
          setShowIntroAnimation={setShowIntroAnimation}
          showIntroAnimation={showIntroAnimation}
          activeView={activeView}
          useStore={useStore}
        >
          <ImageBackground source={require("./assets/Music_room_icon.png")}>
            <Pressable
              onPress={() => handleViewChange(2)}
              style={styles.MusicRoomButton}
            ></Pressable>
          </ImageBackground>

          <Pressable
            onPress={() => handleViewChange(3)}
            style={styles.BedroomButton}
          ></Pressable>

          <ImageBackground
            source={require("./assets/SkyDancing.png")}
            style={{
              position: "absolute",
              height: 70,
              width: 70,
              left: fullWidth / 2 + 245,
              top: fullHeight / 2 - 62,
              overflow: "visible",
            }}
          />
          <Pressable
            onPress={() => handleViewChange(4)}
            style={styles.TreehouseButton}
          />

          <ImageBackground
            source={require("./assets/SkyDancing.png")}
            style={{
              position: "absolute",
              height: 100,
              width: 100,
              left: fullWidth / 2 - 300,
              top: fullHeight / 2 + 70,
            }}
          />
          <Pressable
            onPress={() => handleViewChange(5)}
            style={styles.ConservatoryButton}
          />

          {/* <ImageBackground
            source={require("./assets/Thorden.png")}
            style={{
              position: "absolute",
              height: 100,
              width: 100,
              left: fullWidth / 2 - 40,
              top: fullHeight / 2 + 70,
            }}
          />
          <Pressable onPress={() => handleViewChange(6)} style={styles.BathroomButton} /> */}
        </HomeView>
      )}

      {/* Music Room View */}
      {activeView === 2 && (
        <MusicRoomView styles={styles} activeView={activeView} />
      )}

      {/* Bedroom View */}
      {activeView === 3 && (
        <BedroomView styles={styles} activeView={activeView} />
      )}

      {/* Treehouse View */}
      {activeView === 4 && (
        <TreehouseView styles={styles} activeView={activeView} />
      )}

      {/* Conservartory View */}
      {activeView === 5 && (
        <ConservatoryView styles={styles} activeView={activeView} />
      )}

      {/* Bathroom View */}
      {activeView === 6 && (
        <BathroomView styles={styles} activeView={activeView} />
      )}

      {/* Settings View */}
      {activeView === 30 && (
        <SettingsView
          styles={styles}
          useStore={useStore}
          timeLimitActive={timeLimitActive}
          setTimeLimitActive={setTimeLimitActive}
          timeLimitAmount={timeLimitAmount}
          setTimeLimitAmount={setTimeLimitAmount}
          elapsedTime={elapsedTime}
        />
      )}

      {/* overview UI buttons, home/mute/settings */}

      {activeView > 0 && (
        <View style={styles.buttonContainer}>
          {activeView > 1 && (
            <Pressable
              style={styles.roundButton}
              onPress={() => handleViewChange(1)}
            >
              <HomeIcon width={72} height={72} />
            </Pressable>
          )}

          {activeView < 30 && (
            <Pressable
              style={styles.roundButton}
              onPress={() => handleViewChange(30)}
            >
              <SettingsIcon width={72} height={72} />
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
};
