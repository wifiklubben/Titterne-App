import React, { useEffect, useRef, useState } from "react";
import { View, ImageBackground, Animated, Image, Text } from "react-native";

export default function HomeView({ styles, children, setShowIntroAnimation, isLoaded, showIntroAnimation, useStore, isNightTime }) {
  const animatedScaleValue = useRef(new Animated.Value(0)).current;
  const animatedOpacityValue = useRef(new Animated.Value(0)).current;
  const animatedTitleInValue = useRef(new Animated.Value(0)).current;
  const animatedBackground = useRef(new Animated.Value(0)).current;
  const [loadingCover] = useState(new Animated.Value(99));

  console.log("show intro:", showIntroAnimation);
  useEffect(() => {
    if (isLoaded && showIntroAnimation) {
      const scaleAnimation = Animated.timing(animatedScaleValue, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true,
      });
      const opacityAnimation = Animated.timing(animatedOpacityValue, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      });
      const backgroundOpacity = Animated.timing(animatedBackground, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      });
      const titleAnimationIn = Animated.sequence([
        Animated.delay(1500), // Add this line with the desired delay (500 milliseconds)
        Animated.timing(animatedTitleInValue, {
          toValue: 1,
          duration: 4500,
          useNativeDriver: true,
        }),
      ]);
      Animated.sequence([Animated.parallel([titleAnimationIn, scaleAnimation]), Animated.delay(350), Animated.parallel([opacityAnimation, backgroundOpacity])]).start();
    }
  }, [isLoaded, showIntroAnimation]);

  const opacityInterpolation = animatedTitleInValue.interpolate({
    inputRange: [0, 0.1, 0.9, 1],
    outputRange: [1, 1, 1, 0],
  });
  const translateYInterpolation = animatedTitleInValue.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [560, 0, 0],
  });
  const animatedTitleIn = {
    opacity: opacityInterpolation,
    transform: [{ translateY: translateYInterpolation }],
  };

  const animatedHouse = {
    transform: [
      {
        scaleX: animatedScaleValue.interpolate({
          inputRange: [0, 0.1, 1],
          outputRange: [0.9, 0.9, 1.25],
        }),
      },
      {
        scaleY: animatedScaleValue.interpolate({
          inputRange: [0, 0.1, 1],
          outputRange: [0.9, 0.9, 1.25],
        }),
      },
      {
        translateY: animatedScaleValue.interpolate({
          inputRange: [0, 1],
          outputRange: [35, 0],
        }),
      },
    ],
  };

  const animatedForeGround = {
    transform: [
      {
        scale: animatedScaleValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.96, 1.2],
        }),
      },
    ],
  };

  const animatedTrees = {
    transform: [
      {
        scaleX: animatedScaleValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1.2],
        }),
      },
      {
        scaleY: animatedScaleValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1.2],
        }),
      },
      {
        translateY: animatedScaleValue.interpolate({
          inputRange: [0, 1],
          outputRange: [75, 0],
        }),
      },
    ],
  };

  const animatedWindow = {
    opacity: animatedOpacityValue,
  };
  const openTreehouse = {
    opacity: animatedOpacityValue,
  };
  const LoadingCover = () => {
    Animated.timing(loadingCover, {
      toValue: -99,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };

  return isNightTime ? (
    <ImageBackground style={[styles.fullWidthBackground, { transform: [{ scale: 1.2 }] }]} source={require("./assets/HouseNight.png")}></ImageBackground>
  ) : !showIntroAnimation ? (
    // Main view
    <View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          right: "-50%",
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
      <ImageBackground source={require("./assets/sky.png")} style={styles.backgroundImage}>
        <Image
          source={require("./assets/Bg_trees_treehouseopen.png")}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transform: [{ scale: 1.2 }],
          }}
        />
        <Image
          source={require("./assets/House_Open_rooms.png")}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transform: [{ scale: 1.25 }],
          }}
        />
        <Image
          source={require("./assets/forground.png")}
          style={{
            position: "absolute",
            height: "120%",
            width: "120%",
            left: "-9.5%",
            top: "-15%",
            transform: [{ scale: 1.2 }],
          }}
          onLoad={() => LoadingCover()}
        />

        <View>{children}</View>
      </ImageBackground>
    </View>
  ) : (
    <View>
      <ImageBackground source={require("./assets/sky.png")} style={styles.backgroundImage}>
        <Animated.Image
          source={require("./assets/Bg_trees.png")}
          style={[
            {
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
            },
            animatedTrees,
          ]}
        />
        <Animated.Image
          source={require("./assets/House.png")}
          style={[
            {
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 2,
            },
            animatedHouse,
          ]}
        />

        <Animated.Image
          source={require("./assets/TitterneLogo.png")}
          style={[
            {
              position: "absolute",
              width: "50%",
              height: "50%",
              left: "25%",
              bottom: "35%",
              overflow: "visible",
              zIndex: 4,
            },
            animatedTitleIn,
          ]}
        />

        <Animated.Image
          source={require("./assets/forground.png")}
          style={[
            {
              position: "absolute",
              height: "120%",
              width: "120%",
              left: "-9.5%",
              top: "-15%",
              zIndex: 5,
            },
            animatedForeGround,
          ]}
        />
        <Animated.Image
          source={require("./assets/Bg_trees_treehouseopen.png")}
          style={{
            position: "absolute",
            bottom: 0,
            left: "0%",
            width: "100%",
            height: "100%",
            opacity: animatedBackground,
            transform: [{ scale: 1.2 }],
            zIndex: 2,
          }}
        />
        <Animated.Image
          source={require("./assets/House_Open_rooms.png")}
          style={{
            position: "absolute",
            bottom: 0,
            left: "0%",
            width: "100%",
            height: "100%",
            opacity: animatedBackground,
            transform: [{ scale: 1.25 }],
            zIndex: 2,
          }}
        />

        <Animated.Image
          source={require("./assets/forground.png")}
          style={{
            position: "absolute",
            height: "120%",
            width: "120%",
            left: "-59.5%",
            top: "-15%",
            opacity: animatedBackground,
            transform: [{ scale: 1.2 }],
          }}
        />
        {children}
      </ImageBackground>
    </View>
  );
}
