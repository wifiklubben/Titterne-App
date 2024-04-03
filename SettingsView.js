import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Switch, SafeAreaView, ScrollView } from "react-native";

import moment from "moment";

import { A } from "@expo/html-elements";
import Slider from "@react-native-community/slider";
import DateTimePicker from "@react-native-community/datetimepicker";

function SettingsView({ styles, useStore, timeLimitAmount, timeLimitActive, setTimeLimitActive, setTimeLimitAmount, elapsedTime }) {
  const [showParentalControls, setShowParentalControls] = useState(false);

  const sleepControlActive = useStore((state) => state.sleepControlActive);
  const toggleSleepControlActive = useStore((state) => state.toggleSleepControlActive);

  const sleepControlMorning = useStore((state) => state.sleepControlMorning);
  const sleepControlNight = useStore((state) => state.sleepControlNight);

  const changeSleepControlMorning = useStore((state) => state.changeSleepControlMorning);
  const changeSleepControlNight = useStore((state) => state.changeSleepControlNight);

  const showParentals = () => {
    if (showParentalControls === true) {
      setShowParentalControls(false);
    } else {
      setShowParentalControls(true);
    }
  };

  // Time Limit Settings

  const handleToggleTimeLimit = () => {
    console.log("toggling time limit!");
    if (timeLimitActive) {
      setTimeLimitActive(false);
      console.log("set time limit true");
    } else {
      setTimeLimitActive(true);
      console.log("set time limit false");
    }
  };

  const handleTimeLimitChange = (e) => {
    console.log("changing time Limit to: ", e);
    setTimeLimitAmount(e);
    console.log("timeLimit changed to: ", timeLimitAmount);
  };

  const handleToggleSleepControlActive = () => {
    console.log("toggling Sleep");
    toggleSleepControlActive();
  };

  // Sleep Mode Settings

  const handleNightTime = (e, selectedDate) => {
    const newNight = selectedDate;
    console.log("new night time", newNight);
    changeSleepControlNight(newNight);
  };

  const handleMorningTime = (e, selectedDate) => {
    const newMorning = selectedDate;
    console.log("new morning Time: ", newMorning);
    changeSleepControlMorning(newMorning);
  };

  return (
    <>
      {showParentalControls === false && (
        //* main settings page

        <View style={styles.settingsContainer}>
          <Text style={styles.h1Text}>Indstillinger</Text>

          <Pressable onPress={showParentals}>
            <Text style={styles.h2Text}>Forældre kontrol</Text>
          </Pressable>

          <A href="https://titterne.dk/" style={styles.h2Text}>
            Butik
          </A>
          <A href="https://titterne.dk/video/" style={styles.h2Text}>
            Youtube kanal
          </A>
          <A href="https://titterne.dk/om-os/" style={styles.h2Text}>
            Om os
          </A>
        </View>
      )}

      {showParentalControls === true && (
        //* Parental controls page
        <SafeAreaView>
          <ScrollView>
            <View style={styles.settingsContainer}>
              <Text style={styles.h2Text}>Forældre kontrol</Text>
              <View
                style={{
                  width: "75%",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.h1Text}>dvaletilstand</Text>
                  <Switch
                    trackColor={{ false: "#F45656", true: "#7DD966" }}
                    style={{
                      transform: [
                        {
                          scale: 1.8,
                        },
                      ],
                    }}
                    onValueChange={handleToggleSleepControlActive}
                    value={sleepControlActive}
                  />
                </View>
                <Text style={styles.pText}>I dvaletilstand siger Torden og Sky godnat og går i seng. Ingen spil kan spilles, og dit barn kan se Torden og Sky sove i deres senge og opmuntre til deres egen sengetid.</Text>
                {sleepControlActive && (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: 25,
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.pText}>Vælg Wake Up Time</Text>
                      <DateTimePicker
                        style={{
                          marginTop: 10,
                        }}
                        value={sleepControlMorning}
                        mode="time"
                        minuteInterval={15}
                        is24Hour={true}
                        display="clock"
                        timeZoneName={"Europe/Copenhagen"}
                        onChange={(event, selectedDate) => handleMorningTime(event, selectedDate)}
                      />
                    </View>
                    <View
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.pText}>Vælg Sengetid</Text>
                      <DateTimePicker
                        style={{
                          marginTop: 10,
                        }}
                        value={sleepControlNight}
                        mode="time"
                        minuteInterval={15}
                        is24Hour={true}
                        display="clock"
                        onChange={(event, selectedTime) => handleNightTime(event, selectedTime)}
                      />
                    </View>
                  </View>
                )}
              </View>
              <View
                style={{
                  width: "75%",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.h1Text}>Time Limit</Text>
                  <Switch
                    trackColor={{ false: "#F45656", true: "#7DD966" }}
                    style={{
                      transform: [
                        {
                          scale: 1.8,
                        },
                      ],
                    }}
                    onValueChange={handleToggleTimeLimit}
                    value={timeLimitActive}
                  />
                </View>
                <Text style={styles.pText}>Bestem, hvor lang tid dit barn vil være i stand til at bruge på Titterne-appen under denne session. Aktuel sessionstid er {elapsedTime} minutter.</Text>
                {timeLimitActive && (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      paddingTop: 30,
                    }}
                  >
                    <Slider
                      style={{
                        width: "40%",
                      }}
                      minimumValue={1}
                      maximumValue={180}
                      step={1}
                      onValueChange={(e) => handleTimeLimitChange(e)}
                      minimumTrackTintColor="000"
                      value={timeLimitAmount}
                    ></Slider>
                    <Text style={styles.pText}>Op til {timeLimitAmount} i alt.</Text>
                  </View>
                )}
              </View>
              <Pressable onPress={showParentals}>
                <Text style={styles.h1Text}>Tilbage</Text>
              </Pressable>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}

export default SettingsView;
