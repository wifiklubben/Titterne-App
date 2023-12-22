import React, { useEffect, useState } from "react";
import { View, ImageBackground, Image, FlatList, Pressable, Animated, Text } from "react-native";
import { Emitter } from "react-native-particles";

import { Audio } from "expo-av";

// matching socks stock function
function areSocksMatched(sock1, sock2) {
  console.log("sock1 id: ", sock1.id);
  console.log("sock2 id: ", sock2.id);

  if (sock1.sock.color === sock2.sock.color && sock1.id != sock2.id) {
    return sock1, sock2;
  } else {
  }
}

function SockGameView(props) {
  const [popSound, setPopSound] = useState();
  const [fartSound, setFartSound] = useState();
  const [yaySound, setYaySound] = useState();

  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedcards] = useState([]);

  useEffect(() => {
    async function loadPop() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/sockSelect.mp3"));
        setPopSound(sound);
      } catch (error) {
        console.log("error loading sound: ", error);
      }
    }
    loadPop();
  }, []);

  useEffect(() => {
    async function loadFart() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/sockSelectWrong.mp3"));
        setFartSound(sound);
      } catch (error) {
        console.log("error loading sound: ", error);
      }
    }
    loadFart();
  }, []);

  useEffect(() => {
    async function loadYay() {
      try {
        const { sound } = await Audio.Sound.createAsync(require("./assets/audio/sockSelectCorrect.mp3"));
        setYaySound(sound);
      } catch (error) {
        console.log("error loading sound: ", error);
      }
    }
    loadYay();
  }, []);

  const uniqueSocksArray = [
    {
      color: "red",
      image: require("./assets/graphics/socks/sockRed.png"),
    },
    {
      color: "blue",
      image: require("./assets/graphics/socks/sockBlue.png"),
    },
    {
      color: "yellow",
      image: require("./assets/graphics/socks/sockYellow.png"),
    },
    {
      color: "purple",
      image: require("./assets/graphics/socks/sockPurple.png"),
    },
    {
      color: "pink",
      image: require("./assets/graphics/socks/sockPink.png"),
    },
    {
      color: "green",
      image: require("./assets/graphics/socks/sockGreen.png"),
    },
  ];

  // play sounds

  const playPopSound = () => {
    try {
      popSound.stopAsync();
      popSound.playAsync();
    } catch (error) {
      console.log("PLAYBACK error here is: ", error);
    }
  };

  const playFartSound = () => {
    try {
      fartSound.stopAsync();
      fartSound.playAsync();
    } catch (error) {
      console.log("PLAYBACK error here is: ", error);
    }
  };

  const playYaySound = () => {
    try {
      yaySound.stopAsync();
      yaySound.playAsync();
    } catch (error) {
      console.log("PLAYBACK error here is: ", error);
    }
  };

  //shuffle function

  function shuffleSocks(array) {
    const length = array.length;
    for (let i = length; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      const currentIndex = i - 1;
      const temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }

  //picking socks

  const handleCardClick = async (clickedSock, sockId) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, { sock: clickedSock, id: sockId }]);
    } else {
      setOpenCards([{ sock: clickedSock, id: sockId }]);
    }
  };

  // verifying socks

  useEffect(() => {
    if (openCards.length === 2) {
      if (areSocksMatched(openCards[0], openCards[1])) {
        setClearedcards((prevClearedCards) => [...prevClearedCards, ...openCards]);
        playYaySound();
      } else {
        playFartSound();
      }
    }
  }, [openCards]);

  // checking picked up socks for win condition

  useEffect(() => {
    if (clearedCards.length === 12) {
      //   console.log("YOU DID IT");

      const delay = 10000000;
      const timeoutId = setTimeout(() => {
        //reset game upon win
        setClearedcards([]);
        setOpenCards([]);
        shuffleSocks(uniqueSocksArray);
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [clearedCards]);

  //Rendering socks

  const renderItem = ({ item, index }) => {
    const image = item.image;
    const sockId = index;

    const isCardOpen = openCards.some((card) => card.id === sockId);
    const isCardCleared = clearedCards.some((card) => card.sock.color === item.color);

    return (
      <Pressable
        onPress={() => [handleCardClick(item, sockId), playPopSound()]}
        style={{
          opacity: isCardCleared ? 0 : 1,
          marginVertical: 0,
          marginHorizontal: 10,
        }}
      >
        <Image
          data={"color"}
          source={image}
          style={{
            height: 120,
            width: 120,
            resizeMode: "contain",
            opacity: 1,
            shadowColor: "white",
            shadowOpacity: isCardOpen ? 1 : 0,
            shadowRadius: 3,
            overflow: "visible",
          }}
        />
      </Pressable>
    );
  };

  const [cards, setCards] = useState(() => shuffleSocks(uniqueSocksArray.concat(uniqueSocksArray)));

  return (
    <View style={{ zIndex: 10 }}>
      <ImageBackground
        source={require("./assets/Bedroom/Carpet_sockgame.png")}
        resizeMode="contain"
        style={{
          position: "absolute",
          padding: 20,
          width: 850,
          height: 850,
          top: 0,
          left: 150,
        }}
      >
        <View
          justifyContent={"center"}
          alignItems={"center"}
          style={{
            position: "absolute",
            padding: 20,
            width: 600,
            height: 600,
            top: 110,
            left: 110,
            borderRadius: "25%",
          }}
        >
          <Pressable
            onPress={() => props.handleGameOpen()}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              zIndex: 100,
            }}
          >
            <Image
              source={require("./assets/Global/closeIcon.png")}
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
            />
          </Pressable>

          {clearedCards.length < 12 && (
            <FlatList
              numColumns={4}
              data={cards}
              renderItem={renderItem}
              justifyContent={"space-around"}
              alignItems={"center"}
              style={{
                width: "100%",
                height: "100%",
              }}
            ></FlatList>
          )}

          {clearedCards.length === 12 && (
            // <Text style={[props.styles.h1Text]}>You did it!!</Text>
            <Emitter numberOfParticles={100} emissionRate={10} interval={200} particleLife={1000} direction={0} spread={200} speed={100} width={300} fromPosition={{ x: 300, y: 300 }}>
              <Image source={require("./assets/graphics/socks/sockBlue.png")} style={{ resizeMode: "contain", height: 90, width: 90 }} />
            </Emitter>
          )}
        </View>
      </ImageBackground>

      {/* show different Thorden when half way! */}

      {clearedCards.length < 6 && (
        <Animated.Image
          source={require("./assets/Thorden.png")}
          style={{
            position: "absolute",
            resizeMode: "contain",
            height: "30%",
            bottom: 0,
          }}
        ></Animated.Image>
      )}

      {clearedCards.length > 5 && clearedCards.length < 10 && (
        <Animated.Image
          source={require("./assets/ThordenSocks.png")}
          style={{
            position: "absolute",
            resizeMode: "contain",
            height: "30%",
            bottom: 0,
          }}
        ></Animated.Image>
      )}

      {clearedCards.length > 9 && (
        <Animated.Image
          source={require("./assets/ThordenSockPile.png")}
          style={{
            position: "absolute",
            resizeMode: "contain",
            height: "30%",
            bottom: 0,
          }}
        ></Animated.Image>
      )}
    </View>
  );
}

export default SockGameView;
