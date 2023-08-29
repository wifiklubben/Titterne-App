import React, { Component } from "react";
import { View, Image, Pressable } from "react-native";
import { Audio } from "expo-av";

export default class Sky extends Component {
  async playGiggle() {
    const { sound } = await Audio.Sound.createAsync(require("../bathroom/assets/sky_giggle.mp3"));
    await sound.playAsync();
  }
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 3;

    return (
      <Pressable
        onPress={() => this.playGiggle()}
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: width,
          height: height,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/SkyDancing.png")}
          style={{
            height: "175%",
            width: "221%",
            borderTopLeftRadius: 80,
          }}
        />
      </Pressable>
    );
  }
}
