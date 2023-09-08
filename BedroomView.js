import React, { useEffect, useState } from "react";
import { View, ImageBackground, Image, FlatList, Pressable, Animated, Text } from "react-native";

import { Audio } from "expo-av";

import SockGameView from "./SockGameView";

export default function BedroomView({ styles }) {
  const [sockGameOpen, setSockGameOpen] = useState(false);
  console.log(sockGameOpen);

  const handleGameOpen = () => {
    console.log("handling game open");

    if (sockGameOpen === false) {
      setSockGameOpen(true);
    } else if (sockGameOpen === true) {
      setSockGameOpen(false);
    }

    console.log(sockGameOpen);
  };

  return (
    <ImageBackground source={require("./assets/Bedroom_inside.png")} style={styles.fullWidthBackground}>
      {sockGameOpen === false && (
        <ImageBackground
          source={require("./assets/ThordenSockPile.png")}
          style={{
            height: 250,
            width: 150,
            top: 355,
            left: 550,
            overflow: "visible",
          }}
        />
      )}

      {sockGameOpen === false && (
        <Pressable
          onPress={() => handleGameOpen()}
          style={{
            position: "absolute",
            width: 150,
            height: 250,
            top: 355,
            left: 550,
          }}
        />
      )}

      {sockGameOpen === true && <SockGameView styles={styles} handleGameOpen={handleGameOpen} />}
    </ImageBackground>
  );
}
