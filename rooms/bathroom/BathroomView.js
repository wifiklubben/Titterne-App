import React from "react";
import { ImageBackground, Image, Pressable } from "react-native";
import Background from "./assets/bathroom_scene.png";
import { useState } from "react";
import BubbleGame from "./BubbleGame";

export default function BathroomView({ styles }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [bubbleGameIsOpen, setBubbleGameIsOpen] = useState(false);
  //function to open/close and reset the game
  const handleBubbleGame = () => {
    if (bubbleGameIsOpen === false) {
      boxIds = 0;
      console.log(boxIds);
      setBubbleGameIsOpen(true);
    } else if (bubbleGameIsOpen === true) {
      setBubbleGameIsOpen(false);
    }
    console.log(bubbleGameIsOpen);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <ImageBackground source={Background} style={styles.fullWidthBackground}>
      {bubbleGameIsOpen === false && (
        <Pressable onPress={handleBubbleGame}>
          <Image
            source={require("../../assets/SkyDancing.png")}
            style={{
              height: 250,
              width: 150,
              top: "50%",
              left: "25%",
              overflow: "hidden",
            }}
          />
        </Pressable>
      )}

      {bubbleGameIsOpen === true && <BubbleGame key={refreshKey} styles={styles} handleBubbleGame={handleBubbleGame} bubbleGameIsOpen={bubbleGameIsOpen} />}
    </ImageBackground>
  );
}
