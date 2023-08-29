import React, { Component } from "react";
import { View, Image } from "react-native";

export default class Box extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <View
        style={{
          position: "absolute",
          left: x - width / 2,
          top: y - height / 2,
          width: width,
          height: height,
          overflow: "hidden",
          //   borderColor: "red",
          //   borderWidth: 1,
        }}
      >
        <Image
          source={require("./assets/bubble.png")}
          style={{
            resizeMode: "contain",
            height: "100%",
            width: "100%",
            // borderColor: "black",
            // borderWidth: 1,
          }}
        />
      </View>
    );
  }
}
