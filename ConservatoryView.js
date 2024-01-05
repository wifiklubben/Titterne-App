import React, { useState, useEffect } from "react";
import { View, ImageBackground, Image, Pressable } from "react-native";
import SpriteSheet from "rn-sprite-sheet";
import { Audio } from "expo-av";

import PlanterView from "./PlanterView";

function ConservatoryView(styles) {
  const [plantGameOpen, setPlantGameOpen] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const handleGameOpen = () => {
    console.log("handle game open");

    if (plantGameOpen === false) {
      setPlantGameOpen(true);
    } else if (plantGameOpen === true) {
      setPlantGameOpen(false);
    }
    console.log(plantGameOpen);
  };

  //Animations
  //tordenWave
  const wave = () => {
    if (!isBlinking) {
      this.torden.play({
        type: "wave",
        fps: 24,
        loops: false,
        resetAfterFinish: true,
      });
    }
  };
  // tordenBlink
  const tordenBlink = () => {
    this.torden.play({
      type: "blink",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
  };
  // skyWave
  const skyWave = () => {
    this.sky.play({
      type: "wave",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
  };
  // hoseDance
  const hoseDance = () => {
    this.hose.play({
      type: "dance",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
    });
  };
  // tordenBlink timer
  useEffect(() => {
    // Start the blink animation every 5 seconds
    const blinkTimer = setInterval(() => {
      tordenBlink(); // Trigger the blink animation
      setTimeout(() => {
        setIsBlinking(false);
      }, 3000); // Assuming blink animation duration is 3000 milliseconds
    }, 5000);

    // Clean up the timer when the component is unmounted
    return () => clearInterval(blinkTimer);
  }, []);

  return (
    <>
      <ImageBackground
        source={require("./assets/ConservatoryRoom/Conservatory_Bg.png")}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Pressable
          onPress={() => skyWave()}
          style={{
            position: "absolute",
            right: 10,
            top: 150,
            width: 220,
            height: 320,
            overflow: "hidden",
          }}
        >
          <SpriteSheet
            ref={(ref) => (this.sky = ref)}
            source={require("./assets/graphics/spritesheets/SkyWaveConservatory.png")}
            imageStyle={{
              marginBottom: 0,

              top: -76,
              right: 40,
              height: "100%",
            }}
            columns={8}
            rows={7}
            width={300}
            initialFrame={10}
            animations={{
              wave: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
            }}
            onLoad={() => console.log("SpriteSheet loaded")}
          />
        </Pressable>

        <View
          style={{
            position: "absolute",
            left: -7,
            top: 246,
            width: 280,
            height: 300,
            resizeMode: "contain",
          }}
        >
          <SpriteSheet
            ref={(ref) => (this.torden = ref)}
            source={require("./assets/graphics/spritesheets/TordenAnimConservatoryWaveBlink.png")}
            imageStyle={{
              marginBottom: 0,
            }}
            columns={5}
            rows={12}
            width={289}
            animations={{
              wave: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58],
              blink: [0, 1, 2, 3, 5, 6],
            }}
            onLoad={() => console.log("SpriteSheet loaded")}
          />

          <Pressable
            onPress={() => wave()}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
          />
        </View>

        {!plantGameOpen && (
          <>
            <Pressable
              onPress={() => handleGameOpen()}
              style={{
                position: "absolute",
                width: 190,
                height: 400,
                left: 456,
                top: 152,
              }}
            >
              <Image
                source={require("./assets/graphics/plants/ConservatoryPlant_06.png")}
                style={{
                  // height: '105%',
                  // width: '105%',
                  // bottom: '5%',
                  height: "100%",
                  width: "100%",
                }}
              />
            </Pressable>

            {/* <Image
              source={require("./assets/ConservatoryRoom/Hose.png")}
              style={{
                position: "absolute",
                width: 460,
                height: 280,
                bottom: 0,
                left: 120,
                resizeMode: "contain",
              }}
            /> */}
            <Pressable
              onPress={() => hoseDance()}
              style={{
                position: "absolute",
                width: 460,
                height: 330,
                bottom: 0,
                left: 144,
                resizeMode: "contain",
              }}
            >
              <SpriteSheet
                ref={(ref) => (this.hose = ref)}
                source={require("./assets/graphics/spritesheets/hoseAnim.png")}
                imageStyle={{
                  marginBottom: 0,
                  bottom: 0,
                  right: 0,
                  height: "100%",
                }}
                columns={4}
                rows={10}
                width={695}
                animations={{
                  dance: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
                }}
                onLoad={() => console.log("SpriteSheet loaded")}
              />
            </Pressable>
          </>
        )}

        {plantGameOpen && <PlanterView handleGameOpen={handleGameOpen} styles={styles} />}

        <Image
          pointerEvents="none"
          source={require("./assets/ConservatoryRoom/Conservatory_Fg.png")}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </ImageBackground>
    </>
  );
}

export default ConservatoryView;
