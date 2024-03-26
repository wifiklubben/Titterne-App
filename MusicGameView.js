import React, { useEffect, useState } from "react";
import { View, ImageBackground, Pressable, Text, Image } from "react-native";

import { Audio } from "expo-av";

import Multitrack from "./Multitrack";
import Piano from "./Piano";

export default function MusicGameView(props) {
  // audio load
  const [musicLoaded, setMusicLoaded] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const [track1, setTrack1] = useState();
  const [track2, setTrack2] = useState();
  const [track3, setTrack3] = useState();
  const [track4, setTrack4] = useState();
  const [track5, setTrack5] = useState();
  const [track6, setTrack6] = useState();
  const [track7, setTrack7] = useState();
  const [track8, setTrack8] = useState();

  const [volume1, setVolume1] = useState(0.0);
  const [volume2, setVolume2] = useState(0.0);
  const [volume3, setVolume3] = useState(0.0);
  const [volume4, setVolume4] = useState(0.0);
  const [volume5, setVolume5] = useState(0.0);
  const [volume6, setVolume6] = useState(0.0);
  const [volume7, setVolume7] = useState(0.0);
  const [volume8, setVolume8] = useState(0.0);

  const [soundSet, setSoundSet] = useState("Piano");

  //loading music

  useEffect(() => {
    async function loadMusic1() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/Multitracks/Titel_Stem_bas.mp3"));
        setTrack1(sound);
        sound.setIsLoopingAsync(true);
        console.log("track one set");
      } catch (error) {
        console.log("error in initial loadMusic of track 1", error);
      }
    }
    async function loadMusic2() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/Multitracks/Titel_Stem_Grin.mp3"));
        setTrack2(sound);
        sound.setIsLoopingAsync(true);
      } catch (error) {
        console.log("error in initial loadMusic of track 2: ", error);
      }
    }
    async function loadMusic3() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/Multitracks/Titel_Stem_Guitar.mp3"));
        setTrack3(sound);
        sound.setIsLoopingAsync(true);
      } catch (error) {
        console.log("error in initial loadMusic of track 3: ", error);
      }
    }
    async function loadMusic4() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/Multitracks/Titel_Stem_Orgel.mp3"));
        setTrack4(sound);
        sound.setIsLoopingAsync(true);
      } catch (error) {
        console.log("error in initial loadMusic of track 4: ", error);
      }
    }
    async function loadMusic5() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/Multitracks/Titel_Stem_perc1.mp3"));
        setTrack5(sound);
        sound.setIsLoopingAsync(true);
      } catch (error) {
        console.log("error in initial loadMusic of track 5: ", error);
      }
    }
    async function loadMusic6() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/Multitracks/Titel_Stem_perc2.mp3"));
        setTrack6(sound);
        sound.setIsLoopingAsync(true);
      } catch (error) {
        console.log("error in initial loadMusic of track 6: ", error);
      }
    }
    async function loadMusic7() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/Multitracks/Titel_Stem_Tema.mp3"));
        setTrack7(sound);
        sound.setIsLoopingAsync(true);
      } catch (error) {
        console.log("error in initial loadMusic of track 7: ", error);
      }
    }
    async function loadMusic8() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/piano/Multitracks/Titel_Stem_Vibrafon.mp3"));
        setTrack8(sound);
        sound.setIsLoopingAsync(true);
      } catch (error) {
        console.log("error in initial loadMusic of track 8: ", error);
      }
    }

    loadMusic1();
    loadMusic2();
    loadMusic3();
    loadMusic4();
    loadMusic5();
    loadMusic6();
    loadMusic7();
    loadMusic8();
    setMusicLoaded(true);
  }, []);

  // unload tracks on unmount

  useEffect(() => {
    if (track1) {
      return () => {
        if (track1) {
          track1.unloadAsync();
        }
      };
    }
  }, [track1]);

  useEffect(() => {
    if (track2) {
      return () => {
        if (track2) {
          track2.unloadAsync();
        }
      };
    }
  }, [track2]);

  useEffect(() => {
    if (track3) {
      return () => {
        if (track3) {
          track3.unloadAsync();
        }
      };
    }
  }, [track3]);

  useEffect(() => {
    if (track4) {
      return () => {
        if (track4) {
          track4.unloadAsync();
        }
      };
    }
  }, [track4]);

  useEffect(() => {
    if (track5) {
      return () => {
        if (track5) {
          track5.unloadAsync();
        }
      };
    }
  }, [track5]);

  useEffect(() => {
    if (track6) {
      return () => {
        if (track6) {
          track6.unloadAsync();
        }
      };
    }
  }, [track6]);

  useEffect(() => {
    if (track7) {
      return () => {
        if (track7) {
          track7.unloadAsync();
        }
      };
    }
  }, [track7]);

  useEffect(() => {
    if (track8) {
      return () => {
        if (track8) {
          track8.unloadAsync();
        }
      };
    }
  }, [track8]);

  // play music funtion
  async function playMusic() {
    if (musicPlaying === false) {
      try {
        if (musicLoaded) {
          await track1.setVolumeAsync(volume1);
          await track2.setVolumeAsync(volume2);
          await track3.setVolumeAsync(volume3);
          await track4.setVolumeAsync(volume4);
          await track5.setVolumeAsync(volume5);
          await track6.setVolumeAsync(volume6);
          await track7.setVolumeAsync(volume7);
          await track8.setVolumeAsync(volume8);

          await track1.playAsync();
          await track2.playAsync();
          await track3.playAsync();
          await track4.playAsync();
          await track5.playAsync();
          await track6.playAsync();
          await track7.playAsync();
          await track8.playAsync();

          setMusicPlaying(true);

          console.log("tracks playing");
        }
      } catch (error) {
        console.log("This is the error: ", error);
      }
    } else {
      try {
        if (musicLoaded) {
          await track1.setVolumeAsync(volume1);
          await track2.setVolumeAsync(volume2);
          await track3.setVolumeAsync(volume3);
          await track4.setVolumeAsync(volume4);
          await track5.setVolumeAsync(volume5);
          await track6.setVolumeAsync(volume6);
          await track7.setVolumeAsync(volume7);
          await track8.setVolumeAsync(volume8);

          await track1.pauseAsync();
          await track2.pauseAsync();
          await track3.pauseAsync();
          await track4.pauseAsync();
          await track5.pauseAsync();
          await track6.pauseAsync();
          await track7.pauseAsync();
          await track8.pauseAsync();

          setMusicPlaying(false);
          console.log("tracks paused");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  // change volume1 function
  useEffect(() => {
    async function changeVolume1() {
      try {
        if (musicLoaded) {
          await track1.setVolumeAsync(volume1);
        }
      } catch (error) {
        console.log("error changing volume1: ", error);
      }
    }
    changeVolume1();
  }, [volume1]);

  // volume handling 1
  const handleVolumeChange1 = (rawVolume) => {
    setVolume1(rawVolume);
  };

  // change volume2 function
  useEffect(() => {
    async function changeVolume2() {
      try {
        if (musicLoaded) {
          await track2.setVolumeAsync(volume2);
        }
      } catch (error) {
        console.log("error changing volume2: ", error);
      }
    }
    changeVolume2();
  }, [volume2]);

  // volume handling 2
  const handleVolumeChange2 = (newVolume) => {
    setVolume2(newVolume);
  };

  // change volume3 function
  useEffect(() => {
    async function changeVolume3() {
      try {
        if (musicLoaded) {
          await track3.setVolumeAsync(volume3);
        }
      } catch (error) {
        console.log("error changing volume3: ", error);
      }
    }
    changeVolume3();
  }, [volume3]);

  // volume handling 3
  const handleVolumeChange3 = (newVolume) => {
    setVolume3(newVolume);
  };

  // change volume4 function
  useEffect(() => {
    async function changeVolume4() {
      try {
        if (musicLoaded) {
          await track4.setVolumeAsync(volume4);
        }
      } catch (error) {
        console.log("error changing volume4: ", error);
      }
    }
    changeVolume4();
  }, [volume4]);

  // volume handling 4
  const handleVolumeChange4 = (newVolume) => {
    setVolume4(newVolume);
  };

  // change volume5 5function
  useEffect(() => {
    async function changeVolume5() {
      try {
        if (musicLoaded) {
          await track5.setVolumeAsync(volume5);
        }
      } catch (error) {
        console.log("error changing volume5: ", error);
      }
    }
    changeVolume5();
  }, [volume5]);

  // volume handling 5
  const handleVolumeChange5 = (newVolume) => {
    setVolume5(newVolume);
  };

  // change volume6 function
  useEffect(() => {
    async function changeVolume6() {
      try {
        if (musicLoaded) {
          await track6.setVolumeAsync(volume6);
        }
      } catch (error) {
        console.log("error changing volume6: ", error);
      }
    }
    changeVolume6();
  }, [volume6]);

  // volume handling 3
  const handleVolumeChange6 = (newVolume) => {
    setVolume6(newVolume);
  };

  // change volume7 function
  useEffect(() => {
    async function changeVolume7() {
      try {
        if (musicLoaded) {
          await track7.setVolumeAsync(volume7);
        }
      } catch (error) {
        console.log("error changing volume7: ", error);
      }
    }
    changeVolume7();
  }, [volume7]);

  // volume handling 7
  const handleVolumeChange7 = (newVolume) => {
    setVolume7(newVolume);
  };

  // change volume8 function
  useEffect(() => {
    async function changeVolume8() {
      try {
        if (musicLoaded) {
          await track8.setVolumeAsync(volume8);
        }
      } catch (error) {
        console.log("error changing volume8: ", error);
      }
    }
    changeVolume8();
  }, [volume8]);

  // volume handling 3
  const handleVolumeChange8 = (newVolume) => {
    setVolume8(newVolume);
  };

  const changeSoundSet = (newSoundSet) => {
    setSoundSet(newSoundSet);

    console.log("just set new SoundSet to: ", newSoundSet);
  };

  return (
    <ImageBackground
      source={require("./assets/MusicRoom/MusicRoomAssets/musicRoomBG.png")}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 5,
      }}
    >
      <Pressable
        onPress={() => changeSoundSet("Piano")}
        style={{
          position: "absolute",
          right: 40,
          top: 100,
          height: 120,
          width: 120,
          zIndex: 10,
        }}
      >
        <Image
          source={require("./assets/MusicRoom/KeyboardAssets/PianoButton.png")}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </Pressable>

      <Pressable
        onPress={() => changeSoundSet("Farts")}
        style={{
          position: "absolute",
          right: 40,
          top: 200,
          height: 120,
          width: 120,
          zIndex: 10,
        }}
      >
        <Image
          source={require("./assets/MusicRoom/KeyboardAssets/FartButton.png")}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </Pressable>

      <Pressable
        onPress={() => props.handleMusicGameOpen()}
        style={{
          position: "absolute",
          right: 20,
          top: 20,
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

      <Piano soundSet={soundSet} setSoundSet={setSoundSet} />

      <View
        style={{
          position: "absolute",
          top: 180,
          left: 85,
        }}
      >
        <Pressable onPress={playMusic}>
          {!musicPlaying && (
            <Image
              source={require("./assets/MusicRoom/KeyboardAssets/PlayButton.png")}
              style={{
                width: 100,
                height: 100,
              }}
            />
          )}

          {musicPlaying && (
            <Image
              source={require("./assets/MusicRoom/KeyboardAssets/PauseButton.png")}
              style={{
                width: 100,
                height: 100,
              }}
            />
          )}
        </Pressable>
      </View>

      <View style={props.styles.musicButtonContainer}>
        <Multitrack styles={props.styles} volume={volume1} handleVolumeChange={handleVolumeChange1} />

        <Multitrack styles={props.styles} volume={volume2} handleVolumeChange={handleVolumeChange2} />

        <Multitrack styles={props.styles} volume={volume3} handleVolumeChange={handleVolumeChange3} />

        <Multitrack styles={props.styles} volume={volume4} handleVolumeChange={handleVolumeChange4} />

        <Multitrack styles={props.styles} volume={volume5} handleVolumeChange={handleVolumeChange5} />

        <Multitrack styles={props.styles} volume={volume6} handleVolumeChange={handleVolumeChange6} />

        <Multitrack styles={props.styles} volume={volume7} handleVolumeChange={handleVolumeChange7} />

        <Multitrack styles={props.styles} volume={volume8} handleVolumeChange={handleVolumeChange8} />
      </View>
    </ImageBackground>
  );
}
