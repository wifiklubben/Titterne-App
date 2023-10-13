import React, {useEffect, useState}  from 'react';
import { View, ImageBackground, Text, Image, Pressable, FlatList } from 'react-native';

import PagerView from 'react-native-pager-view'

function BookView(props) {

    useEffect(() => {

    }, [props.currentStory])

  return (

        <View style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: '10',
            }}>
                <ImageBackground source={require('./assets/Bedroom/bigBook.png')}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                }}>


                    <Pressable onPress={() => props.handleBookClose()}
                    style={{
                        position: 'absolute',
                        right: 20,
                        top: 20,
                        zIndex: 100,
                    }}
                    >

                        <Image source={require('./assets/Global/closeIcon.png')}
                        style={{
                            width: 80,
                            height: 80,
                            resizeMode: 'contain',
                        }}
                        />
                    </Pressable>


                    {props.currentStory.title != '' && (
                    <Pressable onPress={() => props.handleStoryClose()}
                    style={{
                        position: 'absolute',
                        right: 120,
                        top: 500,
                        zIndex: 100,
                    }}>
                        <Text style={props.styles.pText}
                        >Choose a Different Story
                        </Text>
                    </Pressable>
                    )}

                        {/* story not chosen aka CONTENTS PAGES */}
                        {props.currentStory.title === '' && (
                            <PagerView 
                            initialPage={0}
                            style={{flex: 1}}>

                                <View key="1" style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                }}>
                                    <FlatList
                                    numColumns={2}
                                    data={props.storyTitles}
                                        renderItem={({item}) => (
                                            <Pressable onPress={() => {
                                                props.setCurrentStory(item)
                                            }}
                                                
                                            style={{
                                                width: '50%',
                                 
                                            }}>
                                                <View style={{
                                                    width: '100%',
                                                    marginHorizontal: '2%',
                                                    marginVertical: 20,
                                                    alignItems: 'center',
                                                    }}>
                                                        <Image source = {item.thumbnail} style={{
                                                        height: 120,
                                                        width: 120,
                                             
                                                        }}/>
                                                    <Text style={props.styles.h2Text}>{item.title}</Text>
                                                </View>

                                            </Pressable>
                                        )}
                                    style={{
                                        paddingTop: '5%',
                                        width: '100%',
                     
                                    }}
                                        keyExtractor={(item, index) => index.toString()}
                                        />
                                </View>

                            </PagerView>) }

                            {/* story IS CHOSEN, show story */}

                        {props.currentStory.title != '' && (
                            <ImageBackground source={require('./assets/Bedroom/bedroomBGLightsOut.png')}
                            style={{
                                width:'100%',
                                height: '100%',
                            }}>
                            <View style={{
                                flex: 1,
                                width: '100%',
                                height: '100%'}}>
                                    {props.renderStoryContents()}
                            </View>
                            </ImageBackground>
                        )}

                </ImageBackground>
                </View>
  )
}

export default BookView