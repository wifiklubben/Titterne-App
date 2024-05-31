import React, { useEffect, useState } from "react";
import { View, ImageBackground, Text, Image, Pressable, FlatList, Animated } from "react-native";

import { Audio } from "expo-av";

function PlanterView(props) {
  const [thisRound, setThisRound] = useState(0);
  const [timerInterval, setTimerInterval] = useState(2000);
  const [plantGrowthStage, setPlantGrowthStage] = useState(1);
  const [sunSound, setSunSound] = useState();
  const [waterSound, setWaterSound] = useState();
  const [growSound, setGrowSound] = useState();
  const [winSound, setWinSound] = useState();
  const [showGlowstar, setShowGlowstar] = useState(true);
  const [sunIsPressed, setSunIsPressed] = useState(false);
  const [canIsPressed, setCanIsPressed] = useState(false);

  //* load music
  useEffect(() => {
    async function loadSunSfx() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/Sunshine_notification.mp3"));
        setSunSound(sound);
      } catch (error) {
        console.log("error in initial loadSunSfx", error);
      }
    }

    async function loadWaterSfx() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/Watering_notification.mp3"));
        setWaterSound(sound);
      } catch (error) {
        console.log("error in initialloadWaterSfx", error);
      }
    }

    async function loadGrowSfx() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/Growing_plant.mp3"));
        setGrowSound(sound);
      } catch (error) {
        console.log("error in initial loadGrowSfx", error);
      }
    }

    async function loadWinSfx() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/Sunshining_plant.mp3"));
        setWinSound(sound);
      } catch (error) {
        console.log("error in initial loadWinSfx", error);
      }
    }

    loadGrowSfx();
    loadSunSfx();
    loadWaterSfx();
    loadWinSfx();
  }, []);

  //* play music

  async function playWaterSound() {
    try {
      waterSound.replayAsync();
    } catch (error) {
      console.log("error in playing SFX: ", error);
    }
  }

  async function playSunSound() {
    try {
      sunSound.replayAsync();
    } catch (error) {
      console.log("error in playing SFX: ", error);
    }
  }

  async function playGrowSound() {
    try {
      growSound.replayAsync();
    } catch (error) {
      console.log("error inm playing SFX: ", error);
    }
  }
  async function stopGrowSound() {
    try {
      growSound.stopAsync();
    } catch (error) {
      console.log("error inm playing SFX: ", error);
    }
  }

  async function playWinSound() {
    try {
      winSound.replayAsync();
    } catch (error) {
      console.log("error in playWindSound: ", error);
    }
  }

  //* use water and sunlight to help plant grow

  const addWater = () => {
    if (thisRound === 2) {
      plantGrowth();
    }
  };

  const addSun = () => {
    if (thisRound === 1) {
      plantGrowth();
    }
  };

  const plantGrowth = () => {
    if (plantGrowthStage <= 5) {
      console.log("not won yet!");
      setPlantGrowthStage(plantGrowthStage + 1);
      setTimerInterval(3800);
      playGrowSound();
    } else if (plantGrowthStage === 6) {
      stopGrowSound();
      setThisRound(0);
    }
  };

  useEffect(() => {
    if (plantGrowthStage === 6) {
      setTimerInterval(20000);
      playWinSound();
      setThisRound(0);
      stopGrowSound();
      setTimeout(() => {
        setPlantGrowthStage(1);
      }, 20000);
    }
  }, [plantGrowthStage]);

  useEffect(() => {
    return () => {
      if (waterSound) {
        waterSound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (sunSound) {
        sunSound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (growSound) {
        growSound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // randomly chooses either watering can or sun or nothing, can only choose one,
      let randNum = Math.floor(Math.random() * 2 + 1);
      setThisRound(randNum);
      setShowGlowstar(true);
      setCanIsPressed(false);
      setSunIsPressed(false);
    }, timerInterval);
    return () => {
      clearInterval(intervalId);
    };
  }, [timerInterval]);

  useEffect(() => {
    // when either can or sun is highlighted, sound also plays
    if (thisRound === 1) {
      playSunSound();
      setTimerInterval(20000);
    } else if (thisRound === 2) {
      playWaterSound();
      setTimerInterval(15000);
    }
    // else if (thisRound === 3) {
    //   setTimerInterval(2000);
    // }
  }, [thisRound]);

  // if correct pressable is pressed... plant grows to next stage
  // When plant gets to level 6, big party time, new plant starts

  return (
    <View
      justifyContent={"center"}
      alignItems={"center"}
      style={{
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        width: "100%",
        height: "100%",
      }}
    >
      <Pressable
        onPress={() => props.handleGameOpen()}
        style={{
          position: "absolute",
          right: 250,
          top: 130,
          zIndex: 100,
        }}
      >
        <Image
          source={require("./assets/Global/closeIcon.png")}
          style={{
            width: 80,
            height: 80,
            resizeMode: "contain",
          }}
        />
      </Pressable>

      <Pressable
        onPress={() => {
          if (canIsPressed) return;
          addWater();
          setShowGlowstar(false);
          setCanIsPressed(true);
        }}
        style={{
          position: "absolute",
          right: 217,
          top: 325,
          width: 230,
          height: 230,
        }}
      >
        {thisRound === 2 && showGlowstar && (
          <Animated.Image
            source={require("./assets/graphics/plants/glowStar.png")}
            style={{
              position: "absolute",
              left: -55,
              top: -55,
              height: 300,
              width: 300,
              resizeMode: "contain",
            }}
          />
        )}
        <Image
          source={require("./assets/graphics/plants/ConservatoryWaterringCan.png")}
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            resizeMode: "contain",
          }}
        />
      </Pressable>

      <Pressable
        onPress={() => {
          if (sunIsPressed) return;
          addSun();
          setShowGlowstar(false);
          setSunIsPressed(true);
        }}
        style={{
          position: "absolute",
          left: 280,
          top: 350,
          width: 230,
          height: 230,
        }}
      >
        {thisRound === 1 && showGlowstar && (
          <Animated.Image
            source={require("./assets/graphics/plants/glowStar.png")}
            style={{
              position: "absolute",
              left: -50,
              top: -50,
              height: "120%",
              width: "120%",
            }}
          />
        )}

        <Image
          source={require("./assets/graphics/plants/ConservatorySun.png")}
          style={{
            position: "absolute",
            height: "80%",
            width: "80%",
            resizeMode: "contain",
          }}
        />
      </Pressable>

      {plantGrowthStage === 6 && (
        <Animated.Image
          source={require("./assets/graphics/plants/glowStar.png")}
          style={{
            position: "absolute",
            height: 700,
            width: 700,
            bottom: 80,
            resizeMode: "contain",
          }}
        />
      )}

      {plantGrowthStage === 1 && (
        <Image
          source={require("./assets/graphics/plants/ConservatoryPlant_01.png")}
          style={{
            // position: 'absolute',
            // width: 150,
            // height: 300,
            // bottom: 90,
            position: "absolute",
            width: 190,
            height: 400,
            left: 456,
            top: 152,
          }}
        />
      )}

      {plantGrowthStage === 2 && (
        <Image
          source={require("./assets/graphics/plants/ConservatoryPlant_02.png")}
          style={{
            position: "absolute",
            width: 190,
            height: 400,
            left: 456,
            top: 152,
          }}
        />
      )}

      {plantGrowthStage === 3 && (
        <Image
          source={require("./assets/graphics/plants/ConservatoryPlant_03.png")}
          style={{
            position: "absolute",
            width: 190,
            height: 400,
            left: 456,
            top: 152,
          }}
        />
      )}

      {plantGrowthStage === 4 && (
        <Image
          source={require("./assets/graphics/plants/ConservatoryPlant_04.png")}
          style={{
            position: "absolute",
            width: 190,
            height: 400,
            left: 456,
            top: 152,
          }}
        />
      )}

      {plantGrowthStage === 5 && (
        <Image
          source={require("./assets/graphics/plants/ConservatoryPlant_05.png")}
          style={{
            position: "absolute",
            width: 190,
            height: 400,
            left: 456,
            top: 152,
          }}
        />
      )}

      {plantGrowthStage === 6 && (
        <Image
          source={require("./assets/graphics/plants/ConservatoryPlant_06.png")}
          style={{
            position: "absolute",
            width: 190,
            height: 400,
            left: 456,
            top: 152,
          }}
        />
      )}
    </View>
  );
}

export default PlanterView;
