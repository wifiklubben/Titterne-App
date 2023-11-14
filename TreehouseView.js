import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text, Image, Pressable } from 'react-native';

import { Audio } from 'expo-av'

import SpriteSheet from 'rn-sprite-sheet';


import BugGameView from './BugGameView';
import BookViewAction from "./BookViewAction";

function TreehouseView( {styles}) {

    const [bugGameOpen, setBugGameOpen] = useState(false)
    
    const [birdSfx, setBirdSfx] = useState()

    //set all sfx

    useEffect(() => {

        // async function loadBirdSound() {
        //     try {
        //         const [sound] = await Audio.Sound.createAsync(require())
        //         setBirdSfx( sound );
        //     } catch (error) {
        //         console.log('error loading bird sfx');
        //     }
        // }


        // more SFX loading here

    //     loadBirdSound()
    }, [])
    
    
    
    // play all sfx

    async function playBirdSound() {
        try {
          if (birdSfx) 
          {
            birdSfx.replayAsync();
          } 
        } catch (error) {
          console.log("error playing bird sound", error);
        }
      }


    //   sprite animations

    // bird singing

    const birdSong = ()=> {
        this.birdSong.play({
            type: "squawk",
            fps: 24,
            loops: false,
            resetAfterFinish: true,
        })
        playBirdSound()
    }

const handleGameOpen = () => {
    console.log("handle game open")

    if (bugGameOpen === false) {
        setBugGameOpen(true)

    } else if (bugGameOpen === true) {
        setBugGameOpen(false)
    }
    console.log(bugGameOpen)
}

   
  return (
    <>
        <ImageBackground source={require('./assets/TreeHouse/TreeHouseBG.png')}
                style={styles.fullWidthBackground}>

    
    {bugGameOpen === false && 
    <Pressable
    onPress={() => handleGameOpen()}
    style={{
        position: 'absolute',
        top: 550,
        left: 290,
        width: 200,
        height: 200,
        borderWidth: 3,
        borderColor: 'green',
    }}>
    <Image source={require('./assets/TreeHouse/Cards.png')}
    style={{
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    }}/>

    </Pressable>}

<View style={{
    position: 'absolute',
    resizeMode: 'contain',
    width: 150,
    height: 150,
    top: 120,
    left: 500,
}}>
    <SpriteSheet
    ref={ref=>(this.birdSong = ref)}
    source={require('./assets/graphics/spritesheets/birdSing.png')}
    columns={6}
    rows={8}
    height={150}
    frameHeight={150}
    frameWidth={150}
    animations={{
        squawk: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43]
    }}>
    </SpriteSheet>

    <Pressable onPress={() => birdSong()} 
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
      }}/>

</View>

<View style={{
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'orange',
    height: 85,
    width: 100,
    top: 500,
    left: 490,
}}>
    {/* cola cans placeholder */}
</View>

<View style={{
    position: 'absolute',
    borderWidth: 3,
    borderColor: 'purple',
    height: 160,
    width: 180,
    top: 540,
    left: 590,
}}>
    {/* popcorn placeholder */}
</View>


<View style={{
    position: 'absolute',
    borderWidth: 3,
    borderColor: 'yellow',
    width: 160,
    height: 180,
    left: 0,
    top: 520,
}}>
{/* boombox sprite placeholder */}
</View>

<View style={{
    position: 'absolute',
    borderWidth: 3,
    borderColor: 'pink',
    left: 100,
    top: 210,
    width: 260,
    height: 310,
}}>
    {/* Sky placeholder */}
</View>

<View style={{
    position: 'absolute',
    borderWidth: 3,
    borderColor: 'blue',
    top: 220,
    left: 730,
    height: 300,
    width: 260,

}}
></View>

    {bugGameOpen === true && 
    <BugGameView styles={ styles } handleGameOpen={handleGameOpen}/>
    }

          {/* story book component

          {bugGameOpen || isBookOpen === false && ( 

<Pressable onPress={() => setIsBookOpen(true)}>
          <Image source={require('./assets/graphics/books.png')}
          style={{
              position: 'absolute',
              right: 200,
              top: 250,
              width: '15%',
              resizeMode: 'contain',
              shadowColor: 'white',
              shadowOpacity: 1,
              shadowRadius: 3,
          }}
          />
      </Pressable>)
      }

      {isBookOpen && (
      <BookViewAction 
      currentStory={currentStory}
      setCurrentStory={setCurrentStory}
      storyTitles={storyTitles}
      styles={styles}
      renderStoryContents={renderStoryContents}
      handleBookClose={handleBookClose}
      turnPage={turnPageWithSpeech}
      />)} */}
      


        
        </ImageBackground>
    </>
  )
}

export default TreehouseView