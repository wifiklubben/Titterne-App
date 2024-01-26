import React, { useEffect, useRef, useState } from "react";
import { View, ImageBackground, Animated, Image } from "react-native";

export default function HomeView({ styles, isLoaded, children, setShowIntroAnimation, showIntroAnimation, useStore, isNightTime }) {
  const animatedScaleValue = useRef(new Animated.Value(0)).current;
  const animatedOpacityValue = useRef(new Animated.Value(0)).current;
  const animatedTitleInValue = useRef(new Animated.Value(0)).current;

  const cloud1Anim = useRef(new Animated.Value(1200)).current;
  const cloud2Anim = useRef(new Animated.Value(1300)).current;

  useEffect(() => {
    if (isLoaded && showIntroAnimation) {
      const scaleAnimation = Animated.timing(animatedScaleValue, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true,
      });

      const opacityAnimation = Animated.timing(animatedOpacityValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      });

      const titleAnimationIn = Animated.sequence([
        Animated.delay(2200), // Add this line with the desired delay (500 milliseconds)
        Animated.timing(animatedTitleInValue, {
          toValue: 1,
          duration: 3500,
          useNativeDriver: true,
        }),
      ]);

      Animated.sequence([Animated.parallel([titleAnimationIn, scaleAnimation]), Animated.delay(350), opacityAnimation]).start(() => {
        setShowIntroAnimation(false);
      });
    } else {
      if (isLoaded && !showIntroAnimation) {
        Animated.loop(
          Animated.timing(cloud1Anim, {
            toValue: -500,
            duration: 60000,
            useNativeDriver: true,
          }),
          {
            iterations: -1,
          }
        ).start();

        Animated.loop(
          Animated.timing(cloud2Anim, {
            toValue: -500,
            duration: 40000,
            useNativeDriver: true,
          }),
          {
            iterations: -1,
          }
        ).start();
      }
    }
  }, [isLoaded, showIntroAnimation]);

  const opacityInterpolation = animatedTitleInValue.interpolate({
    inputRange: [0, 0.1, 0.9, 1],
    outputRange: [1, 1, 1, 0],
  });
  const translateYInterpolation = animatedTitleInValue.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [460, 0, 0],
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
          outputRange: [0.85, 0.85, 1.25],
        }),
      },
      {
        scaleY: animatedScaleValue.interpolate({
          inputRange: [0, 0.1, 1],
          outputRange: [0.85, 0.85, 1.25],
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

  const animatedCloud1 = {
    transform: [
      {
        translateX: animatedScaleValue.interpolate({
          inputRange: [0, 0.2, 1],
          outputRange: [0, 0, 1500],
        }),
      },
    ],
  };
  const animatedCloud2 = {
    transform: [
      {
        translateX: animatedScaleValue.interpolate({
          inputRange: [0, 0.2, 1],
          outputRange: [0, 0, -1500],
        }),
      },
    ],
  };

  const animatedForeGround = {
    transform: [
      {
        scale: animatedScaleValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.95, 1.2],
        }),
      },
    ],
  };

  const animatedTrees = {
    transform: [
      {
        scaleX: animatedScaleValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.45, 1.2],
        }),
      },
      {
        scaleY: animatedScaleValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.45, 1.2],
        }),
      },
      {
        translateY: animatedScaleValue.interpolate({
          inputRange: [0, 1],
          outputRange: [85, 0],
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

  return isNightTime ? (
    <ImageBackground style={styles.fullWidthBackground} source={require("./assets/HouseNight.png")}></ImageBackground>
  ) : !showIntroAnimation ? (
    // Main view
    <View>
      <ImageBackground source={require("./assets/sky.png")} style={styles.backgroundImage}>
        <Animated.Image
          source={require("./assets/cloud_1.png")}
          style={{
            overflow: "visible",
            position: "absolute",
            height: "25%",
            width: "25%",
            transform: [
              {
                translateX: cloud1Anim,
              },
            ],
          }}
        />

        <Animated.Image
          source={require("./assets/cloud_2.png")}
          style={{
            position: "absolute",
            overflow: "visible",
            top: 15,
            height: "35%",
            width: "35%",
            transform: [
              {
                translateX: cloud2Anim,
              },
            ],
          }}
        />

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
        />

        <View>{children}</View>
      </ImageBackground>
    </View>
  ) : (
    // Intro Animation

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
          source={require("./assets/Bg_trees_treehouseopen.png")}
          style={[
            {
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
              opacity: 0,
            },
            openTreehouse,
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
          source={require("./assets/House_Open_rooms.png")}
          style={[
            {
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              zIndex: 3,
              transform: [{ scale: 1.25 }],
            },
            animatedWindow,
          ]}
        />

        <Animated.Image
          source={require("./assets/cloud_2.png")}
          style={[
            {
              position: "absolute",
              overflow: "visible",
              height: "100%",
              width: "100%",
            },
            animatedCloud1,
          ]}
        />

        <Animated.Image
          source={require("./assets/cloud_1.png")}
          style={[
            {
              position: "absolute",
              overflow: "visible",
              top: -200,
              height: "100%",
              width: "100%",
            },
            animatedCloud2,
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
      </ImageBackground>
    </View>
  );
}
