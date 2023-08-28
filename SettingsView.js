import React, {useEffect, useState} from 'react'
import { View, Text, Pressable, Switch, Button } from 'react-native'

import { A } from '@expo/html-elements'
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useStore } from 'zustand';




function SettingsView( {styles, sleepControlActive, setSleepControlActive, useParentalSettings} ) {

  //logic to be figured out, this is just a placeholder for now
  
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectTime, setselectTime] = useState(new Date());
  const [showParentalControls, setShowParentalControls] = useState(false);

  const { timeLimitActive, toggleTimeLimitActive } = useParentalSettings();
  const { timeLimitAmount, toggleTimeLimitAmount} = useParentalSettings();



  const  showParentals = () => {
    if (showParentalControls === true) {
      setShowParentalControls(false)
    } else {
      setShowParentalControls(true)
    }
  };

  const toggleSleep = () => {
    if (sleepControlActive === true) {
      setSleepControlActive(false)
      console.log("sleep control off");
    } else {
      setSleepControlActive(true)
      console.log("sleep control on");
    }
  }

  const handleToggleTimeLimit = () => {
    console.log("toggling!");
    toggleTimeLimitActive()
  }



  const handleTimePicker = (event, selected) => {
     console.log("event: ", event);
     console.log("selected: ", selected);
  }

  useEffect(() => {
    console.log("show time picker is: ", showTimePicker);
  }, [showTimePicker])

  useEffect(() => {
    console.log("time Limit is: ", timeLimitAmount);
  }, [timeLimitAmount])
  return (
  <>
  {showParentalControls === false && (
    //* main settings page

      <View style={styles.settingsContainer}>
        <Text style={styles.h1Text}>Settings Page</Text>

        <Pressable onPress={showParentals}>
        <Text style={styles.h2Text}>Parental Control</Text>
        </Pressable>

        <A href="https://titterne.dk/" style={styles.h2Text}>Shop</A>
        <A href="https://titterne.dk/video/" style={styles.h2Text}>Youtube Channel</A>
        <A href="https://titterne.dk/om-os/" style={styles.h2Text}>About Us</A>

        </View>
        )}

    {showParentalControls === true && (
      //* Parental controls page

      <View style={styles.settingsContainer}>
      <Text style={styles.h2Text}>Parental Controls</Text>

      <View style={{
        width: "75%",
      }}>
        <View style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
          <Text style={styles.h1Text}>Sleep Mode</Text>
          <Switch
          trackColor={{false: '#F45656', true: '#7DD966'}}
          style={{
            transform: [{
              scale: 1.8
            }],
          }}
          onValueChange={toggleSleep}
          value={sleepControlActive}/>
         </View>
        <Text style={styles.pText}>On sleep mode Torden and Sky will say goodnight and go to bed. No games will be playable and your child can see Torden and Sky asleep in their beds encouraging their own bedtime. </Text>
        {sleepControlActive && (
          <Button title="Select Wake up time" onPress={() => setShowTimePicker(true)}/>
          )}
            {showTimePicker === true && (
            <DateTimePicker
            value={selectTime}
            mode="time"
            is24Hour={true}
            display='default'
            onChange={handleTimePicker}/>
            )}

      
      </View>

      <View style={{
        width: "75%"
        }}>
   <View style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>

        <Text style={styles.h1Text}>Time Limit</Text>
        <Switch
          trackColor={{false: '#F45656', true: '#7DD966'}}
          style={{
            transform: [{
              scale: 1.8
            }],
          }}
          onValueChange={handleToggleTimeLimit}
          value={timeLimitActive}/>

        </View>
        <Text style={styles.pText}>Decide how long your child will be able to spend on the Titterne app during a day before sleep mode.</Text>
        {timeLimitActive &&(
          <View style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
              <Slider style={{
                width: "30%"
              }}
              minimumValue={15}
              maximumValue={120}
              step={5}
              // onValueChange={handleTimeLimitChange}
              minimumTrackTintColor="000"
              // value={timeLimitAmount}
              >
              </Slider>
              <Text style={styles.pText}>Up to {timeLimitAmount} minutes per day</Text>
          </View>
        )}
      </View>


      <Pressable onPress={showParentals}>
        <Text style={styles.h1Text}>Back</Text>
      </Pressable>

      </View>
    )}
    </>
    
  )
}

export default SettingsView