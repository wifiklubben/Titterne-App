import React from "react";
import { Image, Pressable, StatusBar, Dimensions } from "react-native";
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Box from "./Box";
import Bubble from "./Bubble";
import Sky from "./Sky";
import Thorden from "./Thorden";
import { Audio } from "expo-av";

//variables
const { width, height } = Dimensions.get("screen");
const boxSize = Math.trunc(Math.max(width, height) * 0.075);
const charSize = Math.trunc(Math.max(width, height) * 0.08);
const engine = Matter.Engine.create({ enableSleeping: false });
const world = engine.world;
const bubbleSizes = [boxSize, boxSize * 1.2, boxSize * 1.5];
const floor = Matter.Bodies.rectangle(width / 2, height, width, boxSize / 2, {
  isStatic: true,
});
const rightWall = Matter.Bodies.rectangle(width, height / 2, 2, height, {
  isStatic: true,
});
const leftWall = Matter.Bodies.rectangle(0, height / 2, 2, width - 20, {
  isStatic: true,
});
const roof = Matter.Bodies.rectangle(width / 2, 0, width, 4, {
  isStatic: true,
});
const sky = Matter.Bodies.rectangle(width / 3, height / 2, charSize, charSize * 2, {
  friction: 0.6,
  frictionAir: 0.01,
  restitution: 0.9,
});
const thorden = Matter.Bodies.rectangle(width / 1.8, height / 2, charSize, charSize * 1.2, {
  friction: 0.1,
  frictionAir: 0.01,
  restitution: 0.9,
});
let boxIds = 0;
const Physics = (entities, { time }) => {
  let engine = entities["physics"].engine;
  const windForce = { x: 0.00001, y: -0.0001 }; // Adjust these values to control wind strength
  const bodies = Matter.Composite.allBodies(engine.world);
  bodies.forEach((body) => {
    if (!body.isStatic) {
      Matter.Body.applyForce(body, body.position, windForce);
    }
  });
  Matter.Engine.update(engine, time.delta);
  return entities;
};
Matter.World.add(world, [floor, rightWall, leftWall, roof, sky, thorden]);

export default function BubbleGame(props) {
  //States
  const [sound, setSound] = React.useState();
  //functions
  async function playPop() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(require("./assets/bubble_pop.mp3"));
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
  }
  //create a bubble on touch screen
  const CreateBubble = (entities, { touches, screen }) => {
    const randomIndex = Math.floor(Math.random() * bubbleSizes.length);
    const selectedSize = bubbleSizes[randomIndex];
    let world = entities["physics"].world;
    let boxSize = Math.trunc(Math.max(screen.width, screen.height) * 0.07);
    touches
      .filter((t) => t.type === "press")
      .forEach((t) => {
        let body = Matter.Bodies.rectangle(t.event.pageX, t.event.pageY, boxSize, boxSize, {
          friction: 0.01,
          frictionAir: 0.9,
          restitution: 0.1,
          mass: 0.7,
        });
        Matter.Body.setAngularVelocity(body, 5);
        Matter.World.add(world, [body]);
        entities[++boxIds] = { body: body, size: [selectedSize, selectedSize], renderer: Bubble };
        playPop();
        console.log(body.angularVelocity);
      });
    return entities;
  };

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <GameEngine
      style={{
        position: "absolute",
        backgroundColor: "rgba(138, 193, 223, 0.9)",
        padding: 0,
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      }}
      justifyContent={"center"}
      alignItems={"center"}
      systems={[Physics, CreateBubble]}
      entities={{
        physics: { engine: engine, world: world },
        floor: { body: floor, size: [width, boxSize / 2.5], color: "#fff", renderer: Box },
        rightWall: { body: rightWall, size: [2, height], color: "#fff", renderer: Box },
        leftWall: { body: leftWall, size: [2, height], color: "#fff", renderer: Box },
        roof: { body: roof, size: [width, 2], color: "#fff", renderer: Box },
        sky: { body: sky, size: [charSize, charSize * 1.4], renderer: Sky },
        thorden: { body: thorden, size: [charSize, charSize * 1.4], isDraggable: true, renderer: Thorden },
        // initialBox: { body: initialBox, size: [boxSize, boxSize], color: "red", renderer: Box },
      }}
    >
      <Pressable
        onPress={() => props.handleBubbleGame()}
        style={{
          height: 50,
          width: 50,
          top: 10,
          left: "92%",
        }}
      >
        <Image
          source={require("../../assets/graphics/closeIcon.png")}
          style={{
            resizeMode: "contain",
            height: "100%",
            width: "100%",
            overflow: "visible",
          }}
        />
      </Pressable>
      <StatusBar hidden={true} />
    </GameEngine>
  );
}
