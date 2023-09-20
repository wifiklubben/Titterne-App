import React, {useEffect, useState} from 'react'
import { View, Text, Pressable, Switch, Button } from 'react-native'

import moment from 'moment';

import { A } from '@expo/html-elements'
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';



function SettingsView( {styles, useStore, timeLimitAmount, timeLimitActive, setTimeLimitActive, setTimeLimitAmount, elapsedTime} ) {

  const [showParentalControls, setShowParentalControls] = useState(false);

  const sleepControlActive = useStore((state) => state.sleepControlActive);
  const toggleSleepControlActive = useStore((state) => state.toggleSleepControlActive);

  const sleepControlMorning = useStore((state) => state.sleepControlMorning);
  const sleepControlNight = useStore((state) => state.sleepControlNight);


  const changeSleepControlMorning = useStore((state) => state.changeSleepControlMorning);
  const changeSleepControlNight = useStore((state) => state.changeSleepControlNight);

  const  showParentals = () => {
    if (showParentalControls === true) {
      setShowParentalControls(false)
    } else {
      setShowParentalControls(true)
    }
  };

  // Time Limit Settings

  const handleToggleTimeLimit = () => {
    console.log("toggling time limit!");
    if (timeLimitActive) {
      setTimeLimitActive(false);
      console.log("set time limit true");
    } else {
      setTimeLimitActive(true)
      console.log("set time limit false");
  }
}
  
  
  const handleTimeLimitChange = (e) => {
    console.log("changing time Limit to: ", e);
    setTimeLimitAmount(e)
    console.log("timeLimit changed to: ", timeLimitAmount);
  }


  const handleToggleSleepControlActive = () => {
    console.log("toggling Sleep");
    toggleSleepControlActive();
  }
  
  // Sleep Mode Settings

  const handleNightTime = (e, selectedDate) => {
    const newNight = selectedDate
    console.log("new night time", newNight);
     changeSleepControlNight(newNight)
  }

  const handleMorningTime = (e, selectedDate) => {
    const newMorning = selectedDate
     console.log("new morning Time: ", newMorning);
     changeSleepControlMorning(newMorning)
  }

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
          onValueChange={handleToggleSleepControlActive}
          value={sleepControlActive}
          />
         </View>
        <Text style={styles.pText}>On sleep mode Torden and Sky will say goodnight and go to bed. No games will be playable and your child can see Torden and Sky asleep in their beds encouraging their own bedtime. </Text>

        {sleepControlActive && (
        <View style={{
          display: "flex",
          flexDirection: "row",
          width: '70%',
          justifyContent: "space-between",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 25,
        }}>


        <View style={{
          display: "flex",
          alignItems: "center",
        }}>
          <Text style={styles.pText}>Select Wake Up Time</Text>

          <DateTimePicker
            style={{
              marginTop: 10
            }}
            value={sleepControlMorning}
            mode="time"
            minuteInterval={15}
            is24Hour={true}
            display='clock'
            timeZoneName={'Europe/Copenhagen'}
            onChange={(event, selectedDate) => handleMorningTime(event, selectedDate)}/>
        </View>


        <View style={{
          display: "flex",
          alignItems: "center",
        }}>
          <Text style={styles.pText}>Select Bed Time</Text>

            <DateTimePicker
            style={{
              marginTop: 10
            }}
            value={sleepControlNight}
            mode="time"
            minuteInterval={15}
            is24Hour={true}
            display='clock'
            onChange={(event, selectedTime) => handleNightTime(event, selectedTime)}/>
        </View>

        </View>
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
        <Text style={styles.pText}>Decide how long your child will be able to spend on the Titterne app during this session. Current session time is {elapsedTime} minutes.</Text>
        {timeLimitActive &&(
          <View style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
              <Slider style={{
                width: "30%"
              }}
              minimumValue={1}
              maximumValue={180}
              step={1}
              onValueChange={(e) => handleTimeLimitChange(e)}
              minimumTrackTintColor="000"
              value={timeLimitAmount}
              >
              </Slider>
              <Text style={styles.pText}>Up to {timeLimitAmount} in total.</Text>
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