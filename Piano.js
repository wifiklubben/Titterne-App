import React, { useEffect, useState } from "react";

import { StyleSheet, View, ImageBackground, Animated, Pressable, Image } from "react-native";

import { Audio } from "expo-av";

function Piano(props) {
  const [playingRightNow, setPlayingRightNow] = useState(false);

  // piano key sounds
  const [keyC, setKeyC] = useState();
  const [keyCs, setKeyCs] = useState();
  const [keyD, setKeyD] = useState();
  const [keyDs, setKeyDs] = useState();
  const [keyE, setKeyE] = useState();
  const [keyF, setKeyF] = useState();
  const [keyFs, setKeyFs] = useState();
  const [keyG, setKeyG] = useState();
  const [keyGs, setKeyGs] = useState();
  const [keyA, setKeyA] = useState();
  const [keyAs, setKeyAs] = useState();
  const [keyB, setKeyB] = useState();
  const [keyC2, setKeyC2] = useState();

  // sound sets

  // decide sound sets

  //  if props.soundSet === 'piano'

  useEffect(() => {
    switch (props.soundSet) {
      case "Piano":
        setKeysToPiano();
        console.log("piano is loading!!");
        break;
      case "Farts":
        setKeysToFarts();
        console.log("farts are loaded!!");
        break;
    }
  }, [props.soundSet]);

  // set All keys to appropriate piano sounds

  async function setKeysToPiano() {
    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/audio_C.mp3"));
      setKeyC(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyC: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/audio_Cs.mp3"));
      setKeyCs(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyCs: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/audio_D.mp3"));
      setKeyD(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyD: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/audio_Ds.mp3"));
      setKeyDs(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyDs: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/audio_E.mp3"));
      setKeyE(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyE: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/audio_F.mp3"));
      setKeyF(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyF: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/audio_Fs.mp3"));
      setKeyFs(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyFs: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/audio_G.mp3"));
      setKeyG(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyG: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/audio_Gs.mp3"));
      setKeyGs(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyGs: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/audio_A.mp3"));
      setKeyA(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyA: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/audio_As.mp3"));
      setKeyAs(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyAs: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/audio_B.mp3"));
      setKeyB(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyB: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/audio_C2.mp3"));
      setKeyC2(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyC2: ", error);
    }
  }

  // set ALL keys to approppriate fart sounds

  async function setKeysToFarts() {
    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/fartC.mp3"));
      setKeyC(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyC: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/fartCs.mp3"));
      setKeyCs(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyCs: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/fartD.mp3"));
      setKeyD(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyD: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/fartDs.mp3"));
      setKeyDs(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyDs: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/fartE.mp3"));
      setKeyE(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyE: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/fartF.mp3"));
      setKeyF(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyF: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/fartFs.mp3"));
      setKeyFs(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyFs: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/fartG.mp3"));
      setKeyG(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyG: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/fartGs.mp3"));
      setKeyGs(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyGs: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/fartA.mp3"));
      setKeyA(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyA: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/fartAs.mp3"));
      setKeyAs(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyAs: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/fartB.mp3"));
      setKeyB(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyB: ", error);
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/fartC2.mp3"));
      setKeyC2(sound);
    } catch (error) {
      console.log("error in initial loadMusic of keyC2: ", error);
    }
  }

  // onPress play sound

  async function playKeyC() {
    console.log("playing key C!");
    await keyC.replayAsync();
  }

  async function playKeyCs() {
    console.log("playing key Cs!");
    await keyCs.replayAsync();
  }

  async function playKeyD() {
    console.log("playing key D!");
    await keyD.replayAsync();
  }

  async function playKeyDs() {
    console.log("playing key Ds!");
    await keyDs.replayAsync();
  }

  async function playKeyE() {
    console.log("playing key E!");
    await keyE.replayAsync();
  }

  async function playKeyF() {
    console.log("playing key F!");
    await keyF.replayAsync();
  }

  async function playKeyFs() {
    console.log("playing key Fs!");
    await keyFs.replayAsync();
  }

  async function playKeyG() {
    console.log("playing key G!");
    await keyG.replayAsync();
  }

  async function playKeyGs() {
    console.log("playing key Gs!");
    await keyGs.replayAsync();
  }

  async function playKeyA() {
    console.log("playing key A!");
    await keyA.replayAsync();
  }

  async function playKeyAs() {
    console.log("playing key As!");
    await keyAs.replayAsync();
  }

  async function playKeyB() {
    console.log("playing key B!");
    await keyB.replayAsync();
  }
  async function playKeyC2() {
    console.log("playing key C2!");
    await keyC2.replayAsync();
  }

  const pianoStyles = StyleSheet.create({
    whiteKey: {
      borderWidth: 2,
      borderColor: "black",
      backgroundColor: "white",
      height: "100%",
      width: "12.5%",
    },

    nonKey: {
      width: "8.4%",
      height: "100%",
      pointerEvents: "none",
    },

    blackKey: {
      width: "8.4%",
      height: "100%",
      backgroundColor: "black",
    },
  });

  return (
    <>
      <Image
        source={require("./assets/MusicRoom/KeyboardAssets/KeyboardClean.png")}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1100,
          height: 830,
          resizeMode: "contain",
        }}
      />
      <View
        style={{
          left: 330,
          top: 420,
          width: 605,
          height: 200,
          opacity: 0,
        }}
      >
        {/* white keys */}
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "black",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Pressable style={pianoStyles.whiteKey} onPress={() => playKeyC()} />
          <Pressable style={pianoStyles.whiteKey} onPress={() => playKeyD()} />
          <Pressable style={pianoStyles.whiteKey} onPress={() => playKeyE()} />
          <Pressable style={pianoStyles.whiteKey} onPress={() => playKeyF()} />
          <Pressable style={pianoStyles.whiteKey} onPress={() => playKeyG()} />
          <Pressable style={pianoStyles.whiteKey} onPress={() => playKeyA()} />
          <Pressable style={pianoStyles.whiteKey} onPress={() => playKeyB()} />
          <Pressable style={pianoStyles.whiteKey} onPress={() => playKeyC2()} />
        </View>

        {/* black keys */}
        <View
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "87.5%",
            height: "65%",
          }}
        >
          <View style={pianoStyles.nonKey} />
          <Pressable style={pianoStyles.blackKey} onPress={() => playKeyCs()} />
          <View style={pianoStyles.nonKey} />
          <Pressable style={pianoStyles.blackKey} onPress={() => playKeyDs()} />
          <View style={pianoStyles.nonKey} />
          <View style={pianoStyles.nonKey} />
          <Pressable style={pianoStyles.blackKey} onPress={() => playKeyFs()} />
          <View style={pianoStyles.nonKey} />
          <Pressable style={pianoStyles.blackKey} onPress={() => playKeyGs()} />
          <View style={pianoStyles.nonKey} />
          <Pressable style={pianoStyles.blackKey} onPress={() => playKeyAs()} />
          <View style={pianoStyles.nonKey} />
          <View style={pianoStyles.nonKey} />
        </View>
      </View>
    </>
  );
}

export default Piano;
