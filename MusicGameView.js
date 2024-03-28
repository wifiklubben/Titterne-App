import React, { useEffect, useState } from "react";
import { View, ImageBackground, Pressable, Text, Image } from "react-native";

import { Audio } from "expo-av";

import Multitrack from "./Multitrack";
import Piano from "./Piano";

export default function MusicGameView(props) {
  // audio load
  const [musicLoaded, setMusicLoaded] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [volumes, setVolumes] = useState(Array(4).fill(0.0));
  const [soundSet, setSoundSet] = useState("Piano");

  //preloading music tracks

  useEffect(() => {
    async function loadMusic() {
      try {
        const tracksToLoad = [
          require("./assets/audio/piano/Multitracks/Titel_Stem_bas.mp3"),
          // require("./assets/audio/piano/Multitracks/Titel_Stem_Grin.mp3"),
          require("./assets/audio/piano/Multitracks/Titel_Stem_Guitar.mp3"),
          // require("./assets/audio/piano/Multitracks/Titel_Stem_Orgel.mp3"),
          require("./assets/audio/piano/Multitracks/Titel_Stem_perc1.mp3"),
          // require("./assets/audio/piano/Multitracks/Titel_Stem_perc2.mp3"),
          // require("./assets/audio/piano/Multitracks/Titel_Stem_Tema.mp3"),
          require("./assets/audio/piano/Multitracks/Titel_Stem_Vibrafon.mp3"),
        ];

        const loadingPromises = tracksToLoad.map(async (track) => {
          const { sound } = await Audio.Sound.createAsync(track);
          sound.setIsLoopingAsync(true);
          return sound;
        });

        const loadedTracks = await Promise.all(loadingPromises);
        setTracks(loadedTracks);
        setMusicLoaded(true);
      } catch (error) {
        console.log("error loading music:", error);
      }
    }

    loadMusic();

    // Unload tracks on component unmount
    return () => {
      tracks.forEach((track) => track.unloadAsync());
    };
  }, []);

  const handleVolumeChange = (index, newVolume) => {
    const newVolumes = [...volumes];
    newVolumes[index] = newVolume; // Update volume for the specified track
    setVolumes(newVolumes);
  };

  // Volume change effects for all tracks
  useEffect(() => {
    async function changeVolume(index) {
      try {
        if (musicLoaded) {
          await tracks[index].setVolumeAsync(volumes[index]);
        }
      } catch (error) {
        console.log(`Error changing volume for track ${index}:`, error);
      }
    }

    volumes.forEach((_, index) => changeVolume(index));
  }, [volumes, musicLoaded, tracks]);

  // play music funtion
  async function playMusic() {
    if (!musicLoaded) return;
    try {
      if (!musicPlaying) {
        await Promise.all(tracks.map((track) => track.playAsync())); // Start playback for all tracks
        console.log("Tracks playing");
        setMusicPlaying(true);
      } else {
        await Promise.all(tracks.map((track) => track.pauseAsync())); // Pause all tracks
        console.log("Tracks paused");
        setMusicPlaying(false);
      }

      setMusicPlaying(!musicPlaying);
    } catch (error) {
      console.log("Error toggling music playback:", error);
    }
  }

  async function stopTracks() {
    try {
      setVolumes(Array(tracks.length).fill(0));
      const pausePromises = tracks.map((track) => track.pauseAsync());
      await Promise.all(pausePromises);
      console.log("All tracks stopped");
      setMusicPlaying(false); // Update musicPlaying state if needed
    } catch (error) {
      console.log("Error stopping tracks:", error);
    }
  }

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
          right: "25%",
          top: "28%",
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
          right: "10%",
          top: "28%",
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
        onPress={async () => {
          await stopTracks(); // Stop all tracks before handling music game open event
          props.handleMusicGameOpen(); // Handle music game opening event
        }}
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
          top: "30%",
          left: "10%",
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

      <View
        style={{
          position: "absolute",
          top: "50%",
          left: "12%",
          transform: [{ rotate: "270deg" }],
        }}
      >
        {volumes.map((volume, index) => (
          <Multitrack
            key={`track-${index}`} // Add a unique key for each Multitrack component
            styles={props.styles}
            volume={volume}
            handleVolumeChange={(newVolume) => handleVolumeChange(index, newVolume)} // Pass the index along with the new volume
          />
        ))}
      </View>
    </ImageBackground>
  );
}
