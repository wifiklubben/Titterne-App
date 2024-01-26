import React, { useState, useEffect } from "react";
import { View, ImageBackground, Image, Pressable } from "react-native";
import SpriteSheet from "rn-sprite-sheet";
import { Audio } from "expo-av";

import PlanterView from "./PlanterView";

function ConservatoryView({ styles, startConservatoryBackgroundSound, stopConservatoryBackgroundSound }) {
  const [plantGameOpen, setPlantGameOpen] = useState(false);
  const [tordenisBlinking, setTordenIsBlinking] = useState(false);
  const [tordenIsWaving, setTordenisWaving] = useState(false);
  const [skyisBlinking, setSkyisBlinking] = useState(false);
  const [skyisWaving, setSkyisWaving] = useState(false);

  const handleGameOpen = () => {
    console.log("handle game open");
    if (plantGameOpen === false) {
      setPlantGameOpen(true);
      stopConservatoryBackgroundSound();
    } else if (plantGameOpen === true) {
      setPlantGameOpen(false);
      startConservatoryBackgroundSound();
    }
    console.log("is plant game open?", plantGameOpen);
  };

  //Animations
  //tordenWave
  const wave = () => {
    if (!tordenisBlinking && !tordenIsWaving) {
      this.torden.play({
        type: "wave",
        fps: 24,
        loops: false,
        resetAfterFinish: true,
        onFinish: () => {
          setTordenisWaving(false);
        },
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
      onFinish: () => {
        setTordenIsBlinking(false);
      },
    });
  };
  // skyWave
  const skyWave = () => {
    if (!skyisBlinking && !skyisWaving) {
      this.sky.play({
        type: "wave",
        fps: 24,
        loops: false,
        resetAfterFinish: true,
        onFinish: () => {
          setSkyisWaving(false);
        },
      });
    }
  };
  //skyblink
  const skyBlink = () => {
    this.sky.play({
      type: "blink",
      fps: 24,
      loops: false,
      resetAfterFinish: true,
      onFinish: () => {
        setSkyisBlinking(false);
      },
    });
  };
  useEffect(() => {
    if (!skyisWaving) {
      const blinkTimer = setInterval(() => {
        setSkyisBlinking(true);
        skyBlink();
      }, 4500);
      return () => clearInterval(blinkTimer);
    }
  }, [skyisWaving]);

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
    if (!tordenIsWaving) {
      const torBlinkTimer = setInterval(() => {
        setTordenIsBlinking(true);
        tordenBlink();
      }, 5000);
      return () => clearInterval(torBlinkTimer);
    }
  }, [tordenIsWaving]);

  return (
    <>
      <ImageBackground
        source={require("./assets/ConservatoryRoom/Conservatory_Bg_puddle.png")}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Pressable
          onPress={() => {
            skyWave();
            setSkyisWaving(true);
          }}
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
            source={require("./assets/graphics/spritesheets/SkyConservatoryWaveBlink.png")}
            imageStyle={{
              marginBottom: 0,

              top: -76,
              right: 40,
              height: "100%",
            }}
            columns={9}
            rows={7}
            width={300}
            initialFrame={10}
            animations={{
              wave: [0, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61],
              blink: [0, 1, 2, 3, 4, 5],
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
              wave: [0, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58],
              blink: [0, 1, 2, 3, 5, 6],
            }}
            onLoad={() => console.log("SpriteSheet loaded")}
          />

          <Pressable
            onPress={() => {
              wave();
              setTordenisWaving(true);
              console.log(tordenIsWaving);
            }}
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

        {plantGameOpen && <PlanterView plantGameOpen={plantGameOpen} handleGameOpen={handleGameOpen} styles={styles} />}

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
