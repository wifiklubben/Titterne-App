import React, { useEffect, useState } from "react";
import { View, ImageBackground, Text, Image, Pressable, FlatList } from "react-native";

import PagerView from "react-native-pager-view";

function BookView(props) {
  useEffect(() => {}, [props.currentStory]);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: "10",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageBackground
        // source={require("./assets/Bedroom/bigBook.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#FFFFff70",
        }}
      >
        <Pressable
          onPress={() => props.handleBookClose()}
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

        {props.currentStory.title != "" && (
          <Pressable
            onPress={() => props.handleStoryClose()}
            style={{
              position: "absolute",
              right: "37%",
              top: 306,
              zIndex: 200,
              // width: 150,
              height: "30%",
              width: "27%",
            }}
          >
            <Image source={require("./assets/Bedroom/Backbuttonwithbook.png")} style={{ height: "100%", width: "105%" }} />
          </Pressable>
        )}
        {props.currentStory.title != "" && (
          <Pressable
            onPress={() => props.pausePlayStory()}
            style={{
              position: "absolute",
              right: 418,
              top: 554,
              zIndex: 200,
              height: 100,
              width: 110,
            }}
          >
            <Image source={require("./assets/Bedroom/Pausebutton.png")} style={{ height: 110, width: 110 }} />
          </Pressable>
        )}
        {props.currentStory.title != "" && (
          <Pressable
            onPress={() => props.pausePlayStory()}
            style={{
              position: "absolute",
              right: 548,
              top: 554,
              zIndex: 200,
              height: 100,
              width: 110,
            }}
          >
            <Image source={require("./assets/Bedroom/Playbutton.png")} style={{ height: 110, width: 110 }} />
          </Pressable>
        )}

        {/* story not chosen aka CONTENTS PAGES */}
        {props.currentStory.title === "" && (
          <ImageBackground
            source={require("./assets/Bedroom/bigBook.png")}
            style={{
              position: "absolute",
              width: "88%",
              height: "88%",
              top: 100,
              right: 0,
            }}
          >
            <PagerView initialPage={0} style={{ flex: 1 }}>
              <View
                key="1"
                style={{
                  marginLeft: "1%",
                  width: "100%",
                }}
              >
                <FlatList
                  columnWrapperStyle={{ gap: -60, width: "90%" }}
                  numColumns={2}
                  data={props.storyTitles}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        props.setCurrentStory(item);
                      }}
                      style={{
                        width: "40%",
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          height: 160,
                          marginHorizontal: "27%",
                          marginVertical: "-2%",
                          alignItems: "center",
                          transform: item.tag === "magiskHave" || item.tag === "skattejagt" ? [{ translateY: 50 }] : [{ translateY: 0 }],
                        }}
                      >
                        <Image
                          source={item.thumbnail}
                          style={{
                            width: 284,
                            height: item.tag === "natero" ? "125%" : "100%",
                          }}
                        />
                      </View>
                    </Pressable>
                  )}
                  style={{
                    paddingTop: "5%",
                    width: "100%",
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </PagerView>
          </ImageBackground>
        )}

        {/* story IS CHOSEN, show story */}

        {props.currentStory.title != "" && (
          <ImageBackground
            source={require("./assets/Bedroom/bedroomBGLightsOut.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <View
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
              }}
            >
              {props.renderStoryContents()}
            </View>
          </ImageBackground>
        )}
      </ImageBackground>
    </View>
  );
}

export default BookView;
